import type { Metadata } from "next";
import { Bai_Jamjuree, Syne } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { VolumeControl } from "@/components/volume-control";
import { site } from "@/lib/site";
import "./globals.css";

const body = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

const display = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-family",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s · Jackson Kubo",
  },
  description: site.description,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    title: site.title,
    description: site.description,
    url: `${site.url}/`,
    siteName: "Jackson Kubo",
    type: "website",
    images: [{ url: "/media/hero-poster.jpg", width: 1400, height: 788 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/media/hero-poster.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: [
    "Project Director",
    "Audio, Gameplay Design & Production Lead",
    "Composer",
    "Sound Designer",
  ],
  worksFor: {
    "@type": "Organization",
    name: "BlueHeaven Games",
    url: "https://www.blueheavengames.com/",
  },
  url: `${site.url}/`,
  email: site.email,
  alumniOf: "Berklee College of Music",
  homeLocation: "Los Angeles",
  sameAs: [
    "https://www.youtube.com/channel/UCIJbs-k8Jwhw5lyjGnIAI2Q",
    "https://www.instagram.com/jackson_kubo/",
    "https://www.tiktok.com/@jacksonkubomusic",
    "https://open.spotify.com/artist/2mcuiPJAkFQMTwQ5JTIypA",
    "https://music.apple.com/us/artist/jackson-kubo/1664612247",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#07060d] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SiteHeader />
        <main id="content" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
        <VolumeControl />
      </body>
    </html>
  );
}
