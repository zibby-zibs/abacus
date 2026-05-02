import { HeroBeadGrid } from "@/components/landing/HeroBeadGrid";
import { SendIcon } from "@/components/landing/SendIcon";
import { WHATSAPP_URL } from "@/components/landing/constants";
import { cn } from "@/lib/utils";
import ConversationalCard from "./conversational-card";

const serif =
	"font-[family-name:var(--font-dm-serif-display),ui-serif,Georgia,serif]";

export function HeroSection() {
	return (
		<section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-[clamp(1.25rem,4vw,3.25rem)] pb-[72px] pt-24">
			<div
				className="pointer-events-none absolute -top-[180px] -right-[120px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(ellipse_35%_40%_at_35%_40%,rgba(45,97,71,0.2)_0%,rgba(26,58,46,0.1)_40%,transparent_70%)] blur-sm dark:bg-[radial-gradient(ellipse_35%_40%_at_35%_40%,rgba(45,97,71,0.55)_0%,rgba(26,58,46,0.3)_40%,transparent_70%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -bottom-[200px] -left-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_60%_55%_at_60%_55%,rgba(245,200,66,0.14)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_60%_55%_at_60%_55%,rgba(245,200,66,0.07)_0%,transparent_65%)]"
				aria-hidden
			/>
			<HeroBeadGrid />
			<div className="absolute top-0 right-0 flex h-full w-[55%] items-center justify-center opacity-[0.95]">
				<ConversationalCard />
			</div>
			{/* <div className="absolute top-9 left-[clamp(1.25rem,4vw,3.25rem)] font-mono text-[11px] font-medium tracking-[0.14em] text-neutral-500 uppercase dark:text-foreground-muted">
        Abacus — 2026
      </div> */}
			<div className="relative max-w-container">
				<p className="mb-7 flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.16em] text-gold-600 uppercase opacity-80 dark:text-gold-500">
					<span className="h-px w-7 bg-gold-500/60" />
					WhatsApp-native finance
				</p>
				<h1
					className={cn(
						serif,
						"text-[clamp(4rem,9vw,9.25rem)] leading-[0.9] font-normal tracking-[-0.035em] text-forest-900 dark:text-offwhite",
					)}
				>
					Know
					<br />
					your
					<br />
					<span className="italic text-gold-600 dark:text-gold-500">
						money.
					</span>
				</h1>
				<div className="mt-[52px] flex flex-wrap items-end justify-between gap-10">
					<p className="max-w-[380px] text-lg font-light leading-relaxed text-neutral-700 dark:text-foreground-muted">
						<strong className="font-medium text-forest-900 dark:text-foreground/90">
							Your expenses, budgets, and debts
						</strong>{" "}
						— tracked entirely inside WhatsApp. No app. No dashboard. Just talk.
					</p>
					<div className="flex shrink-0 items-center gap-5">
						<a
							href={WHATSAPP_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2.5 rounded-sm bg-gold-500 px-9 py-[18px] text-[15px] font-bold text-primary-fg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#ffd84a] hover:shadow-[0_16px_40px_rgba(245,200,66,0.25)] dark:text-forest-900"
						>
							<SendIcon size={18} className="shrink-0" />
							Get early access
						</a>
						<a
							href="#how"
							className="cursor-pointer text-sm font-medium whitespace-nowrap text-neutral-600 transition-colors hover:text-forest-900 dark:text-foreground-muted dark:hover:text-offwhite"
						>
							See how it works →
						</a>
					</div>
				</div>
			</div>
			<div
				className="absolute right-[clamp(1.25rem,4vw,3.25rem)] bottom-[72px] flex flex-col items-center gap-1.5"
				aria-hidden
			>
				<div className="h-[60px] w-px animate-landing-scroll-pulse bg-gradient-to-b from-transparent to-gold-500/40 dark:to-gold-500/40" />
				<span className="text-[9px] font-semibold tracking-[0.15em] text-neutral-500 uppercase [writing-mode:vertical-rl] dark:text-foreground-muted">
					Scroll
				</span>
			</div>
		</section>
	);
}
