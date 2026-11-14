import type { Metadata } from "next";
import Link from "next/link";
import { ContentPanel } from "@/components/content-panel";
import { PageBanner } from "@/components/page-banner";
import { releases } from "@/lib/site";

export const metadata: Metadata = {
  title: "Music",
  description: "Albums, EPs, singles, and remixes by Jackson Kubo.",
};

export default function MusicPage() {
  return (
    <>
      <PageBanner wordmark="/media/wordmark-music.png" alt="My music">
        <img
          src="/media/music-banner.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </PageBanner>
      <ContentPanel image="/media/music-sky.jpg">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
      </ContentPanel>
    </>
  );
}
