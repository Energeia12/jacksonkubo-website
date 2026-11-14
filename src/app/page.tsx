import { ContentPanel } from "@/components/content-panel";
import { HeroMedia } from "@/components/hero-media";
import { Wordmark } from "@/components/wordmark";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-black">
        <HeroMedia
          webm="/media/hero.webm"
          mp4="/media/hero.mp4"
          poster="/media/hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover object-[center_32%] sm:object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent via-55% to-[#07060d]" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-end px-4 pt-28 pb-8 sm:pb-[7vh]">
          <h1 className="flex w-full flex-col items-center">
            <Wordmark
              src="/media/wordmark-jackson.png"
              alt="Jackson Kubo"
              className="max-h-16 sm:max-h-24 md:max-h-32"
            />
            <Wordmark
              src="/media/wordmark-role.png"
              alt="Composer and sound designer"
              className="mt-4 max-h-7 sm:mt-5 sm:max-h-9"
            />
          </h1>
        </div>
      </section>

      <ContentPanel image="/media/galaxy.jpg">
          <div className="mx-auto max-w-[68ch] pt-8">
            <div className="space-y-6 text-lg leading-relaxed text-[#f3efe6]">
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
                  className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  B.L.U.E.
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>{" "}
                (Build, Launch, Upgrade, Evolve) at BlueHeaven Aerospace Corporation.
              </p>
            </div>
          </div>
          <div className="pt-16">
            <Wordmark
              src="/media/wordmark-about.png"
              alt="About me"
              className="max-h-20 sm:max-h-28"
            />
          </div>
      </ContentPanel>
    </>
  );
}
