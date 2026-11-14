import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function NotFound() {
  return (
    <section
      className="flex min-h-[100svh] items-center bg-cover bg-center"
      style={{ backgroundImage: "url(/media/galaxy.jpg)" }}
    >
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <p className="font-display text-sm tracking-[0.22em] text-white/70 uppercase">404</p>
        <h1 className="mt-3 font-display text-4xl text-white">This page drifted out of orbit.</h1>
        <p className="mt-4 text-lg text-white/80">
          The address does not match a page on Jackson Kubo&apos;s site.
        </p>
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex h-11 px-6")}>
          Back home
        </Link>
      </div>
    </section>
  );
}
