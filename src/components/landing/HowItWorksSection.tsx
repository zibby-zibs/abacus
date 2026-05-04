import { Reveal } from "@/components/landing/Reveal";
import { cn } from "@/lib/utils";

const serif =
	"font-[family-name:var(--font-dm-serif-display),ui-serif,Georgia,serif]";

const steps = [
	{
		n: "01",
		title: "Open WhatsApp",
		desc: "Find Abakus and say hi. Takes 30 seconds to set up — no form, no email, no download. Just a conversation.",
	},
	{
		n: "02",
		title: "Talk normally",
		desc: 'Tell it what you spent, what you\'re owed, what your budget is. Plain English and context fully understood — "okada", "NEPA", "5k".',
	},
	{
		n: "03",
		title: "Always know",
		desc: "Ask anything about your money. Get a clear, instant answer — breakdowns by category, balances, budgets, who owes what.",
	},
] as const;

export function HowItWorksSection() {
	return (
		<section
			className="relative px-[clamp(1.25rem,4vw,3.25rem)] py-40"
			id="how"
		>
			<div
				className={cn(
					serif,
					"pointer-events-none absolute top-10 -right-5 select-none text-[clamp(8rem,24vw,30rem)] leading-none font-normal tracking-[-0.05em] text-forest-900/[0.04] dark:text-white/[0.02]",
				)}
				aria-hidden
			>
				3
			</div>
			<div className="relative mx-auto grid max-w-container grid-cols-1 items-start gap-16 lg:grid-cols-[1fr_1.8fr] lg:gap-[100px]">
				<div className="lg:sticky lg:top-[140px]">
					<p className="mb-6 flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.14em] text-gold-600 uppercase dark:text-gold-500/70">
						<span className="h-px w-6 bg-gold-500/50" />
						How it works
					</p>
					<h2
						className={cn(
							serif,
							"text-[clamp(2.25rem,3.5vw,3.5rem)] leading-tight font-normal tracking-[-0.025em] text-forest-900 dark:text-offwhite",
						)}
					>
						Up and running in under{" "}
						<em className="italic text-gold-600 dark:text-gold-500">
							a minute.
						</em>
					</h2>
				</div>
				<div className="flex flex-col">
					{steps.map((s) => (
						<Reveal key={s.n}>
							<div className="grid grid-cols-[80px_1fr] gap-0 border-b border-neutral-300/80 py-12 first:border-t dark:border-white/10">
								<span className="pt-1 font-mono text-[11px] font-medium tracking-[0.1em] text-gold-600/80 dark:text-gold-500/50">
									{s.n}
								</span>
								<div className="flex flex-col gap-2.5">
									<div
										className={cn(
											serif,
											"text-[28px] leading-snug font-normal tracking-[-0.015em] text-forest-900 dark:text-offwhite",
										)}
									>
										{s.title}
									</div>
									<p className="max-w-[420px] text-[15px] font-light leading-relaxed text-neutral-600 dark:text-foreground-muted">
										{s.desc}
									</p>
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
