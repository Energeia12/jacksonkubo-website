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
        <div className="bg-[#07060d]/72">
          <div className="mx-auto max-w-[68ch] px-4 py-24">
            <Wordmark
              src="/media/wordmark-about.png"
              alt="About me"
              className="mx-0 max-w-xs"
            />
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-[#f3efe6]">
              <p>
                Jackson Kubo creates music for an infinite universe. Combining experimental
                electronic synthesis, live acoustic instrumentation, and sounds of the natural
                world, he crafts living soundscapes at the intersection of reality and the beyond.
              </p>
              <p>
                He started on guitar, and that practice became an obsession with production and
                composition. He studied Games and Interactive Media Scoring at Berklee College of
                Music, then moved to Los Angeles, where the city and the surrounding landscape shape
                the music.
              </p>
              <p>
                He is Audio Lead on{" "}
                <a
                  href="https://store.steampowered.com/app/4681380/BLUE/"
                  className="underline decoration-[#ffb07a]/50 underline-offset-4 hover:decoration-[#ffb07a]"
                  target="_blank"
                  rel="noreferrer"
                >
                  B.L.U.E.
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                (Build, Launch, Upgrade, Evolve) at BlueHeaven Aerospace Corporation.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
