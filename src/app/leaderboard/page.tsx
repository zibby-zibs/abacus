import type { Metadata } from "next";
import { LeaderboardPage } from "@/components/leaderboard/LeaderboardPage";

export const metadata: Metadata = {
	title: "Leaderboard · Abakus",
	description:
		"Climb the Abakus leaderboard. Track your streak, stack XP, win badges, and out-save the squad.",
};

export default function Page() {
	return <LeaderboardPage />;
}
