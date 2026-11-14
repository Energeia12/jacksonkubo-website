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
        <div className="absolute inset-0 bg-gradient-to-t from-[#07060d] via-[#07060d]/25 to-black/30" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-end px-4 pt-28 pb-10">
          <p className="font-display text-sm tracking-[0.22em] text-white/80 uppercase">
            {release.kind} · {release.year}
          </p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-6xl">{release.title}</h1>
        </div>
      </header>
      <div className="mx-auto grid max-w-4xl gap-10 px-4 py-12 lg:grid-cols-[1fr_280px]">
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-white/85">{release.description}</p>
          <h2 className="mt-10 font-display text-2xl text-white">Track list</h2>
          <ol className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {release.tracks.map((track, index) => (
              <li key={track} className="flex gap-4 py-3 text-white/90">
                <span className="w-6 text-white/45 tabular-nums">{index + 1}</span>
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
            className="rounded-xl"
          />
          <a
            href={release.appleUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-11 w-full bg-transparent text-white")}
          >
            Apple Music
          </a>
          <Link href="/music" className="block text-sm text-white/70 underline">
            All releases
          </Link>
        </aside>
      </div>
    </article>
  );
}
