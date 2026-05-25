import type { LeaderboardSort } from "@/types/admin";

export const adminKeys = {
	all: ["admin"] as const,
	leaderboard: (sort: LeaderboardSort, limit: number, offset: number) =>
		[...adminKeys.all, "leaderboard", { sort, limit, offset }] as const,
};
