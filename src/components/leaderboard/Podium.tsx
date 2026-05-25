import {
	CrownIcon,
	Medal02Icon,
	Medal03Icon,
	FireIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import type { LeaderboardRow, LeaderboardSort } from "@/types/admin";
import { Avatar } from "./Avatar";
import { TIER_STYLES } from "./mockData";
import {
	SORT_UNIT,
	displayHandle,
	displayName,
	flagFromPhone,
	sortValue,
	tierFromStreak,
} from "./transform";

const podiumOrder: Array<{ rank: 1 | 2 | 3; height: string; mt: string }> = [
	{ rank: 2, height: "h-44", mt: "mt-12" },
	{ rank: 1, height: "h-56", mt: "mt-0" },
	{ rank: 3, height: "h-36", mt: "mt-20" },
];

export function Podium({
	rows,
	sort,
}: {
	rows: LeaderboardRow[];
	sort: LeaderboardSort;
}) {
	const top3 = rows.slice(0, 3);

	return (
		<section className="relative">
			<header className="mb-6 flex items-end justify-between">
				<h2 className="font-serif text-3xl font-semibold tracking-tight text-offwhite sm:text-4xl">
					The <span className="italic text-gold-400">Apex</span>
				</h2>
				<p className="text-xs font-medium text-foreground-muted">
					Top 3 · refreshed every minute
				</p>
			</header>

			<div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-forest-800/40 via-surface to-background p-5 sm:p-10">
				<div aria-hidden className="pointer-events-none absolute inset-0">
					{Array.from({ length: 18 }).map((_, i) => (
						<span
							key={i}
							className={cn(
								"absolute h-1.5 w-1.5 rounded-full lb-confetti",
								i % 4 === 0 && "bg-gold-400",
								i % 4 === 1 && "bg-fuchsia-400",
								i % 4 === 2 && "bg-cyan-300",
								i % 4 === 3 && "bg-emerald-400",
							)}
							style={{
								top: `${(i * 53) % 90}%`,
								left: `${(i * 37) % 95}%`,
								animationDelay: `${(i % 6) * 0.3}s`,
							}}
						/>
					))}
				</div>

				<div
					aria-hidden
					className="pointer-events-none absolute left-1/2 top-0 h-64 w-[80%] -translate-x-1/2 opacity-60"
					style={{
						background:
							"radial-gradient(ellipse 50% 100% at 50% 0%, rgba(245,200,66,0.4), transparent 65%)",
					}}
				/>

				<div className="relative grid grid-cols-3 items-end gap-3 sm:gap-6">
					{podiumOrder.map(({ rank, height, mt }) => {
						const player = top3.find((p) => p.rank === rank) ?? top3[rank - 1];
						return (
							<PodiumColumn
								key={rank}
								slot={rank}
								player={player}
								sort={sort}
								barHeight={height}
								topGap={mt}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function PodiumColumn({
	slot,
	player,
	sort,
	barHeight,
	topGap,
}: {
	slot: 1 | 2 | 3;
	player: LeaderboardRow | undefined;
	sort: LeaderboardSort;
	barHeight: string;
	topGap: string;
}) {
	const isFirst = slot === 1;
	const tierKey = tierFromStreak(player?.currentStreak ?? 0);
	const tier = TIER_STYLES[tierKey];

	const barGrad =
		slot === 1
			? "from-gold-300 via-gold-500 to-gold-700"
			: slot === 2
				? "from-slate-200 via-slate-400 to-slate-600"
				: "from-amber-400 via-amber-600 to-amber-900";

	const rankIcon = slot === 1 ? CrownIcon : slot === 2 ? Medal02Icon : Medal03Icon;
	const value = player ? sortValue(player, sort) : 0;
	const unit = SORT_UNIT[sort];

	return (
		<div className={cn("flex flex-col items-center", topGap)}>
			<div className="relative flex flex-col items-center">
				{isFirst && (
					<HugeiconsIcon
						icon={CrownIcon}
						size={36}
						strokeWidth={1.8}
						className="absolute -top-9 text-gold-400 drop-shadow-[0_4px_12px_rgba(245,200,66,0.6)] lb-crown-bob"
					/>
				)}
				<div className={cn("relative", isFirst && "lb-bob")}>
					<Avatar
						seed={player?.userId ?? `slot-${slot}`}
						size={isFirst ? 96 : 72}
						ringClass={cn("ring-4", tier.ring)}
						className={cn(tier.glow)}
					/>
					<span
						className={cn(
							"absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-background text-[11px] font-black",
							slot === 1 && "bg-gold-500 text-forest-900",
							slot === 2 && "bg-slate-300 text-forest-900",
							slot === 3 && "bg-amber-600 text-white",
						)}
					>
						{slot}
					</span>
				</div>
			</div>

			<div className="mt-5 text-center">
				{/* Streak — this is the ranking signal, make it prominent */}
				<div className="flex items-center justify-center gap-1">
					<HugeiconsIcon
						icon={FireIcon}
						size={isFirst ? 22 : 16}
						strokeWidth={2}
						className="shrink-0 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.7)]"
					/>
					<span
						className={cn(
							"font-mono font-black text-gold-300 drop-shadow-[0_0_12px_rgba(245,200,66,0.5)]",
							isFirst ? "text-3xl" : "text-xl",
						)}
					>
						{player?.currentStreak ?? 0}
					</span>
					<span className={cn("font-semibold text-gold-500/70", isFirst ? "text-base" : "text-sm")}>
						d
					</span>
				</div>
				<div className="mt-2 flex items-center justify-center gap-1.5">
					<span className="text-base">
						{player ? flagFromPhone(player.phoneNumber) : "🌍"}
					</span>
					<p
						className={cn(
							"truncate font-semibold text-offwhite",
							isFirst ? "text-sm" : "text-xs",
						)}
					>
						{player ? displayName(player) : "—"}
					</p>
				</div>
			</div>

			<div
				className={cn(
					"relative mt-5 w-full overflow-hidden rounded-t-2xl border border-white/10 border-b-0 bg-gradient-to-b shadow-[0_-12px_40px_-12px_rgba(245,200,66,0.4)]",
					barHeight,
					barGrad,
				)}
			>
				<div aria-hidden className="absolute inset-x-0 top-0 h-px bg-white/40" />
				<div className="flex h-full flex-col items-center justify-center gap-1 text-forest-900">
					<HugeiconsIcon
						icon={rankIcon}
						size={isFirst ? 32 : 22}
						strokeWidth={1.8}
					/>
					<div className="font-mono text-xl font-black sm:text-2xl">
						{value.toLocaleString()}
					</div>
					<div className="text-[9px] font-bold uppercase tracking-[0.18em] opacity-80">
						{unit}
					</div>
				</div>
				<div
					aria-hidden
					className="absolute inset-x-0 top-0 h-1/2"
					style={{
						background:
							"linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)",
					}}
				/>
			</div>
		</div>
	);
}
