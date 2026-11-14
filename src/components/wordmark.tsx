import { cn } from "cn";

export function Wordmark({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "mx-auto w-full max-w-3xl mix-blend-screen select-none",
        className,
      )}
    />
  );
}
