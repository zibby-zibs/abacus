"use client";

import { useState } from "react";
import type { LeaderboardSort } from "@/types/admin";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { FilterBar } from "./FilterBar";
import { LeaderboardHero } from "./LeaderboardHero";
import { LeaderboardNav } from "./LeaderboardNav";
import { Podium } from "./Podium";
import { RankList } from "./RankList";
import { sortValue } from "./transform";
import { getWeekEndsIn } from "./mockData";
import "./leaderboard.css";

const PAGE_SIZE = 50;

export function LeaderboardPage() {
	return (
		<QueryProvider>
			<LeaderboardPageInner />
		</QueryProvider>
	);
}

function LeaderboardPageInner() {
	const [sort, setSort] = useState<LeaderboardSort>("weeklyPoints");
	const [offset] = useState(0);

	const { data, isLoading, isFetching, isError, error, refetch } =
		useLeaderboard(sort, PAGE_SIZE, offset);

	const rows = data?.rows ?? [];
	const top3 = rows.slice(0, 3);
	const rest = rows.slice(3);
	const maxValue = rows[0] ? sortValue(rows[0], sort) : 0;

	return (
		<div className="relative min-h-dvh overflow-x-hidden bg-background text-foreground antialiased">
			{/* Ambient colour blobs */}
			<div
				aria-hidden
				className="pointer-events-none fixed inset-0 z-0"
				style={{
					background: [
						"radial-gradient(ellipse 80% 55% at 6% -5%, rgba(245,200,66,0.13) 0%, transparent 55%)",
						"radial-gradient(ellipse 65% 50% at 96% 12%, rgba(192,38,211,0.12) 0%, transparent 55%)",
						"radial-gradient(ellipse 55% 45% at 20% 60%, rgba(45,97,71,0.22) 0%, transparent 55%)",
						"radial-gradient(ellipse 60% 55% at 80% 80%, rgba(56,189,248,0.08) 0%, transparent 55%)",
					].join(", "),
				}}
			/>
			{/* Dot grid */}
			<div
				aria-hidden
				className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]"
				style={{
					backgroundImage:
						"radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)",
					backgroundSize: "28px 28px",
				}}
			/>
			{/* Grain */}
			<div
				aria-hidden
				className="pointer-events-none fixed inset-0 z-0 bg-landing-grain opacity-50"
			/>
			{/* Vignette — darkens edges so content pops */}
			<div
				aria-hidden
				className="pointer-events-none fixed inset-0 z-0"
				style={{
					background:
						"radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(8,15,11,0.65) 100%)",
				}}
			/>

			<div className="relative z-10">
				<LeaderboardNav />
				<main className="mx-auto w-full max-w-[1240px] px-4 pb-20 pt-6 sm:px-6 lg:px-10">
					<LeaderboardHero data={data} sort={sort} isLoading={isLoading} />

					{isError && (
						<div className="mt-6 flex items-center justify-between rounded-2xl border border-rose-500/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-200">
							<span>
								Couldn't load leaderboard
								{error instanceof Error ? `: ${error.message}` : "."}
							</span>
							<button
								onClick={() => refetch()}
								className="rounded-md bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-100 hover:bg-rose-500/30"
							>
								Retry
							</button>
						</div>
					)}

					<div className="mt-12">
						<Podium rows={top3} sort={sort} />
					</div>

					<div className="mt-12 flex flex-col gap-6">
						<FilterBar
							sort={sort}
							onSortChange={setSort}
							total={data?.total}
							isFetching={isFetching}
						/>
						<RankList
							rows={rest}
							sort={sort}
							maxValue={maxValue}
							isLoading={isLoading}
						/>
					</div>

					<footer className="mt-16 border-t border-white/8 pt-8 text-center">
						<p className="font-serif text-2xl italic text-foreground-muted">
							Consistency is the flex.
						</p>
						<p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground-subtle">
							Founding Week · resets in {getWeekEndsIn()}
						</p>
					</footer>
				</main>
			</div>
		</div>
	);
}
