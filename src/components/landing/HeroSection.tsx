import { HeroBeadGrid } from "@/components/landing/HeroBeadGrid";
import { SendIcon } from "@/components/landing/SendIcon";
import { WHATSAPP_URL } from "@/components/landing/constants";
import { cn } from "@/lib/utils";
import ConversationalCard from "./conversational-card";

/** Clears fixed `LandingNav` (~5.5–6.5rem) + safe area. */
const heroTopPad =
	"pt-[max(1.25rem,calc(env(safe-area-inset-top)+6.25rem))] lg:pt-[max(1.5rem,calc(env(safe-area-inset-top)+6.75rem))]";

export function HeroSection() {
	return (
		<section
			className={cn(
				"relative isolate flex min-h-svh flex-col overflow-hidden px-[clamp(1.25rem,4vw,3.25rem)] pb-12 sm:pb-16 lg:pb-20",
				heroTopPad,
			)}
		>
			<div
				className="pointer-events-none absolute -top-[180px] -right-[120px] h-[700px] w-[700px] rounded-full bg-[radial-gradient(ellipse_35%_40%_at_35%_40%,rgba(45,97,71,0.2)_0%,rgba(26,58,46,0.1)_40%,transparent_70%)] blur-sm dark:bg-[radial-gradient(ellipse_35%_40%_at_35%_40%,rgba(45,97,71,0.55)_0%,rgba(26,58,46,0.3)_40%,transparent_70%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute -bottom-[200px] -left-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(ellipse_60%_55%_at_60%_55%,rgba(245,200,66,0.14)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_60%_55%_at_60%_55%,rgba(245,200,66,0.07)_0%,transparent_65%)]"
				aria-hidden
			/>
			<HeroBeadGrid variant="section" />

			<div className="relative z-10 mx-auto flex w-full max-w-container flex-col py-4 sm:py-6 lg:flex-row lg:items-center lg:gap-x-10 lg:py-8 xl:gap-x-14">
				<div className="min-w-0 flex-1">
					<p className="mb-5 flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.16em] text-gold-600 uppercase opacity-80 sm:mb-7 dark:text-gold-500">
						<span className="h-px w-7 shrink-0 bg-gold-500/60" />
						WhatsApp-native finance
					</p>
					<h1
						className={cn(
							"max-w-[12ch] font-serif text-[clamp(2.375rem,1.25rem+5.5vw,9.25rem)] leading-[0.92] font-semibold tracking-[-0.035em] text-balance text-forest-900 lg:max-w-none dark:text-offwhite",
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
					<div className="mt-8 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-10 lg:mt-[52px]">
						<p className="max-w-[min(100%,380px)] text-base font-light leading-relaxed text-pretty text-neutral-700 sm:text-lg dark:text-foreground-muted">
							<strong className="font-medium text-forest-900 dark:text-foreground/90">
								Your expenses, budgets, and debts
							</strong>{" "}
							— tracked entirely inside WhatsApp. No app. No dashboard. Just
							talk.
						</p>
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
							<a
								href={WHATSAPP_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex w-fit items-center justify-center gap-2.5 rounded-sm bg-gold-500 px-7 py-3.5 text-[15px] font-bold text-primary-fg transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#ffd84a] hover:shadow-[0_16px_40px_rgba(245,200,66,0.25)] sm:px-9 sm:py-[18px] dark:text-forest-900"
							>
								<SendIcon size={18} className="shrink-0" />
								Start Tracking
							</a>
							<a
								href="#how"
								className="w-fit cursor-pointer text-sm font-medium text-neutral-600 transition-colors hover:text-forest-900 dark:text-foreground-muted dark:hover:text-offwhite"
							>
								See how it works →
							</a>
						</div>
					</div>
				</div>

				<aside className="relative hidden w-full shrink-0 lg:block lg:w-[min(100%,22rem)] xl:w-[min(100%,24rem)]">
					<HeroBeadGrid variant="column" />
					<div className="relative z-10 flex justify-center lg:justify-end">
						<ConversationalCard />
					</div>
				</aside>
			</div>

			<div
				className="pointer-events-none absolute right-[clamp(1.25rem,4vw,3.25rem)] bottom-8 z-[1] hidden flex-col items-center gap-1.5 lg:flex"
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
