import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ContentPanel } from "@/components/content-panel";
import { PageBanner } from "@/components/page-banner";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  path: "/contactme/",
  title: "Contact",
  description: "Professional inquiries for composer and sound designer Jackson Kubo.",
});

export default function ContactPage() {
  return (
    <>
      <PageBanner wordmark="/media/wordmark-contact.png" alt="Contact me">
        <img
          src="/media/contact-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
      </PageBanner>
      <ContentPanel image="/media/contact-sky.jpg" width="max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="max-w-[42ch] text-lg leading-relaxed text-[#f3efe6]">
              <p>
                For scoring, sound design, and other professional work, write here or email{" "}
                <a
                  className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
                .
              </p>
              <p className="mt-6">I do not do audio work for free.</p>
            </div>
            <ContactForm />
          </div>
      </ContentPanel>
    </>
  );
}
