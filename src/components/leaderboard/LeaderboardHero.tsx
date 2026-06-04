import { HugeiconsIcon } from "@hugeicons/react";
import {
	ChampionIcon,
	FireIcon,
	SparklesIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import type { LeaderboardResponse, LeaderboardSort } from "@/types/admin";
import { FloatingShapes } from "./FloatingShapes";
import { SEASON, formatCount, getWeekEndsIn } from "./mockData";
import { SORT_LABEL } from "./transform";

export function LeaderboardHero({
	data,
	sort,
	isLoading,
}: {
	data: LeaderboardResponse | undefined;
	sort: LeaderboardSort;
	isLoading: boolean;
}) {
	const top = data?.rows[0];
	const totalTrackers = data?.total ?? SEASON.totalPlayers;
	const topStreak = top?.longestStreak ?? top?.currentStreak ?? 0;

	return (
		<section className="relative isolate overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-forest-800 via-forest-900 to-background px-5 pb-10 pt-8 sm:px-10 sm:pb-14 sm:pt-12">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-90"
				style={{
					background:
						"radial-gradient(ellipse 60% 50% at 18% 8%, rgba(245,200,66,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 90% 30%, rgba(192,38,211,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 50% 110%, rgba(45,97,71,0.6) 0%, transparent 60%)",
				}}
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 bottom-0 h-44 opacity-25"
				style={{
					background:
						"linear-gradient(to top, rgba(245,200,66,0.5), transparent), repeating-linear-gradient(90deg, transparent 0 47px, rgba(245,200,66,0.3) 47px 48px), repeating-linear-gradient(0deg, transparent 0 28px, rgba(245,200,66,0.3) 28px 29px)",
					maskImage:
						"linear-gradient(to top, black 0%, black 30%, transparent 100%)",
					WebkitMaskImage:
						"linear-gradient(to top, black 0%, black 30%, transparent 100%)",
					transform: "perspective(600px) rotateX(60deg) scaleY(1.4)",
					transformOrigin: "bottom",
				}}
			/>
			<FloatingShapes />

			<div className="relative z-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
				<div>
					<div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
						<HugeiconsIcon icon={SparklesIcon} size={12} strokeWidth={2.5} />
						{isLoading ? "Syncing..." : `Live · ${SORT_LABEL[sort]} ranking`}
					</div>
					<h1 className="mt-5 font-serif text-[clamp(2.5rem,1.5rem+5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-offwhite">
						{SEASON.name}
					</h1>
					<p className="mt-4 text-base font-light text-foreground-muted">
						The ones who started it.
					</p>
					<p className="mt-2 max-w-sm text-[15px] leading-relaxed font-medium text-offwhite/80">
						{SEASON.tagline}
					</p>

					<dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
						<Stat label="Trackers" value={formatCount(totalTrackers)} />
						<Stat
							label="Top Streak"
							value={topStreak ? `${topStreak}d` : "—"}
						/>
						<Stat label="Resets In" value={getWeekEndsIn()} />
					</dl>
				</div>

				{/* #1 this week card */}
				<aside className="relative w-full max-w-sm shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
					<div
						aria-hidden
						className="pointer-events-none absolute inset-0 lb-shimmer opacity-40"
					/>
					<div className="flex items-center justify-between">
						<span className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground-muted">
							#1 This Week
						</span>
						<span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
							<HugeiconsIcon icon={ChampionIcon} size={10} strokeWidth={2.5} />
							Leading
						</span>
					</div>
					<div className="mt-4 flex items-baseline gap-2">
						<span className="font-serif text-3xl font-semibold text-offwhite">
							{top?.name ?? (isLoading ? "—" : "No data")}
						</span>
					</div>
					<div className="mt-5 grid grid-cols-3 gap-3 text-center">
						<MiniStat
							label="Streak"
							value={
								<span className="inline-flex items-center justify-center gap-1">
									<HugeiconsIcon
										icon={FireIcon}
										size={14}
										strokeWidth={2.5}
										className="text-orange-400"
									/>
									{top?.currentStreak ?? 0}d
								</span>
							}
							accent="text-orange-300"
						/>
						<MiniStat
							label="Transactions"
							value={top?.transactionCount?.toLocaleString() ?? "—"}
							accent="text-cyan-200"
						/>
						<MiniStat
							label="Weekly XP"
							value={top?.weeklyPoints?.toLocaleString() ?? "—"}
							accent="text-gold-300"
						/>
					</div>
					<div className="mt-5">
						<div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider text-foreground-muted">
							<span>Current streak</span>
							<span>Best: {top?.longestStreak ?? 0}d</span>
						</div>
						<div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/8">
							<div
								className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-gold-300 lb-bar-shine"
								style={{
									width: `${Math.min(100, ((top?.currentStreak ?? 0) / Math.max(1, top?.longestStreak ?? 1)) * 100)}%`,
								}}
							/>
						</div>
					</div>
				</aside>
			</div>
		</section>
	);
}

function Stat({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground-muted">
				{label}
			</dt>
			<dd className="mt-0.5 font-mono text-2xl font-semibold text-offwhite">
				{value}
			</dd>
		</div>
	);
}

function MiniStat({
	label,
	value,
	accent,
}: {
	label: string;
	value: React.ReactNode;
	accent: string;
}) {
	return (
		<div className="rounded-lg border border-white/8 bg-white/[0.03] py-2">
			<div className={cn("font-mono text-base font-bold", accent)}>{value}</div>
			<div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground-muted">
				{label}
			</div>
		</div>
	);
}
