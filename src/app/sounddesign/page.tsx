import type { Metadata } from "next";
import { Wordmark } from "@/components/wordmark";
import { HeroMedia } from "@/components/hero-media";

export const metadata: Metadata = {
  title: "Sound Design",
  description: "Sound design work by Jackson Kubo, including a B.L.U.E. work in progress.",
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
        <div className="absolute inset-0 bg-black/35" />
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
        <div className="bg-[#07060d]/55">
          <div className="mx-auto max-w-3xl px-4 py-16">
            <h2 className="text-center font-display text-4xl tracking-wide text-white sm:text-5xl">
              B.L.U.E. WIP
            </h2>
            <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-black">
              <iframe
                title="Jackson Kubo — Sound Redesign for Ivern"
                src="https://www.youtube-nocookie.com/embed/iBQ_OHFTXoM"
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-center text-white/75">Sound Redesign for Ivern</p>
          </div>
        </div>
      </section>
    </>
  );
}
