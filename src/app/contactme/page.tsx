import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Professional inquiries for composer and sound designer Jackson Kubo.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative min-h-[42vh] overflow-hidden">
        <img
          src="/media/contact-hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-[#07060d]" />
        <div className="relative mx-auto flex min-h-[42vh] max-w-4xl items-end px-4 pt-28 pb-6">
          <h1 className="w-full">
            <Wordmark src="/media/wordmark-contact.png" alt="Contact me" />
          </h1>
        </div>
      </section>
      <section
        className="bg-cover bg-center"
        style={{ backgroundImage: "url(/media/contact-sky.jpg)" }}
      >
        <div className="bg-[#07060d]/72">
          <div className="mx-auto grid max-w-5xl gap-12 px-4 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="max-w-[42ch] text-lg leading-relaxed text-[#f3efe6]">
              <p>
                For scoring, sound design, and other professional work, write here or email{" "}
                <a
                  className="text-[#ffb07a] underline decoration-[#ffb07a]/50 underline-offset-4 hover:decoration-[#ffb07a]"
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
        </div>
      </section>
    </>
  );
}
