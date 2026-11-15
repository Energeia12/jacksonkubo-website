import type { ReactNode } from "react";
import { cn } from "cn";

const frame =
  "relative mx-auto min-w-0 w-[calc(100%-2rem)] bg-black/70 px-5 sm:w-[calc(100%-3.5rem)] sm:px-8 lg:w-[calc(100%-6rem)]";

export function ContentPanel({
  children,
  image,
  imageAlt = "",
  width = "max-w-6xl",
  underHeader = false,
  className,
}: {
  children: ReactNode;
  image?: string;
  imageAlt?: string;
  width?: string;
  underHeader?: boolean;
  className?: string;
}) {
  return (
    <section className={cn("relative flex grow flex-col", className)}>
      {image ? (
        <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      <div
        className={cn(
          frame,
          "grow",
          underHeader ? "pt-28 pb-16" : "py-14 sm:py-16",
          width,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function contentFrameClass(width = "max-w-6xl") {
  return cn(frame, "py-14 sm:py-16", width);
}
