import { mkdir, writeFile, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(
  await readFile(join(root, "src/content/score-audio.json"), "utf8"),
);
const outDir = join(root, "public/audio");
await mkdir(outDir, { recursive: true });

let bytes = 0;
for (const cue of manifest) {
  const file = join(outDir, `${cue.id}.mp3`);
  process.stdout.write(`Downloading ${cue.title}...\n`);
  const response = await fetch(cue.url);
  if (!response.ok) {
    throw new Error(`${cue.title} returned ${response.status}`);
  }
  const data = Buffer.from(await response.arrayBuffer());
  await writeFile(file, data);
  bytes += data.length;
}

process.stdout.write(
  `Saved ${manifest.length} cues (${(bytes / 1e6).toFixed(1)} MB) to public/audio.\n` +
    "In src/lib/audio.ts, set useLocalScoreAudio to true, then rebuild.\n",
);
