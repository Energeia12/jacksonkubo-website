import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Release } from "@/lib/site";
import { cn } from "cn";

export function ReleasePage({ release }: { release: Release }) {
  return (
    <article>
      <header className="relative min-h-[70vh] overflow-hidden">
        <img
          src={release.artwork}
          alt={release.artworkAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07060d] via-[#07060d]/70 to-black/35" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-end px-4 pt-28 pb-12">
          <div>
            <h1 className="font-display text-4xl text-white sm:text-6xl">{release.title}</h1>
            <p className="mt-4 text-sm text-[#f3efe6]">
              {release.kind}
              <span aria-hidden="true"> · </span>
              <span className="sr-only">, </span>
              {release.year}
            </p>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="max-w-[65ch] text-lg leading-relaxed text-[#f3efe6]">{release.description}</p>
          <h2 className="mt-12 font-display text-2xl text-white">Tracks</h2>
          <ol className="mt-4 divide-y divide-white/15 border-y border-white/15">
            {release.tracks.map((track, index) => (
              <li key={track} className="flex gap-4 py-3 text-[#f6f3ec]">
                <span className="w-6 text-[#d4cec3] tabular-nums">{index + 1}</span>
                <span>{track}</span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="space-y-4">
          <iframe
            title={`Play ${release.title} on Spotify`}
            src={`https://open.spotify.com/embed/album/${release.spotifyId}?utm_source=generator&theme=0`}
            width="100%"
            height={release.tracks.length > 2 ? 380 : 232}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="bg-black"
          />
          <a
            href={release.appleUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 w-full bg-transparent text-white",
            )}
          >
            Listen on Apple Music
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/music" className="inline-block text-sm text-[#d4cec3] underline underline-offset-4">
            All music
          </Link>
        </aside>
      </div>
    </article>
  );
}
