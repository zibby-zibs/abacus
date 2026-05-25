import { HugeiconsIcon } from "@hugeicons/react";
import { FireIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import type { LeaderboardRow, LeaderboardSort } from "@/types/admin";
import { Avatar } from "./Avatar";
import { TIER_STYLES } from "./mockData";
import {
	SORT_UNIT,
	displayHandle,
	displayName,
	flagFromPhone,
	levelFromPoints,
	sortValue,
	tierFromStreak,
} from "./transform";

export function RankList({
	rows,
	sort,
	maxValue,
	isLoading,
}: {
	rows: LeaderboardRow[];
	sort: LeaderboardSort;
	maxValue: number;
	isLoading: boolean;
}) {
	if (isLoading && rows.length === 0) {
		return <RankListSkeleton />;
	}
	if (rows.length === 0) {
		return (
			<div className="rounded-2xl border border-white/8 bg-surface/40 p-10 text-center text-sm text-foreground-muted">
				No players in this range.
			</div>
		);
	}

	return (
		<section>
			<header className="mb-4 flex items-baseline justify-between">
				<h2 className="font-serif text-2xl font-semibold tracking-tight text-offwhite sm:text-3xl">
					The Climb
				</h2>
				<p className="text-xs font-medium text-foreground-muted">
					Ranks #{rows[0]?.rank ?? "—"} and up
				</p>
			</header>

			<div className="overflow-hidden rounded-2xl border border-white/8 bg-surface/40 backdrop-blur">
				<div className="hidden grid-cols-[60px_1fr_120px_120px_160px] gap-4 border-b border-white/8 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground-muted md:grid">
					<span>Rank</span>
					<span>Player</span>
					<span>Streak</span>
					<span>Tier</span>
					<span>{SORT_UNIT[sort] === "d" ? "Streak" : "XP"}</span>
				</div>

				<ul>
					{rows.map((p, idx) => (
						<RankRow
							key={p.userId}
							player={p}
							sort={sort}
							maxValue={maxValue}
							zebra={idx % 2 === 1}
						/>
					))}
				</ul>
			</div>
		</section>
	);
}

function RankRow({
	player,
	sort,
	maxValue,
	zebra,
}: {
	player: LeaderboardRow;
	sort: LeaderboardSort;
	maxValue: number;
	zebra: boolean;
}) {
	const tierKey = tierFromStreak(player.currentStreak);
	const tier = TIER_STYLES[tierKey];
	const value = sortValue(player, sort);
	const pct = Math.max(8, Math.round((value / Math.max(1, maxValue)) * 100));
	const unit = SORT_UNIT[sort];

	return (
		<li
			className={cn(
				"relative grid grid-cols-[44px_1fr] items-center gap-3 px-4 py-3 transition-colors md:grid-cols-[60px_1fr_120px_120px_160px] md:gap-4 md:px-5 md:py-4",
				zebra && "bg-white/[0.015]",
			)}
		>
			<div className="flex items-center gap-1">
				<span className="font-mono text-lg font-bold text-offwhite">
					{player.rank}
				</span>
			</div>

			<div className="flex min-w-0 items-center gap-3">
				<Avatar
					seed={player.userId}
					size={40}
					ringClass={cn("ring-2", tier.ring)}
				/>
				<div className="min-w-0">
					<div className="flex items-center gap-1.5">
						<p className="truncate text-sm font-semibold text-offwhite">
							{displayName(player)}
						</p>
						<span className="text-sm">{flagFromPhone(player.phoneNumber)}</span>
						{player.subscriptionTier !== "free" && (
							<span className="rounded-md bg-gold-500/15 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-gold-300">
								{player.subscriptionTier}
							</span>
						)}
					</div>
					<div className="mt-0.5 flex items-center gap-2">
						<span className="font-mono text-[11px] text-foreground-muted">
							@{displayHandle(player)}
						</span>
						{player.badges.slice(0, 3).map((b) => (
							<span
								key={b.id}
								title={b.name}
								className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/5 text-[11px]"
							>
								{b.emoji ?? "⭐"}
							</span>
						))}
					</div>
				</div>
			</div>

			<div className="hidden items-center gap-1.5 md:flex">
				<HugeiconsIcon
					icon={FireIcon}
					size={16}
					strokeWidth={2.5}
					className={cn(
						player.currentStreak >= 30
							? "text-orange-400"
							: player.currentStreak >= 10
								? "text-amber-400"
								: "text-neutral-500",
					)}
				/>
				<span className="font-mono text-sm font-semibold text-offwhite">
					{player.currentStreak}d
				</span>
			</div>

			<div className="hidden md:block">
				<span
					className={cn(
						"inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
						tier.chip,
					)}
				>
					{tier.emoji} {tier.label}
				</span>
				<div className="mt-0.5 font-mono text-[10px] text-foreground-muted">
					Lvl {levelFromPoints(player.totalPoints)}
				</div>
			</div>

			<div className="col-span-2 md:col-span-1">
				<div className="flex items-center justify-between text-[10px] font-bold text-foreground-muted">
					<span className="hidden md:inline">{unit === "d" ? "DAYS" : "XP"}</span>
					<span className="font-mono text-xs text-offwhite">
						{value.toLocaleString()}
						{unit === "d" ? "d" : ""}
					</span>
				</div>
				<div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/8">
					<div
						className={cn(
							"h-full rounded-full bg-gradient-to-r",
							tierKey === "Abakian" && "from-fuchsia-400 via-rose-400 to-gold-300",
							tierKey === "The Aware" && "from-gold-500 via-gold-300 to-amber-200",
							tierKey === "Tracker" && "from-orange-500 via-amber-400 to-orange-300",
							tierKey === "Seedling" && "from-emerald-500 to-emerald-300",
						)}
						style={{ width: `${pct}%` }}
					/>
				</div>
			</div>
		</li>
	);
}

function RankListSkeleton() {
	return (
		<div className="overflow-hidden rounded-2xl border border-white/8 bg-surface/40">
			<ul className="divide-y divide-white/5">
				{Array.from({ length: 6 }).map((_, i) => (
					<li
						key={i}
						className="flex items-center gap-3 px-5 py-4 animate-pulse"
					>
						<div className="h-4 w-6 rounded bg-white/8" />
						<div className="h-10 w-10 rounded-full bg-white/8" />
						<div className="flex-1 space-y-2">
							<div className="h-3 w-1/3 rounded bg-white/8" />
							<div className="h-1.5 w-full rounded bg-white/8" />
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
