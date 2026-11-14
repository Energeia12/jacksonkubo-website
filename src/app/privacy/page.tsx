import type { Metadata } from "next";
import { ContentPanel } from "@/components/content-panel";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How jacksonkubo.com handles messages, playback, embeds, and cookies.",
};

export default function PrivacyPage() {
  return (
    <ContentPanel image="/media/galaxy.jpg" width="max-w-3xl" underHeader>
    <article>
      <h1 className="font-display text-4xl text-white sm:text-5xl">Privacy policy</h1>
      <p className="mt-4 text-sm text-[#d4cec3]">Updated November 14, 2026</p>
      <div className="mt-10 space-y-10 text-lg leading-relaxed text-[#f3efe6]">
        <p>
          This page describes what happens to information when you use{" "}
          <a className="underline decoration-white/40 underline-offset-4 hover:decoration-white" href={site.url}>
            jacksonkubo.com
          </a>
          , the portfolio of Jackson Kubo, a composer and sound designer in Los Angeles. Questions
          about it can go to{" "}
          <a
            className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
            href={`mailto:${site.email}`}
          >
            {site.email}
          </a>
          .
        </p>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-white">The site itself</h2>
          <p>
            The site shows scores, sound design, and released music. It has no accounts, no
            newsletter, and no checkout. Visiting a page does not ask for your name.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-white">Messages</h2>
          <p>
            The contact form asks for a first name, a last name, an email address, and a note. The
            first and last name are optional. Submitting the form does not send those fields to a
            server on this site. It opens the email program on your device, addressed to{" "}
            {site.email}, with the note filled in. The message exists only if you send that email.
          </p>
          <p>
            Jackson reads those emails to reply about scoring, sound design, and other professional
            work. He does not sell the contents, and he does not add the address to a mailing list.
            The email stays in his inbox until he deletes it.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-white">Listening and watching</h2>
          <p>
            Pressing play on a score cue requests that audio file from the service storing it.
            Those files are currently served by Wix at music.wixstatic.com. The request carries the
            usual connection details that any file download does, such as an IP address. Playback
            does not require a name.
          </p>
          <p>
            Composition and Sound Design embed videos with YouTube’s privacy-enhanced player
            (youtube-nocookie.com). Music pages embed a Spotify player. Playing either one can send
            information to that company under its own policy:{" "}
            <a
              className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noreferrer"
            >
              Google
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            and{" "}
            <a
              className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
              href="https://www.spotify.com/legal/privacy-policy/"
              target="_blank"
              rel="noreferrer"
            >
              Spotify
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            . Links to Steam, Apple Music, YouTube, Instagram, and TikTok leave this site, and
            those services apply their own terms.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-white">Hosting</h2>
          <p>
            Cloudflare serves the site. To deliver a page and to block abuse, Cloudflare processes
            connection data such as IP address, browser, and the page requested. That processing is
            described in the{" "}
            <a
              className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
              href="https://www.cloudflare.com/privacypolicy/"
              target="_blank"
              rel="noreferrer"
            >
              Cloudflare privacy policy
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-white">Cookies</h2>
          <p>
            This site does not set its own cookies. It does not run analytics, and it does not run
            advertising tags.
          </p>
          <p>
            The YouTube and Spotify players can set cookies after you press play. You can block
            third-party cookies in your browser, and you can still read every page on the site if
            you do.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-white">Children</h2>
          <p>
            The site is a professional portfolio. It is not directed at children under 13, and the
            contact form should not be used to send a child’s personal information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-2xl text-white">Changes</h2>
          <p>
            If the site starts handling information differently, this page will change and the date
            at the top will change with it.
          </p>
        </section>
      </div>
    </article>
    </ContentPanel>
  );
}
