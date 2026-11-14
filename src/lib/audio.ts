import type { Cue } from "@/lib/site";

/**
 * Score cues are about 180MB. They stay on the previous media host until
 * `node scripts/download-score-audio.mjs` has copied them into public/audio.
 * Flip this to true after that download, then rebuild.
 */
export const useLocalScoreAudio = false;

export function cueSrc(cue: Cue) {
  return useLocalScoreAudio ? `/audio/${cue.id}.mp3` : cue.url;
}
