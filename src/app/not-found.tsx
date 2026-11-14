import Link from "next/link";
import { ContentPanel } from "@/components/content-panel";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function NotFound() {
  return (
    <ContentPanel image="/media/galaxy.jpg" width="max-w-3xl" underHeader>
      <h1 className="font-display text-4xl text-white sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-[#f3efe6]">
        That address is not part of this site.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex h-11 px-6")}>
        Back to home
      </Link>
    </ContentPanel>
  );
}
