import { socials, site } from "@/lib/site";

function Icon({ label }: { label: string }) {
  const common = {
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    className: "size-4",
    fill: "currentColor",
  };
  if (label === "YouTube") {
    return (
      <svg {...common}>
        <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
      </svg>
    );
  }
  if (label === "Instagram") {
    return (
      <svg {...common}>
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8zM17.4 6.4a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
      </svg>
    );
  }
  if (label === "TikTok") {
    return (
      <svg {...common}>
        <path d="M14.5 3c.4 2.4 1.8 4.1 4.2 4.4v2.4c-1.5 0-2.9-.5-4.1-1.3v6.4a6.1 6.1 0 1 1-6.1-6.1c.3 0 .6 0 .9.1v2.6a3.5 3.5 0 1 0 2.6 3.4V3h2.5z" />
      </svg>
    );
  }
  if (label === "Spotify") {
    return (
      <svg {...common}>
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.6 14.4a.7.7 0 0 1-1 .2c-2.6-1.6-5.9-2-9.8-1.1a.7.7 0 0 1-.3-1.4c4.2-1 8-0.6 11 1.3a.7.7 0 0 1 .1 1zm1.3-2.9a.9.9 0 0 1-1.2.3c-3-1.8-7.6-2.4-11.1-1.3a.9.9 0 0 1-.5-1.7c4.1-1.2 9.2-.6 12.6 1.5a.9.9 0 0 1 .2 1.2zm.1-3c-3.4-2-9.1-2.2-12.4-1.2a1 1 0 0 1-.6-1.9c3.8-1.2 10.1-.9 14.1 1.4a1 1 0 0 1-1.1 1.7z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M16.4 2.2c-.1.9-.5 1.7-1.2 2.4-.6.6-1.4 1-2.2 1.1.1.1.1-.8.1-1.2 0-2.2 1.8-3.9 4-3.5-.2.4-.4.8-.7 1.2zM12.2 7.2c1.2 0 2.1-.7 3.2-.7 1 0 2.2.6 2.9 1.7-2.5 1.4-2.1 5.1.5 6.1-.5 1.4-1.2 2.7-2.2 3.7-1 .9-1.8.9-2.8.3-1.1-.6-2-.6-3.1 0-1.3.7-2 .4-2.8-.5-1.8-1.6-3.2-4.5-3.2-7.8 0-3.1 2-4.6 3.9-4.6.9 0 2 .6 3.6.6z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#07060d]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8">
        <ul className="flex items-center gap-2">
          {socials.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="flex size-10 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Icon label={item.label} />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-white/70">©2026 {site.name}</p>
      </div>
    </footer>
  );
}
