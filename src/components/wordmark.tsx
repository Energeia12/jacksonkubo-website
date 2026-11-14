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
        "mx-auto block h-auto w-auto max-w-full mix-blend-screen select-none",
        className,
      )}
    />
  );
}
