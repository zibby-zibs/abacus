import { SendIcon } from "@/components/landing/SendIcon";
import { WHATSAPP_URL } from "@/components/landing/constants";
import { cn } from "@/lib/utils";

const serif =
  "font-[family-name:var(--font-dm-serif-display),ui-serif,Georgia,serif]";

export function FinalCtaSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-[clamp(1.25rem,4vw,3.25rem)] py-[180px] text-center">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,97,71,0.12)_0%,rgba(224,237,231,0.35)_40%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(26,58,46,0.6)_0%,rgba(26,58,46,0.2)_40%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/10 dark:border-gold-500/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[880px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/5 dark:border-gold-500/5"
        aria-hidden
      />
      <p className="relative mb-7 text-[11px] font-semibold tracking-[0.16em] text-gold-600 uppercase dark:text-gold-500/60">
        Get started
      </p>
      <h2
        className={cn(
          serif,
          "relative mb-8 text-balance text-[clamp(3rem,7vw,7rem)] leading-[0.95] font-normal tracking-[-0.035em] text-forest-900 dark:text-offwhite"
        )}
      >
        Start tracking
        <br />
        <em className="italic text-gold-600 dark:text-gold-500">free.</em>
        <br />
        <span className="text-transparent [-webkit-text-stroke:1.5px_rgb(28_40_32/0.35)] dark:[-webkit-text-stroke-color:rgb(255_255_255/0.25)]">
          Open WhatsApp.
        </span>
      </h2>
      <p className="relative mb-[52px] max-w-[360px] text-base font-light leading-relaxed text-neutral-600 dark:text-foreground-muted/90">
        No sign-up. No download. Just open WhatsApp and say hi.
      </p>
      <div className="relative flex flex-wrap items-center justify-center gap-4">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-sm bg-gold-500 px-9 py-[18px] text-[15px] font-bold text-primary-fg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#ffd84a] hover:shadow-[0_16px_40px_rgba(245,200,66,0.25)] dark:text-forest-900"
        >
          <SendIcon size={18} />
          Start on WhatsApp
        </a>
        <span className="cursor-default text-sm font-medium text-neutral-600 dark:text-foreground-muted">
          Free · No download · 30 seconds
        </span>
      </div>
    </section>
  );
}
