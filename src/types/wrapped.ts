export type WrappedStatus = { valid: boolean; locked: boolean };

export type WrappedCategory = {
	pos: string;
	name: string;
	val: string;
	width: string;
	top?: true;
};

export type WrappedWeekDay = {
	label: string;
	h: string;
	peak?: true;
};

export type WrappedPersonalityKey =
	| "enjoyment_officer"
	| "road_warrior"
	| "phantom"
	| "provider"
	| "aware_one"
	| "surge";

export type WrappedPersonality = {
	key: WrappedPersonalityKey;
	name: string;
	emoji: string;
	tagline: string;
	body: string;
};

export type WrappedStats = {
	categories: WrappedCategory[];
	week: WrappedWeekDay[];
	streakTotal: number;
	streakOn: number;
	totalTracked: number;
	transactionCount: number;
	appOpens: number;
	biggestTransaction: number;
	personality: WrappedPersonality;
};

export type VerifyResult =
	| { ok: true; stats: WrappedStats }
	| { ok: false; reason: "NOT_FOUND" | "LOCKED" }
	| { ok: false; reason: "MISMATCH"; attemptsRemaining: number }
	| { ok: false; reason: "ERROR" };
