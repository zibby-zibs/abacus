import { Reveal } from "@/components/landing/Reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const stats = [
	{
		value: (
			<>
				100<span className="text-gold-600 dark:text-gold-500">+</span>
			</>
		),
		label: "people already tracking their money on WhatsApp",
	},
	{
		value: <>₦0</>,
		label: "to get started. Free, forever.",
	},
	{
		value: (
			<>
				30<span className="text-gold-600 dark:text-gold-500">s</span>
			</>
		),
		label: "to set up. No forms, no email, no download.",
	},
];

function StatBlock({ value, label }: { value: ReactNode; label: string }) {
	return (
		<div className="flex flex-col items-start gap-2.5 px-0 py-8 sm:px-12 lg:px-20">
			<div
				className={cn(
					"text-[clamp(3.25rem,6vw,5.5rem)] font-serif leading-none font-normal tracking-[-0.035em] text-forest-900 dark:text-offwhite",
				)}
			>
				{value}
			</div>
			<div className="max-w-xs text-sm font-light leading-normal text-neutral-600 dark:text-foreground-muted/80">
				{label}
			</div>
		</div>
	);
}

export function NumbersSection() {
	return (
		<section
			className="border-y border-neutral-300/80 px-[clamp(1.25rem,4vw,3.25rem)] py-[120px] dark:border-white/10"
			aria-label="By the numbers"
		>
			<div className="mx-auto flex max-w-container flex-col gap-12 sm:hidden">
				{stats.map((s, i) => (
					<Reveal key={i}>
						<StatBlock value={s.value} label={s.label} />
					</Reveal>
				))}
			</div>
			<div className="mx-auto hidden max-w-full grid-cols-[1fr_1px_1fr_1px_1fr] items-stretch gap-0 sm:grid">
				<Reveal>
					<StatBlock value={stats[0].value} label={stats[0].label} />
				</Reveal>
				<div className="bg-neutral-300/80 dark:bg-white/10" aria-hidden />
				<Reveal>
					<StatBlock value={stats[1].value} label={stats[1].label} />
				</Reveal>
				<div className="bg-neutral-300/80 dark:bg-white/10" aria-hidden />
				<Reveal>
					<StatBlock value={stats[2].value} label={stats[2].label} />
				</Reveal>
			</div>
		</section>
	);
}
