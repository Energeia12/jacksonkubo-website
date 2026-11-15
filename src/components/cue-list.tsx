"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cueSrc } from "@/lib/audio";
import { formatDuration, type Cue } from "@/lib/site";
import waveforms from "@/content/waveforms.json";

const peaksById = waveforms as Record<string, number[]>;

function barPath(peaks: number[]) {
  let path = "";
  for (let index = 0; index < peaks.length; index += 1) {
    const height = Math.max(8, peaks[index]);
    const y = (100 - height) / 2;
    path += `M${index + 0.16} ${y}h0.68v${height}h-0.68z`;
  }
  return path;
}

function Waveform({
  peaks,
  progress,
  hover,
}: {
  peaks: number[];
  progress: number;
  hover: number | null;
}) {
  const path = useMemo(() => barPath(peaks), [peaks]);
  const played = Math.min(1, Math.max(0, progress));
  const ahead = hover != null && hover > played;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <svg viewBox={`0 0 ${peaks.length} 100`} preserveAspectRatio="none" className="h-full w-full">
        <path d={path} fill="rgba(246,243,236,0.34)" />
      </svg>
      {ahead ? (
        <svg
          viewBox={`0 0 ${peaks.length} 100`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          style={{ clipPath: `inset(0 ${(1 - hover) * 100}% 0 ${played * 100}%)` }}
        >
          <path d={path} fill="rgba(255,255,255,0.72)" />
        </svg>
      ) : null}
      <svg
        viewBox={`0 0 ${peaks.length} 100`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ clipPath: `inset(0 ${(1 - played) * 100}% 0 0)` }}
      >
        <path d={path} fill="#ffffff" />
      </svg>
      <div className="absolute inset-y-1 w-px bg-white" style={{ left: `${played * 100}%` }} />
    </div>
  );
}

function CueRow({ cue, index }: { cue: Cue; index: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrubbing = useRef(false);
  const pendingSeek = useRef<number | null>(null);
  const seekAttempts = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [length, setLength] = useState(cue.duration);
  const [hover, setHover] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const peaks = peaksById[cue.id] ?? [];

  useEffect(() => {
    const onOther = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (id !== cue.id) {
        audioRef.current?.pause();
        setPlaying(false);
      }
    };
    window.addEventListener("jk-cue-play", onOther);
    return () => window.removeEventListener("jk-cue-play", onOther);
  }, [cue.id]);

  function limitOf(audio: HTMLAudioElement) {
    return Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : cue.duration;
  }

  function applySeek(next: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const limit = Math.max(limitOf(audio), 0);
    const clamped = Math.min(Math.max(0, next), limit);
    pendingSeek.current = clamped;
    seekAttempts.current = 0;
    setProgress(clamped);
    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
      audio.currentTime = clamped;
      return;
    }
    if (
      audio.networkState === HTMLMediaElement.NETWORK_EMPTY ||
      audio.networkState === HTMLMediaElement.NETWORK_IDLE
    ) {
      audio.preload = "auto";
      audio.load();
    }
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      window.dispatchEvent(new CustomEvent("jk-cue-play", { detail: cue.id }));
      void audio.play().catch(() => setFailed(true));
    } else {
      audio.pause();
    }
  }

  function hoverRatio(event: React.PointerEvent<HTMLInputElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return 0;
    return Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  }

  const ratio = length > 0 ? progress / length : 0;

  return (
    <li className="min-w-0 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${cue.title}` : `Play ${cue.title}`}
          aria-pressed={playing}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white text-[#141018] transition-colors hover:bg-[#f6f3ec]"
        >
          {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
        </button>
        <p className="w-6 shrink-0 text-sm text-[#d4cec3] tabular-nums">{index + 1}</p>
        <p className="min-w-0 flex-1 truncate text-[#f6f3ec]">{cue.title}</p>
        <p className="shrink-0 text-sm text-[#d4cec3] tabular-nums">
          {playing || progress > 0
            ? `${formatDuration(progress)} / ${formatDuration(length)}`
            : formatDuration(length)}
        </p>
      </div>
      <div className="relative mt-3 h-12 rounded-sm focus-within:outline focus-within:outline-1 focus-within:outline-offset-2 focus-within:outline-white/70">
        {peaks.length > 0 ? (
          <Waveform peaks={peaks} progress={ratio} hover={hover} />
        ) : (
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#f6f3ec]/35" />
        )}
        <input
          type="range"
          min={0}
          max={length || 0}
          step={0.1}
          value={Math.min(progress, length || 0)}
          aria-label={`Seek within ${cue.title}`}
          aria-valuetext={formatDuration(progress)}
          onPointerDown={() => {
            scrubbing.current = true;
          }}
          onPointerUp={() => {
            scrubbing.current = false;
          }}
          onPointerCancel={() => {
            scrubbing.current = false;
          }}
          onPointerMove={(event) => setHover(hoverRatio(event))}
          onPointerLeave={() => setHover(null)}
          onChange={(event) => applySeek(Number(event.target.value))}
          className="absolute inset-0 cursor-pointer touch-none opacity-0"
        />
      </div>
      {failed ? (
        <p className="mt-2 text-sm text-white" role="alert">
          This recording did not load. Try again, or use a streaming link on this page.
        </p>
      ) : null}
      <audio
        ref={audioRef}
        preload="none"
        src={cueSrc(cue)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(event) => {
          const audio = event.currentTarget;
          if (Number.isFinite(audio.duration) && audio.duration > 0) setLength(audio.duration);
          if (pendingSeek.current != null) audio.currentTime = pendingSeek.current;
        }}
        onSeeked={(event) => {
          const audio = event.currentTarget;
          const wanted = pendingSeek.current;
          if (wanted == null) {
            if (!scrubbing.current) setProgress(audio.currentTime);
            return;
          }
          if (Math.abs(audio.currentTime - wanted) < 0.5) {
            pendingSeek.current = null;
            if (!scrubbing.current) setProgress(audio.currentTime);
            return;
          }
          if (seekAttempts.current < 2 && audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
            seekAttempts.current += 1;
            audio.currentTime = wanted;
            return;
          }
          pendingSeek.current = null;
          if (!scrubbing.current) setProgress(audio.currentTime);
        }}
        onTimeUpdate={(event) => {
          if (scrubbing.current || pendingSeek.current != null) return;
          setProgress(event.currentTarget.currentTime);
        }}
        onError={() => setFailed(true)}
      />
    </li>
  );
}

export function CueList({ cues }: { cues: Cue[] }) {
  if (cues.length === 0) return null;
  return (
    <ol className="min-w-0 divide-y divide-white/15 border-y border-white/15">
      {cues.map((cue, index) => (
        <CueRow key={cue.id} cue={cue} index={index} />
      ))}
    </ol>
  );
}
