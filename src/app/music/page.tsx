import type { Metadata } from "next";
import Link from "next/link";
import { Wordmark } from "@/components/wordmark";
import { releases } from "@/lib/site";

export const metadata: Metadata = {
  title: "Music",
  description: "Albums, EPs, singles, and remixes by Jackson Kubo.",
};

export default function MusicPage() {
  return (
    <>
      <section className="relative min-h-[52vh] overflow-hidden">
        <img
          src="/media/music-banner.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 to-[#07060d]" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-4xl items-end px-4 pt-28 pb-8">
          <h1 className="w-full">
            <Wordmark src="/media/wordmark-music.png" alt="My music" className="max-w-xl" />
          </h1>
        </div>
      </section>
      <section
        className="bg-cover bg-center"
        style={{ backgroundImage: "url(/media/music-sky.jpg)" }}
      >
        <div className="bg-[#07060d]/62">
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-12 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
            {releases.map((release) => (
              <li key={release.slug}>
                <Link href={`/${release.slug}`} className="group block">
                  <img
                    src={release.artwork}
                    alt=""
                    className="aspect-square w-full object-cover shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] transition-[filter] duration-300 group-hover:brightness-110"
                  />
                  <p className="mt-4 font-display text-xl text-white">{release.title}</p>
                  <p className="mt-1 text-sm text-[#d4cec3]">
                    {release.kind}
                    <span aria-hidden="true"> · </span>
                    <span className="sr-only">, </span>
                    {release.year}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
