export type ISODateString = string;
export type DateString = string;

export type SubscriptionTier = "free" | "light" | "heavy" | "premium";

export type LeaderboardSort =
	| "totalPoints"
	| "weeklyPoints"
	| "currentStreak"
	| "longestStreak";

export interface GamificationBadge {
	id: string;
	code: string;
	name: string;
	description?: string;
	emoji?: string;
	awardedAt?: ISODateString;
}

export interface LeaderboardRow {
	rank: number;
	userId: string;
	name: string | null;
	phoneNumber: string;
	subscriptionTier: SubscriptionTier;
	userCreatedAt: ISODateString;
	currentStreak: number;
	longestStreak: number;
	lastLoggedDate: DateString | null;
	totalPoints: number;
	weeklyPoints: number;
	weeklyPointsResetAt: ISODateString | null;
	updatedAt: ISODateString;
	transactionCount: number;
	badges: GamificationBadge[];
}

export interface LeaderboardResponse {
	total: number;
	limit: number;
	offset: number;
	sort: LeaderboardSort;
	rows: LeaderboardRow[];
}
