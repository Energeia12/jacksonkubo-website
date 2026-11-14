"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cueSrc } from "@/lib/audio";
import { formatDuration, type Cue } from "@/lib/site";

function CueRow({ cue }: { cue: Cue }) {
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
    <li className="rounded-xl border border-white/10 bg-black/45 px-3 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${cue.title}` : `Play ${cue.title}`}
          aria-pressed={playing}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
        >
          {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="truncate font-medium text-white">{cue.title}</p>
            <p className="shrink-0 text-xs text-white/60 tabular-nums">
              {formatDuration(cue.duration)}
            </p>
          </div>
          <input
            type="range"
            min={0}
            max={cue.duration}
            step={0.1}
            value={progress}
            aria-label={`Seek ${cue.title}`}
            onChange={(event) => {
              const next = Number(event.target.value);
              setProgress(next);
              if (audioRef.current) audioRef.current.currentTime = next;
            }}
            className="mt-2 h-1 w-full cursor-pointer accent-[#ffb07a]"
          />
          {failed ? (
            <p className="mt-2 text-xs text-[#ffb07a]">
              This cue did not load. The file still lives on the old media host.
            </p>
          ) : null}
        </div>
      </div>
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
  return (
    <ol className="space-y-2">
      {cues.map((cue) => (
        <CueRow key={cue.id} cue={cue} />
      ))}
    </ol>
  );
}
