"use client";

import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin";
import { adminKeys } from "@/hooks/queryKeys";
import type { LeaderboardSort } from "@/types/admin";

export function useLeaderboard(
	sort: LeaderboardSort,
	limit: number,
	offset: number,
) {
	return useQuery({
		queryKey: adminKeys.leaderboard(sort, limit, offset),
		queryFn: () => adminService.getLeaderboard({ sort, limit, offset }),
		refetchInterval: 60_000,
	});
}
