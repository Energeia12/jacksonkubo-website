import Link from "next/link";
import { HeroMedia } from "@/components/hero-media";
import { Wordmark } from "@/components/wordmark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-black">
        <HeroMedia
          webm="/media/hero.webm"
          mp4="/media/hero.mp4"
          poster="/media/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-[#07060d]" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-end px-4 pt-28 pb-16">
          <h1 className="w-full">
            <Wordmark src="/media/wordmark-jackson.png" alt="Jackson Kubo" />
            <Wordmark
              src="/media/wordmark-role.png"
              alt="Composer and sound designer"
              className="max-w-2xl"
            />
          </h1>
        </div>
      </section>

      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url(/media/galaxy.jpg)" }}
      >
        <div className="bg-[#07060d]/55">
          <div className="mx-auto max-w-3xl px-4 py-20 text-center">
            <Wordmark src="/media/wordmark-about.png" alt="About me" className="max-w-md" />
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-white/90 sm:text-xl">
              <p>
                Jackson Kubo creates music for an infinite universe. Combining experimental
                electronic synthesis, live acoustic instrumentation, and sounds of the natural
                world, he crafts living soundscapes at the intersection of reality and the beyond.
              </p>
              <p>
                Growing up, Jackson started his musical journey learning guitar, which soon evolved
                into an obsession with music production and composition. That obsession led him to
                Berklee College of Music, where he studied Games and Interactive Media Scoring. He
                has since relocated to Los Angeles, where the sprawling cityscape and surrounding
                nature fuel his creativity.
              </p>
              <p>
                Jackson is currently working as the Audio Lead for{" "}
                <a
                  href="https://store.steampowered.com/app/4681380/BLUE/"
                  className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  B.L.U.E.
                </a>{" "}
                (Build. Launch. Upgrade. Evolve.) at BlueHeaven Aerospace Corporation.
              </p>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/music" className={cn(buttonVariants({ size: "lg" }), "h-11 px-6")}>
                Listen to the records
              </Link>
              <Link
                href="/composition"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 bg-transparent px-6 text-white",
                )}
              >
                Game scores
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
