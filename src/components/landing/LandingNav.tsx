"use client";

import { AbacusLogoInner } from "@/components/landing/AbacusLogo";
import { WHATSAPP_URL } from "@/components/landing/constants";
import { useLandingTheme } from "@/components/landing/LandingThemeProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { mode, setMode } = useLandingTheme();
  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-neutral-300/80 bg-white/80 p-0.5 dark:border-white/10 dark:bg-white/5"
      role="group"
      aria-label="Color theme"
    >
      {(
        [
          ["light", "Light"],
          ["system", "Auto"],
          ["dark", "Dark"],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => setMode(value)}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors",
            mode === value
              ? "bg-forest-800 text-offwhite dark:bg-gold-500 dark:text-forest-900"
              : "text-neutral-600 hover:text-forest-900 dark:text-foreground-muted dark:hover:text-foreground"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function LandingNav() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-[500] flex items-center justify-between px-[clamp(1.25rem,4vw,3.25rem)] pt-7 pb-7 transition-[padding,background-color] duration-300 ease-out",
        compact &&
          "bg-offwhite/90 py-[18px] backdrop-blur-xl dark:bg-background/85"
      )}
      aria-label="Primary"
    >
      <Link
        href="/"
        className="flex cursor-pointer items-center gap-2.5 text-forest-900 dark:text-offwhite"
      >
        <AbacusLogoInner variant="nav" />
      </Link>
      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <ThemeToggle />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap rounded-full border border-primary-border bg-primary-muted px-5 py-2.5 text-[13px] font-semibold text-gold-500 transition-colors hover:bg-gold-500 hover:text-forest-900 dark:border-gold-500/25 dark:bg-gold-500/10"
        >
          Start on WhatsApp
        </a>
      </div>
    </nav>
  );
}
