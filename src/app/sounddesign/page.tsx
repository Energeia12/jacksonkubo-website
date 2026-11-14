import type { Metadata } from "next";
import { HeroMedia } from "@/components/hero-media";
import { PageBanner } from "@/components/page-banner";

export const metadata: Metadata = {
  title: "Sound Design",
  description:
    "A sound redesign of Ivern, from League of Legends, by Jackson Kubo.",
};

export default function SoundDesignPage() {
  return (
    <>
      <PageBanner wordmark="/media/wordmark-sound.png" alt="Sound design">
        <HeroMedia
          webm="/media/synth.webm"
          mp4="/media/synth.mp4"
          poster="/media/synth-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </PageBanner>
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url(/media/sound-nebula.jpg)" }}
      >
        <div className="bg-[#07060d]/72">
          <div className="mx-auto max-w-[68ch] px-4 py-20">
            <h2 className="font-display text-4xl text-white sm:text-5xl">
              Sound Redesign for Ivern
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#f3efe6]">
              A sound redesign of Ivern, from League of Legends.
            </p>
            <figure className="mt-8">
              <div className="overflow-hidden bg-black">
                <iframe
                  title="Jackson Kubo — Sound Redesign for Ivern"
                  src="https://www.youtube-nocookie.com/embed/iBQ_OHFTXoM"
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <figcaption className="mt-2 text-sm text-[#d4cec3]">
                Jackson Kubo, Sound Redesign for Ivern
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
