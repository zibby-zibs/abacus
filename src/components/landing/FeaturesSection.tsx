import { Reveal } from "@/components/landing/Reveal";
import { cn } from "@/lib/utils";

const serif =
  "font-[family-name:var(--font-dm-serif-display),ui-serif,Georgia,serif]";

type Feature = {
  num: string;
  title: string;
  desc: string;
  wide?: boolean;
  accent?: boolean;
  tag?: string;
  /** Extra surface tint for one cell */
  forestTint?: boolean;
};

const features: Feature[] = [
  {
    num: "01",
    title: "Expense tracking",
    desc: "Say what you spent. Logged instantly, categorised automatically.",
  },
  {
    num: "02",
    title: "Budget alerts",
    desc: "Warned before you overspend, not after. You always know where you stand.",
  },
  {
    num: "03",
    title: "Debt tracking",
    desc: "Who owes you, and who you owe. Updated with every message, no awkward forgetting.",
  },
  {
    num: "04",
    title: "Bill splitting",
    desc: 'Split any expense between friends, track who\'s paid, send reminders. "Split last night\'s dinner — 45k between 4 of us." Done.',
    wide: true,
    accent: true,
    tag: "Most used",
  },
  {
    num: "05",
    title: "Monthly reports",
    desc: "A clean summary every month. Totals, breakdowns, trends. Just ask.",
  },
  {
    num: "06",
    title: "Lives in WhatsApp",
    desc: "No app to download. No dashboard to log into. No new habit to form. WhatsApp is already open — that's where Abacus lives.",
    wide: true,
    tag: "The whole point",
    forestTint: true,
  },
];

export function FeaturesSection() {
  return (
    <section
      className="px-[clamp(1.25rem,4vw,3.25rem)] pb-40"
      id="features"
    >
      <div className="mx-auto mb-16 flex max-w-container flex-wrap items-end justify-between gap-6 border-b border-neutral-300/80 pb-10 dark:border-white/10">
        <h2
          className={cn(
            serif,
            "max-w-[500px] text-[clamp(2rem,3vw,3.25rem)] leading-tight font-normal tracking-[-0.025em] text-forest-900 dark:text-offwhite"
          )}
        >
          Everything your money needs. Nothing it doesn&apos;t.
        </h2>
        <p className="max-w-[280px] text-[13px] leading-relaxed text-neutral-600 dark:text-foreground-muted/70">
          Six capabilities that replace the budgeting apps you&apos;ve already
          abandoned.
        </p>
      </div>
      <div className="mx-auto grid max-w-container grid-cols-1 gap-px overflow-hidden rounded-2xl border border-neutral-300/80 bg-neutral-300/80 md:grid-cols-3 dark:border-white/10 dark:bg-white/10">
        {features.map((f) => (
          <Reveal key={f.num}>
            <div
              className={cn(
                "flex cursor-default flex-col gap-3.5 bg-offwhite p-9 transition-colors duration-300 dark:bg-background",
                f.wide && "md:col-span-2",
                f.accent &&
                  "bg-gold-500/[0.08] hover:bg-gold-500/15 dark:bg-gold-500/5 dark:hover:bg-gold-500/10",
                !f.accent &&
                  !f.forestTint &&
                  "hover:bg-forest-100 dark:hover:bg-forest-800/50",
                f.forestTint &&
                  "bg-forest-100/80 hover:bg-forest-100 dark:bg-forest-900/25 dark:hover:bg-forest-800/40"
              )}
            >
              <span className="font-mono text-[10px] font-medium tracking-[0.12em] text-gold-600/80 uppercase dark:text-gold-500/40">
                {f.num}
              </span>
              <div
                className={cn(
                  serif,
                  "text-[22px] leading-snug font-normal tracking-[-0.01em] text-forest-900 dark:text-offwhite"
                )}
              >
                {f.title}
              </div>
              <p className="m-0 text-sm font-light leading-relaxed text-neutral-600 dark:text-foreground-muted/90">
                {f.desc}
              </p>
              {f.tag ? (
                <span className="mt-1 w-fit rounded-full bg-gold-500/15 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-gold-700 dark:bg-gold-500/12 dark:text-gold-500">
                  {f.tag}
                </span>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
