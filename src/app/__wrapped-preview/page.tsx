"use client";

import { WrappedPage } from "@/components/wrapped/WrappedPage";
import type { WrappedStats } from "@/types/wrapped";

const mockStats: WrappedStats = {
	personality: {
		key: "aware_one",
		name: "The Aware One",
		emoji: "👁️",
		tagline: "You don't just spend — you see every naira move.",
		body: "Most people look away. You look closer.\nYou track, you notice, you adjust.",
	},
	totalTracked: 482300,
	transactionCount: 214,
	appOpens: 312,
	biggestTransaction: 95000,
	streakTotal: 30,
	streakOn: 18,
	categories: [
		{ pos: "01", name: "Food & Drink", val: "₦182k", width: "100%", top: true },
		{ pos: "02", name: "Transport", val: "₦94k", width: "62%" },
		{ pos: "03", name: "Bills", val: "₦71k", width: "48%" },
		{ pos: "04", name: "Shopping", val: "₦55k", width: "35%" },
	],
	week: [
		{ label: "M", h: "30%" },
		{ label: "T", h: "45%" },
		{ label: "W", h: "60%" },
		{ label: "T", h: "40%" },
		{ label: "F", h: "70%" },
		{ label: "S", h: "100%", peak: true },
		{ label: "S", h: "55%" },
	],
};

export default function WrappedPreview() {
	return <WrappedPage stats={mockStats} />;
}
