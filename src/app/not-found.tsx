import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function NotFound() {
  return (
    <section
      className="relative flex min-h-[100svh] items-end bg-cover bg-center"
      style={{ backgroundImage: "url(/media/galaxy.jpg)" }}
    >
      <div className="absolute inset-0 bg-[#07060d]/60" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-32 pb-24">
        <h1 className="font-display text-4xl text-white sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-[#f3efe6]">
          That address is not part of this site.
        </p>
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex h-11 px-6")}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
