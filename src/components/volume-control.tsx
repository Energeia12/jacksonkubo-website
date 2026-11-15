"use client";

import { useEffect, useState } from "react";
import { Volume1, Volume2, VolumeX } from "lucide-react";

const VOLUME_KEY = "jk-volume";
const MUTED_KEY = "jk-muted";

function clamp(value: number) {
  if (!Number.isFinite(value)) return 1;
  return Math.min(1, Math.max(0, value));
}

function youtubeFrames() {
  return [...document.querySelectorAll("iframe")].filter((frame) =>
    /youtube(?:-nocookie)?\.com\/embed\//.test(frame.src),
  );
}

function commandYouTube(frame: HTMLIFrameElement, func: string, args: number[] = []) {
  frame.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");
}

function applyLevel(level: number, muted: boolean) {
  const silent = muted || level === 0;
  for (const audio of document.querySelectorAll("audio")) {
    audio.volume = level;
    audio.muted = silent;
  }
  for (const frame of youtubeFrames()) {
    commandYouTube(frame, "setVolume", [Math.round(level * 100)]);
    commandYouTube(frame, silent ? "mute" : "unMute");
  }
}

export function VolumeControl() {
  const [ready, setReady] = useState(false);
  const [present, setPresent] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(VOLUME_KEY);
    if (stored != null && Number.isFinite(Number(stored))) setVolume(clamp(Number(stored)));
    setMuted(localStorage.getItem(MUTED_KEY) === "1");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(VOLUME_KEY, String(volume));
    localStorage.setItem(MUTED_KEY, muted ? "1" : "0");

    const sync = () => {
      const audible =
        document.querySelector("audio") != null || youtubeFrames().length > 0;
      setPresent(audible);
      if (audible) applyLevel(volume, muted);
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [ready, volume, muted]);

  if (!present) return null;

  const level = muted ? 0 : volume;
  const Icon = level === 0 ? VolumeX : level < 0.5 ? Volume1 : Volume2;

  function change(next: number) {
    const value = clamp(next);
    setVolume(value);
    setMuted(value === 0);
  }

  function toggleMute() {
    if (muted || volume === 0) {
      const restored = volume === 0 ? 1 : volume;
      setVolume(restored);
      setMuted(false);
      return;
    }
    setMuted(true);
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/20 bg-black/75 py-2 pr-4 pl-2 shadow-lg backdrop-blur-md md:top-1/2 md:right-3 md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2 md:flex-col md:px-2 md:py-3">
      <button
        type="button"
        onClick={toggleMute}
        aria-label={level === 0 ? "Unmute" : "Mute"}
        aria-pressed={level === 0}
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#141018] transition-colors hover:bg-[#f6f3ec]"
      >
        <Icon className="size-4" />
      </button>
      <label htmlFor="site-volume" className="text-xs tracking-[0.14em] text-[#d4cec3] uppercase md:sr-only">
        Volume
      </label>
      <input
        id="site-volume"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={level}
        aria-valuetext={`${Math.round(level * 100)} percent`}
        onChange={(event) => change(Number(event.target.value))}
        className="volume-slider h-1 w-28 cursor-pointer accent-white touch-none md:h-28 md:w-1"
      />
    </div>
  );
}
