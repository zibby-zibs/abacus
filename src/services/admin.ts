import { api } from "@/lib/api";
import type { LeaderboardResponse, LeaderboardSort } from "@/types/admin";

export const adminService = {
	getLeaderboard: (params: {
		sort?: LeaderboardSort;
		limit?: number;
		offset?: number;
	}) =>
		api
			.get<LeaderboardResponse>("/leaderboard", {
				params,
			})
			.then((r) => r.data),
};
