import type { Metadata } from "next";
import { site } from "@/lib/site";

export function pageUrl(path: string) {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return new URL(normalized, `${site.url}/`).href;
}

export function pageMeta({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = pageUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url },
  };
}
