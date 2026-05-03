import { Reveal } from "@/components/landing/Reveal";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardKicker,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const sectionLabel =
	"mb-[18px] flex items-center gap-2.5 text-[9px] font-semibold tracking-[0.18em] text-gold-700/55 uppercase before:block before:h-px before:w-5 before:bg-gold-600/35 dark:text-gold-500/45 dark:before:bg-gold-500/35";

const freemiumRows: [string, string][] = [
	["Monthly transaction limit", "30 transactions"],
	["Basic categories", "Food, Transport, Shopping, Bills"],
	["Basic queries", "“How much did I spend today?”"],
	["WhatsApp replies", "Standard speed (no priority)"],
	["Data export", "None"],
	["Advertisements", "None (clean experience)"],
];

const lightGets: [string, string][] = [
	["Monthly transaction limit", "150 transactions"],
	["Spending reports (category, merchant)", "Visible value every month"],
	["Budget tracking (set & monitor)", "Behavioural hook"],
	["Export to CSV", "Practical utility"],
	["Priority processing", "Faster responses"],
	["1 month history retention", "Enough for budgeting"],
];

const heavyGets: [string, string][] = [
	["Everything in Light", "Baseline"],
	["Debt tracking (owed / owing)", "High value for small businesses"],
	["Split expenses (multiple people)", "Roommates and teams"],
	["Multi-month reports & trends", "See patterns over time"],
	["PDF export", "Professional use"],
	["12 months history retention", "Tax and audit prep"],
	["Priority support", "WhatsApp within 2 hours"],
];

const annualRows: [string, string, string, string, string][] = [
	["Light", "₦500", "₦5,000", "17%", "₦417"],
	["Heavy", "₦2,000", "₦20,000", "17%", "₦1,667"],
];

function FeatureTable({ rows }: { rows: [string, string][] }) {
	return (
		<div className="mt-1 w-full border-t border-neutral-200/90 pt-3 dark:border-white/10">
			<dl className="space-y-2.5">
				{rows.map(([k, v]) => (
					<div
						key={k}
						className="grid gap-1 border-b border-neutral-200/60 pb-2.5 last:border-0 last:pb-0 dark:border-white/[0.06]"
					>
						<dt className="text-[11px] font-medium tracking-wide text-neutral-500 uppercase dark:text-foreground-muted/80">
							{k}
						</dt>
						<dd className="text-[13px] font-light leading-snug text-forest-900 dark:text-offwhite/90">
							{v}
						</dd>
					</div>
				))}
			</dl>
		</div>
	);
}

export function PricingSection() {
	return (
		<section
			className="px-[clamp(1.25rem,4vw,3.25rem)] pb-32 pt-8"
			id="pricing"
			aria-labelledby="pricing-heading"
		>
			<div className="mx-auto max-w-container">
				<p className={sectionLabel}>Pricing</p>
				<div className="mb-14 flex max-w-[720px] flex-col gap-5 border-b border-neutral-300/80 pb-10 dark:border-white/10">
					<h2
						id="pricing-heading"
						className={cn(
							"font-serif",
							"text-[clamp(2rem,3vw,3.25rem)] leading-tight font-normal tracking-[-0.025em] text-forest-900 dark:text-offwhite",
						)}
					>
						Simple tiers. No ads on free. Upgrade when you outgrow the cap.
					</h2>
					<p className="max-w-xl text-[13px] leading-relaxed font-light text-neutral-600 dark:text-foreground-muted/75">
						Start free — most people hit 30 transactions by week three. Light
						unlocks unlimited logging plus reports; Heavy adds debt, splits,
						PDFs, and longer history for businesses and households.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
					<Reveal>
						<Card className="h-full">
							<CardHeader>
								<CardKicker>Tier 1</CardKicker>
								<CardTitle>Freemium — free forever</CardTitle>
								<CardDescription>
									Log expenses in WhatsApp with no ads and no card on file. See
									what&apos;s included below — upgrade only when you need more.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<FeatureTable rows={freemiumRows} />
							</CardContent>
						</Card>
					</Reveal>

					<Reveal>
						<Card variant="accent" className="h-full lg:-translate-y-1">
							<CardHeader>
								<CardKicker>Tier 2</CardKicker>
								<CardTitle>Light</CardTitle>
								<CardDescription>
									<span className="font-mono text-[13px] font-medium text-forest-900 tabular-nums dark:text-offwhite">
										₦500
									</span>
									<span className="text-neutral-600 dark:text-offwhite/45">
										{" "}
										/ month
									</span>
									<span className="mt-2 block text-[12px] text-neutral-500 dark:text-foreground-muted/70">
										For people who log often: a higher monthly cap plus reports,
										budgets, CSV export, and faster replies than free.
									</span>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<FeatureTable rows={lightGets} />
							</CardContent>
						</Card>
					</Reveal>

					<Reveal>
						<Card className="h-full">
							<CardHeader>
								<CardKicker>Tier 3</CardKicker>
								<CardTitle>Heavy / power</CardTitle>
								<CardDescription>
									<span className="font-mono text-[13px] font-medium text-forest-900 tabular-nums dark:text-offwhite">
										₦2,500
									</span>
									<span className="text-neutral-600 dark:text-offwhite/45">
										{" "}
										/ month
									</span>
									<span className="mt-2 block text-[12px] text-neutral-500 dark:text-foreground-muted/70">
										For freelancers, small businesses, and shared households:
										debt and splits, PDFs, longer history, and priority support.
									</span>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<FeatureTable rows={heavyGets} />
							</CardContent>
						</Card>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
