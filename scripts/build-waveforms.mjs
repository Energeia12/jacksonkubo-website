import { spawn } from "node:child_process";
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BARS = 160;
const audioDir = path.resolve("public/audio");
const outFile = path.resolve("src/content/waveforms.json");

function peaksFromPcm(buffer) {
  const samples = new Float32Array(
    buffer.buffer,
    buffer.byteOffset,
    Math.floor(buffer.byteLength / 4),
  );
  const bars = new Array(BARS).fill(0);
  if (samples.length === 0) return bars;

  const block = samples.length / BARS;
  let max = 0;
  for (let index = 0; index < BARS; index += 1) {
    const start = Math.floor(index * block);
    const end = Math.min(samples.length, Math.floor((index + 1) * block));
    let peak = 0;
    for (let sample = start; sample < end; sample += 1) {
      const value = Math.abs(samples[sample]);
      if (value > peak) peak = value;
    }
    bars[index] = peak;
    if (peak > max) max = peak;
  }

  return bars.map((peak) => {
    const normalized = max > 0 ? peak / max : 0;
    return Math.round(normalized ** 0.62 * 100);
  });
}

function decode(file) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "ffmpeg",
      ["-v", "error", "-i", file, "-ac", "1", "-ar", "8000", "-f", "f32le", "pipe:1"],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    const chunks = [];
    let error = "";
    child.stdout.on("data", (chunk) => chunks.push(chunk));
    child.stderr.on("data", (chunk) => {
      error += chunk.toString();
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`${path.basename(file)} ffmpeg exited ${code}: ${error}`));
        return;
      }
      resolve(Buffer.concat(chunks));
    });
  });
}

const files = (await readdir(audioDir)).filter((name) => name.endsWith(".mp3")).sort();
const waveforms = {};
let cursor = 0;

async function worker() {
  while (cursor < files.length) {
    const name = files[cursor];
    cursor += 1;
    const pcm = await decode(path.join(audioDir, name));
    const id = name.replace(/\.mp3$/, "");
    waveforms[id] = peaksFromPcm(pcm);
    console.log(`${id} ${waveforms[id].length} bars`);
  }
}

await Promise.all(Array.from({ length: 4 }, () => worker()));

const lines = Object.keys(waveforms)
  .sort()
  .map((id) => `  ${JSON.stringify(id)}: [${waveforms[id].join(",")}]`);
await writeFile(outFile, `{\n${lines.join(",\n")}\n}\n`);
console.log(`wrote ${outFile}`);
