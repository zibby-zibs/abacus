import { HugeiconsIcon } from "@hugeicons/react";
import {
	DiamondIcon,
	FireIcon,
	GemIcon,
	RocketIcon,
	SparklesIcon,
	Target01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { QUESTS, type Quest } from "./mockData";

const ICON_MAP = {
	fire: FireIcon,
	rocket: RocketIcon,
	target: Target01Icon,
	diamond: DiamondIcon,
	gem: GemIcon,
	sparkles: SparklesIcon,
} as const;

const ACCENTS: Record<Quest["icon"], { bg: string; text: string; bar: string }> = {
	fire: {
		bg: "bg-orange-500/15",
		text: "text-orange-300",
		bar: "from-orange-500 to-rose-400",
	},
	rocket: {
		bg: "bg-fuchsia-500/15",
		text: "text-fuchsia-300",
		bar: "from-fuchsia-500 to-violet-400",
	},
	target: {
		bg: "bg-emerald-500/15",
		text: "text-emerald-300",
		bar: "from-emerald-500 to-teal-300",
	},
	diamond: {
		bg: "bg-cyan-500/15",
		text: "text-cyan-300",
		bar: "from-cyan-500 to-sky-300",
	},
	gem: {
		bg: "bg-violet-500/15",
		text: "text-violet-300",
		bar: "from-violet-500 to-fuchsia-300",
	},
	sparkles: {
		bg: "bg-gold-500/15",
		text: "text-gold-300",
		bar: "from-gold-500 to-amber-300",
	},
};

export function QuestsCard() {
	return (
		<section className="rounded-2xl border border-white/8 bg-surface/60 p-5 backdrop-blur sm:p-6">
			<header className="mb-5 flex items-center justify-between">
				<div>
					<h3 className="font-serif text-2xl font-semibold text-offwhite">
						Daily Quests
					</h3>
					<p className="mt-0.5 text-[11px] font-medium text-foreground-muted">
						Knock these out for bonus XP and rank boosts.
					</p>
				</div>
				<span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
					<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
					Refreshes in 14h
				</span>
			</header>

			<ul className="grid gap-3">
				{QUESTS.map((q) => {
					const Icon = ICON_MAP[q.icon];
					const accent = ACCENTS[q.icon];
					const done = q.progress >= 1;
					return (
						<li
							key={q.id}
							className="group relative overflow-hidden rounded-xl border border-white/8 bg-background/40 p-4 transition-colors hover:border-white/15"
						>
							<div className="flex items-start gap-3">
								<div
									className={cn(
										"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
										accent.bg,
									)}
								>
									<HugeiconsIcon
										icon={Icon}
										size={20}
										strokeWidth={2}
										className={accent.text}
									/>
								</div>
								<div className="min-w-0 flex-1">
									<div className="flex flex-wrap items-baseline justify-between gap-2">
										<h4 className="text-sm font-semibold text-offwhite">
											{q.title}
										</h4>
										<span
											className={cn(
												"inline-flex items-center gap-1 rounded-md bg-gold-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-gold-300",
											)}
										>
											+{q.reward} XP
										</span>
									</div>
									<p className="mt-0.5 text-[12px] text-foreground-muted">
										{q.subtitle}
									</p>
									<div className="mt-3 flex items-center gap-3">
										<div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
											<div
												className={cn(
													"h-full rounded-full bg-gradient-to-r",
													accent.bar,
												)}
												style={{ width: `${Math.round(q.progress * 100)}%` }}
											/>
										</div>
										<span className="font-mono text-[10px] font-bold text-foreground-muted">
											{Math.round(q.progress * 100)}%
										</span>
									</div>
									<div className="mt-2 flex items-center justify-between text-[10px] text-foreground-muted">
										<span>⏳ {q.expiresIn}</span>
										{done && (
											<span className="font-bold text-emerald-400">
												Claim ↗
											</span>
										)}
									</div>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
