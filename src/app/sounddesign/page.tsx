import type { Metadata } from "next";
import { Wordmark } from "@/components/wordmark";
import { HeroMedia } from "@/components/hero-media";

export const metadata: Metadata = {
  title: "Sound Design",
  description:
    "Sound design by Jackson Kubo, including a redesign for Ivern and audio direction on B.L.U.E.",
};

export default function SoundDesignPage() {
  return (
    <>
      <section className="relative min-h-[46vh] overflow-hidden bg-black">
        <HeroMedia
          webm="/media/synth.webm"
          mp4="/media/synth.mp4"
          poster="/media/synth-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[46vh] max-w-4xl items-end px-4 pt-28 pb-8">
          <h1 className="w-full">
            <Wordmark src="/media/wordmark-sound.png" alt="Sound design" />
          </h1>
        </div>
      </section>
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
              A sound redesign of Ivern, from League of Legends. Jackson is also Audio Lead on
              B.L.U.E. at BlueHeaven Aerospace.
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
