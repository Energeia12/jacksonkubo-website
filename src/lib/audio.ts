import type { Cue } from "@/lib/site";

/** Score cues are served from public/audio. */
export const useLocalScoreAudio = true;

export function cueSrc(cue: Cue) {
  return useLocalScoreAudio ? `/audio/${cue.id}.mp3` : cue.url;
}
