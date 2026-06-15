export type Tier = "Seedling" | "Tracker" | "The Aware" | "Abakian";

export type Player = {
	id: string;
	rank: number;
	previousRank: number;
	name: string;
	handle: string;
	country: string; // emoji flag
	xp: number;
	level: number;
	streak: number; // days
	tier: Tier;
	badges: string[]; // badge ids
	isYou?: boolean;
};

export type Badge = {
	id: string;
	name: string;
	emoji: string;
	hue: string; // tailwind text-* color hint
	description: string;
	rarity: "Common" | "Rare" | "Epic" | "Legendary";
	holders: number;
};

export type Quest = {
	id: string;
	title: string;
	subtitle: string;
	reward: number; // XP
	progress: number; // 0..1
	icon: "fire" | "rocket" | "target" | "diamond" | "gem" | "sparkles";
	expiresIn: string;
};

export type Season = {
	id: string;
	name: string;
	tagline: string;
	totalPlayers: number;
	totalXp: number;
};

export const SEASON: Season = {
	id: "eyes-open",
	name: "Eyes Open",
	tagline: "Consistency is the flex.",
	totalPlayers: 28419,
	totalXp: 4_812_904,
};

/**
 * Days remaining in the current week.
 * Week runs Sunday → Saturday. Resets Monday.
 * Sunday = 7d (just started), Saturday = 1d (last day).
 */
export function getWeekEndsIn(): string {
	const day = new Date().getDay(); // 0=Sun … 6=Sat
	const days = (7 - day) % 7 || 7;
	return `${days}d`;
}

export const TIER_STYLES: Record<
	Tier,
	{ ring: string; chip: string; glow: string; label: string; emoji: string }
> = {
	Seedling: {
		ring: "ring-emerald-500/50",
		chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
		glow: "shadow-[0_0_24px_rgba(52,211,153,0.3)]",
		label: "Seedling",
		emoji: "🌱",
	},
	Tracker: {
		ring: "ring-orange-400/60",
		chip: "bg-orange-500/10 text-orange-300 border-orange-400/35",
		glow: "shadow-[0_0_28px_rgba(251,146,60,0.38)]",
		label: "Tracker",
		emoji: "🔥",
	},
	"The Aware": {
		ring: "ring-gold-500/80",
		chip: "bg-gold-500/12 text-gold-300 border-gold-500/40",
		glow: "shadow-[0_0_36px_rgba(245,200,66,0.45)]",
		label: "The Aware",
		emoji: "💛",
	},
	Abakian: {
		ring: "ring-fuchsia-400/80",
		chip: "bg-fuchsia-500/12 text-fuchsia-200 border-fuchsia-400/40",
		glow: "shadow-[0_0_44px_rgba(232,121,249,0.5)]",
		label: "Abakian",
		emoji: "👑",
	},
};

export const BADGES: Badge[] = [
	{
		id: "fire-streak",
		name: "Inferno Streak",
		emoji: "🔥",
		hue: "text-orange-300",
		description: "60-day logging streak. The flame never dies.",
		rarity: "Epic",
		holders: 482,
	},
	{
		id: "debt-slayer",
		name: "Debt Slayer",
		emoji: "⚔️",
		hue: "text-rose-300",
		description: "Cleared a debt of ₦500k+ inside one season.",
		rarity: "Rare",
		holders: 1240,
	},
	{
		id: "budget-king",
		name: "Budget Sovereign",
		emoji: "👑",
		hue: "text-gold-300",
		description: "Stayed under budget 4 weeks in a row.",
		rarity: "Legendary",
		holders: 96,
	},
	{
		id: "saver-99",
		name: "Vault Hoarder",
		emoji: "💎",
		hue: "text-cyan-200",
		description: "Hit 99% of your savings goal.",
		rarity: "Epic",
		holders: 612,
	},
	{
		id: "earlybird",
		name: "Early Bird",
		emoji: "🌅",
		hue: "text-amber-200",
		description: "Logged before 8am, 30 days running.",
		rarity: "Rare",
		holders: 3019,
	},
	{
		id: "first-blood",
		name: "First Tracker",
		emoji: "🎯",
		hue: "text-emerald-300",
		description: "Day-one Abakus crew. OG energy.",
		rarity: "Legendary",
		holders: 211,
	},
];

const BADGE_BY_ID: Record<string, Badge> = Object.fromEntries(
	BADGES.map((b) => [b.id, b]),
);
export function getBadge(id: string): Badge | undefined {
	return BADGE_BY_ID[id];
}

