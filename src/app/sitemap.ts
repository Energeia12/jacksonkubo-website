import type { MetadataRoute } from "next";
import { releases, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/music",
    "/composition",
    "/sounddesign",
    "/contactme",
    ...releases.map((release) => `/${release.slug}`),
  ];
  return paths.map((path) => ({
    url: path === "" ? `${site.url}/` : `${site.url}${path}/`,
    lastModified: new Date("2026-11-14"),
  }));
}
