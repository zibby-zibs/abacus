"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
	Calendar03Icon,
	ChartAverageIcon,
	FireIcon,
	FlashIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import type { LeaderboardSort } from "@/types/admin";

const SORTS: Array<{
	id: LeaderboardSort;
	label: string;
	icon: typeof FireIcon;
}> = [
	{ id: "weeklyPoints", label: "Weekly", icon: FlashIcon },
	{ id: "totalPoints", label: "All-Time", icon: ChartAverageIcon },
	{ id: "currentStreak", label: "Streak", icon: FireIcon },
	{ id: "longestStreak", label: "Best Streak", icon: Calendar03Icon },
];

export function FilterBar({
	sort,
	onSortChange,
	total,
	isFetching,
}: {
	sort: LeaderboardSort;
	onSortChange: (s: LeaderboardSort) => void;
	total: number | undefined;
	isFetching: boolean;
}) {
	return (
		<div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-surface/60 p-2 backdrop-blur">
			<div
				role="tablist"
				aria-label="Sort"
				className="relative inline-flex flex-wrap items-center gap-0.5 rounded-xl bg-background/60 p-1"
			>
				{SORTS.map((s) => {
					const active = s.id === sort;
					return (
						<button
							key={s.id}
							role="tab"
							aria-selected={active}
							onClick={() => onSortChange(s.id)}
							className={cn(
								"relative z-10 inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors sm:px-4",
								active
									? "text-forest-900"
									: "text-foreground-muted hover:text-offwhite",
							)}
						>
							{active && (
								<span
									aria-hidden
									className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 shadow-[0_8px_24px_-8px_rgba(245,200,66,0.6)]"
								/>
							)}
							<HugeiconsIcon icon={s.icon} size={12} strokeWidth={2.5} />
							{s.label}
						</button>
					);
				})}
			</div>

			<div className="flex items-center gap-2 px-2 text-[11px] text-foreground-muted">
				{isFetching && (
					<span className="inline-flex items-center gap-1">
						<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
						Syncing
					</span>
				)}
				{typeof total === "number" && (
					<span className="font-mono">
						{total.toLocaleString()} players
					</span>
				)}
			</div>
		</div>
	);
}
