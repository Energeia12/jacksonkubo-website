import type { Metadata } from "next";
import { CueList } from "@/components/cue-list";
import { HeroMedia } from "@/components/hero-media";
import { Wordmark } from "@/components/wordmark";
import { buttonVariants } from "@/components/ui/button";
import { cuesFor, projects } from "@/lib/site";
import { cn } from "cn";

export const metadata: Metadata = {
  title: "Composition",
  description:
    "Game and interactive scores by Jackson Kubo, including B.L.U.E., BLEED RUNNER, Oosia, and Crescendo.",
};

export default function CompositionPage() {
  return (
    <>
      <section className="relative min-h-[48vh] overflow-hidden">
        <img
          src="/media/comp-space.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#07060d]" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-4xl items-end px-4 pt-28 pb-6">
          <h1 className="w-full">
            <Wordmark src="/media/wordmark-composition.png" alt="Composition" />
          </h1>
        </div>
      </section>
      <nav
        aria-label="Scores"
        className="sticky top-16 z-40 border-b border-white/10 bg-[#07060d]/95"
      >
        <ul className="mx-auto flex max-w-6xl gap-x-6 gap-y-2 overflow-x-auto px-4 py-4">
          {projects.map((project) => (
            <li key={project.id}>
              <a
                href={`#${project.id}`}
                className="inline-flex whitespace-nowrap py-2 text-sm text-[#d4cec3] underline-offset-4 hover:text-white hover:underline"
              >
                {project.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {projects.map((project) => (
        <section
          key={project.id}
          id={project.id}
          className="relative scroll-mt-32 border-t border-white/10"
        >
          <img
            src={project.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#07060d]/82" />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <h2 className="font-display text-4xl text-white sm:text-5xl">{project.title}</h2>
              <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-[#f3efe6]">
                {project.description}
              </p>
              {"videoFile" in project && project.videoFile ? (
                <HeroMedia
                  webm={project.videoFile.webm}
                  mp4={project.videoFile.mp4}
                  poster={project.videoFile.poster}
                  className="mt-8 aspect-square w-full max-w-sm object-cover"
                />
              ) : project.imageAlt ? (
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="mt-8 w-full max-w-md object-cover"
                />
              ) : null}
              {project.links.length > 0 ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.links.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        buttonVariants({ variant: index === 0 ? "default" : "outline" }),
                        index === 0
                          ? "h-10 px-4"
                          : "h-10 bg-transparent px-4 text-white",
                      )}
                    >
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              ) : null}
              {"video" in project && project.video ? (
                <figure className="mt-8">
                  <div className="overflow-hidden bg-black">
                    <iframe
                      title={project.video.title}
                      src={`https://www.youtube-nocookie.com/embed/${project.video.id}`}
                      className="aspect-video w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <figcaption className="mt-2 text-sm text-[#d4cec3]">{project.video.title}</figcaption>
                </figure>
              ) : null}
            </div>
            <CueList cues={cuesFor(project.id)} />
          </div>
        </section>
      ))}
    </>
  );
}