export const QUESTS: Quest[] = [
	{
		id: "q1",
		title: "Log 7 days straight",
		subtitle: "Don't break the chain. Streak multiplier x1.5",
		reward: 250,
		progress: 5 / 7,
		icon: "fire",
		expiresIn: "2d 11h",
	},
	{
		id: "q2",
		title: "Categorize 25 expenses",
		subtitle: "Sort the chaos. Earn the badge.",
		reward: 180,
		progress: 18 / 25,
		icon: "target",
		expiresIn: "4d 03h",
	},
	{
		id: "q3",
		title: "Beat last week's savings",
		subtitle: "Top your ₦42,000 from last week.",
		reward: 420,
		progress: 0.32,
		icon: "rocket",
		expiresIn: "5d 22h",
	},
	{
		id: "q4",
		title: "Invite a friend",
		subtitle: "They join, you both bag 500 XP.",
		reward: 500,
		progress: 0,
		icon: "sparkles",
		expiresIn: "Season",
	},
];

export const PLAYERS: Player[] = [
	{
		id: "p1",
		rank: 1,
		previousRank: 2,
		name: "Adaeze Okafor",
		handle: "adaeze.eth",
		country: "🇳🇬",
		xp: 18420,
		level: 47,
		streak: 91,
		tier: "Abakian",
		badges: ["budget-king", "fire-streak", "first-blood"],
	},
	{
		id: "p2",
		rank: 2,
		previousRank: 1,
		name: "Kwame Mensah",
		handle: "kwame",
		country: "🇬🇭",
		xp: 17890,
		level: 45,
		streak: 64,
		tier: "The Aware",
		badges: ["debt-slayer", "saver-99"],
	},
	{
		id: "p3",
		rank: 3,
		previousRank: 5,
		name: "Lerato Dube",
		handle: "lerato_d",
		country: "🇿🇦",
		xp: 16540,
		level: 43,
		streak: 48,
		tier: "The Aware",
		badges: ["earlybird", "saver-99"],
	},
	{
		id: "p4",
		rank: 4,
		previousRank: 3,
		name: "Tunde Bakare",
		handle: "tundeb",
		country: "🇳🇬",
		xp: 15110,
		level: 41,
		streak: 33,
		tier: "The Aware",
		badges: ["debt-slayer"],
	},
	{
		id: "p5",
		rank: 5,
		previousRank: 7,
		name: "Amaka Eze",
		handle: "amaka.ez",
		country: "🇳🇬",
		xp: 14502,
		level: 40,
		streak: 27,
		tier: "Tracker",
		badges: ["fire-streak"],
	},
	{
		id: "p6",
		rank: 6,
		previousRank: 4,
		name: "Jabari Osei",
		handle: "jabari",
		country: "🇰🇪",
		xp: 13890,
		level: 39,
		streak: 21,
		tier: "Tracker",
		badges: ["earlybird"],
	},
	{
		id: "p7",
		rank: 7,
		previousRank: 9,
		name: "You",
		handle: "you",
		country: "🇳🇬",
		xp: 12970,
		level: 37,
		streak: 18,
		tier: "Tracker",
		badges: ["earlybird", "saver-99"],
		isYou: true,
	},
	{
		id: "p8",
		rank: 8,
		previousRank: 6,
		name: "Sade Williams",
		handle: "sadew",
		country: "🇳🇬",
		xp: 12410,
		level: 36,
		streak: 14,
		tier: "Tracker",
		badges: ["budget-king"],
	},
	{
		id: "p9",
		rank: 9,
		previousRank: 8,
		name: "Chinedu Obi",
		handle: "chinedu",
		country: "🇳🇬",
		xp: 11880,
		level: 35,
		streak: 12,
		tier: "Tracker",
		badges: [],
	},
	{
		id: "p10",
		rank: 10,
		previousRank: 12,
		name: "Fatou Diop",
		handle: "fatou.d",
		country: "🇸🇳",
		xp: 11220,
		level: 34,
		streak: 9,
		tier: "Tracker",
		badges: ["earlybird"],
	},
	{
		id: "p11",
		rank: 11,
		previousRank: 11,
		name: "Bola Adeyemi",
		handle: "bola",
		country: "🇳🇬",
		xp: 10510,
		level: 32,
		streak: 7,
		tier: "Tracker",
		badges: [],
	},
	{
		id: "p12",
		rank: 12,
		previousRank: 10,
		name: "Zanele Khumalo",
		handle: "zanele",
		country: "🇿🇦",
		xp: 9810,
		level: 30,
		streak: 4,
		tier: "Seedling",
		badges: [],
	},
];

export const YOU = PLAYERS.find((p) => p.isYou)!;

export function rankDelta(p: Player): number {
	return p.previousRank - p.rank; // + means moved up
}

export function formatCount(n: number): string {
	if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
	if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
	return n.toString();
}
