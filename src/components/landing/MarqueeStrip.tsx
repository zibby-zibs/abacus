import { MARQUEE_ITEMS } from "@/components/landing/constants";

export function MarqueeStrip() {
  const loop = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      className="overflow-hidden border-y border-neutral-300/80 bg-forest-100/80 py-[18px] dark:border-white/10 dark:bg-forest-800/15"
      aria-hidden
    >
      <div className="flex w-max animate-landing-marquee whitespace-nowrap">
        {loop.map((label, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-8 text-xs font-medium tracking-[0.1em] text-neutral-500 uppercase dark:text-foreground-muted"
          >
            {label}
            <span className="size-1 rounded-full bg-gold-500/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
