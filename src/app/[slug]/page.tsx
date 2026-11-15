import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReleasePage } from "@/components/release-page";
import { pageUrl } from "@/lib/meta";
import { getRelease, releases } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const release = releases.find((item) => item.slug === slug);
  if (!release) return {};
  const url = pageUrl(`/${release.slug}/`);
  const image = { url: release.artwork, alt: release.artworkAlt };
  return {
    title: release.title,
    description: release.description,
    alternates: { canonical: url },
    openGraph: {
      title: release.title,
      description: release.description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: release.title,
      description: release.description,
      images: [image],
    },
  };
}

export default async function ReleaseRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = releases.find((item) => item.slug === slug);
  if (!release) notFound();
  return <ReleasePage release={getRelease(release.slug)} />;
}
