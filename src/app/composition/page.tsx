import type { Metadata } from "next";
import { contentFrameClass } from "@/components/content-panel";
import { CueList } from "@/components/cue-list";
import { PageBanner } from "@/components/page-banner";
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
      <PageBanner wordmark="/media/wordmark-composition.png" alt="Composition">
        <img
          src="/media/comp-space.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </PageBanner>
      {projects.map((project) => (
        <section
          key={project.id}
          id={project.id}
          className="relative flex grow scroll-mt-24 flex-col"
        >
          <img
            src={"background" in project ? project.background : project.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className={cn(contentFrameClass(), "grow")}>
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="min-w-0">
              <h2 className="font-display text-4xl text-white sm:text-5xl">{project.title}</h2>
              <p className="mt-5 max-w-[65ch] text-lg leading-relaxed text-[#f3efe6]">
                {project.description}
              </p>
              {project.imageAlt ? (
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className={
                    project.id === "bleed"
                      ? "mt-8 aspect-square w-full max-w-sm bg-black object-contain"
                      : "mt-8 w-full max-w-md object-cover"
                  }
                />
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
              {project.links.length > 0 ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.links.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(
                        buttonVariants({ variant: index === 0 ? "default" : "outline", size: "lg" }),
                        "h-11 px-5",
                      )}
                    >
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
            <CueList cues={cuesFor(project.id)} />
          </div>
          </div>
        </section>
      ))}
    </>
  );
}
