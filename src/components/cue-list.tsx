"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cueSrc } from "@/lib/audio";
import { formatDuration, type Cue } from "@/lib/site";

function CueRow({ cue, index }: { cue: Cue; index: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);

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

  return (
    <li className="py-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${cue.title}` : `Play ${cue.title}`}
          aria-pressed={playing}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#ffb07a]/40 bg-[#ffb07a] text-[#2a1408] transition-colors hover:bg-[#ffc7a1]"
        >
          {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
        </button>
        <p className="w-6 shrink-0 text-sm text-[#d4cec3] tabular-nums">{index + 1}</p>
        <p className="min-w-0 flex-1 truncate text-[#f6f3ec]">{cue.title}</p>
        <p className="shrink-0 text-sm text-[#d4cec3] tabular-nums">{formatDuration(cue.duration)}</p>
      </div>
      <div className="relative mt-3 h-4">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#f6f3ec]/35" />
        <div
          className="absolute top-1/2 h-px -translate-y-1/2 bg-[#ffb07a]"
          style={{ width: `${cue.duration ? (progress / cue.duration) * 100 : 0}%` }}
        />
        <div
          className="absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-[#ffb07a]"
          style={{
            left: `clamp(0px, calc(${cue.duration ? (progress / cue.duration) * 100 : 0}% - 7px), calc(100% - 14px))`,
          }}
        />
        <input
          type="range"
          min={0}
          max={cue.duration}
          step={0.1}
          value={progress}
          aria-label={`Seek within ${cue.title}`}
          aria-valuetext={formatDuration(progress)}
          onChange={(event) => {
            const next = Number(event.target.value);
            setProgress(next);
            if (audioRef.current) audioRef.current.currentTime = next;
          }}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </div>
      {failed ? (
        <p className="mt-2 text-sm text-[#ffb07a]" role="alert">
          This recording did not load. Try again, or use a streaming link on this page.
        </p>
      ) : null}
      <audio
        ref={audioRef}
        preload="none"
        src={cueSrc(cue)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
        onError={() => setFailed(true)}
      />
    </li>
  );
}

export function CueList({ cues }: { cues: Cue[] }) {
  if (cues.length === 0) return null;
  return (
    <ol className="divide-y divide-white/15 border-y border-white/15">
      {cues.map((cue, index) => (
        <CueRow key={cue.id} cue={cue} index={index} />
      ))}
    </ol>
  );
}
