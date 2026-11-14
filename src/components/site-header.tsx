"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/site";
import { cn } from "cn";

function normalize(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function SiteHeader() {
  const pathname = normalize(usePathname() || "/");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07060d]/75 backdrop-blur-md">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:text-black"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:justify-center">
        <Link
          href="/"
          className="font-display text-sm tracking-[0.22em] text-white uppercase md:hidden"
        >
          Jackson Kubo
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = normalize(item.href) === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-2 font-display text-[0.95rem] tracking-[0.14em] text-white/80 uppercase transition-colors hover:text-white",
                  active && "bg-white/10 text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </Button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 px-4 py-3 md:hidden"
          aria-label="Primary"
        >
          <ul className="flex flex-col">
            {nav.map((item) => {
              const active = normalize(item.href) === pathname;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-3 font-display tracking-[0.16em] text-white/85 uppercase",
                      active && "bg-white/10 text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
