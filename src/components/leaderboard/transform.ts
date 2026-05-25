import type { LeaderboardRow, LeaderboardSort } from "@/types/admin";
import type { Tier } from "./mockData";

const FLAG_BY_DIAL: Record<string, string> = {
	"234": "🇳🇬",
	"233": "🇬🇭",
	"254": "🇰🇪",
	"27": "🇿🇦",
	"221": "🇸🇳",
	"1": "🇺🇸",
	"44": "🇬🇧",
	"256": "🇺🇬",
	"255": "🇹🇿",
	"237": "🇨🇲",
};

export function flagFromPhone(phone: string | null | undefined): string {
	if (!phone) return "🌍";
	const cleaned = phone.replace(/[^\d+]/g, "");
	const digits = cleaned.startsWith("+") ? cleaned.slice(1) : cleaned;
	for (const prefix of [digits.slice(0, 3), digits.slice(0, 2), digits.slice(0, 1)]) {
		if (FLAG_BY_DIAL[prefix]) return FLAG_BY_DIAL[prefix];
	}
	return "🌍";
}

export function displayName(row: LeaderboardRow): string {
	if (row.name && row.name.trim()) return row.name;
	const tail = row.phoneNumber?.slice(-4) ?? "????";
	return `Player ${tail}`;
}

export function displayHandle(row: LeaderboardRow): string {
	if (row.name) {
		return row.name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "")
			.slice(0, 16) || row.userId.slice(0, 6);
	}
	return row.phoneNumber.replace(/\D/g, "").slice(-6);
}

export function tierFromStreak(streak: number): Tier {
	if (streak >= 90) return "Abakian";
	if (streak >= 30) return "The Aware";
	if (streak >= 7) return "Tracker";
	return "Seedling";
}

export function levelFromPoints(points: number): number {
	return Math.max(1, Math.floor(points / 350) + 1);
}

/**
 * Picks the field used to rank rows visually based on the chosen sort.
 * Eg. when sorting by `weeklyPoints`, the XP shown on each row reflects that.
 */
export function sortValue(row: LeaderboardRow, sort: LeaderboardSort): number {
	switch (sort) {
		case "weeklyPoints":
			return row.weeklyPoints;
		case "currentStreak":
			return row.currentStreak;
		case "longestStreak":
			return row.longestStreak;
		case "totalPoints":
		default:
			return row.totalPoints;
	}
}

export const SORT_LABEL: Record<LeaderboardSort, string> = {
	totalPoints: "All-Time",
	weeklyPoints: "Weekly",
	currentStreak: "Streak",
	longestStreak: "Best Streak",
};

export const SORT_UNIT: Record<LeaderboardSort, string> = {
	totalPoints: "XP",
	weeklyPoints: "XP",
	currentStreak: "d",
	longestStreak: "d",
};
