import type { ReactNode } from "react";
import { Wordmark } from "@/components/wordmark";

export function PageBanner({
  wordmark,
  alt,
  children,
}: {
  wordmark: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <section className="relative h-[48vh] min-h-[22rem] overflow-hidden bg-black">
      {children}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-[#07060d]" />
      <div className="relative flex h-full items-center justify-center px-6 pt-16">
        <h1>
          <Wordmark
            src={wordmark}
            alt={alt}
            className="max-h-16 sm:max-h-24 md:max-h-28"
          />
        </h1>
      </div>
    </section>
  );
}
