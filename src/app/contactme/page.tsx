import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Me",
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
        <div className="bg-[#07060d]/50">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 py-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="text-lg leading-relaxed text-white">
              <p>
                If you have any professional inquiries, please leave a message here, or email me
                at:{" "}
                <a className="text-[#ffb07a] underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </p>
              <p className="mt-6">I do not do audio work for free.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4 sm:p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
