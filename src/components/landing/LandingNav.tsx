"use client";

import { AbacusLogoInner } from "@/components/landing/AbacusLogo";
import { WHATSAPP_URL } from "@/components/landing/constants";
import {
	useLandingTheme,
	type LandingThemeMode,
} from "@/components/landing/LandingThemeProvider";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { LandingFooterLogo } from "./LandingFooterLogo";

/* ── SVG icons ─────────────────────────────────────────────── */

function SunIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<circle cx={12} cy={12} r={5} />
			<line x1={12} y1={1} x2={12} y2={3} />
			<line x1={12} y1={21} x2={12} y2={23} />
			<line x1={4.22} y1={4.22} x2={5.64} y2={5.64} />
			<line x1={18.36} y1={18.36} x2={19.78} y2={19.78} />
			<line x1={1} y1={12} x2={3} y2={12} />
			<line x1={21} y1={12} x2={23} y2={12} />
			<line x1={4.22} y1={19.78} x2={5.64} y2={18.36} />
			<line x1={18.36} y1={5.64} x2={19.78} y2={4.22} />
		</svg>
	);
}

function MoonIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	);
}

function MonitorIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<rect x={2} y={3} width={20} height={14} rx={2} ry={2} />
			<line x1={8} y1={21} x2={16} y2={21} />
			<line x1={12} y1={17} x2={12} y2={21} />
		</svg>
	);
}

function CheckIcon({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	);
}

/* ── Theme popover ─────────────────────────────────────────── */

const themeOptions: {
	value: LandingThemeMode;
	label: string;
	icon: typeof SunIcon;
}[] = [
	{ value: "light", label: "Light", icon: SunIcon },
	{ value: "dark", label: "Dark", icon: MoonIcon },
	{ value: "system", label: "System", icon: MonitorIcon },
];

/* ── Desktop inline pill (≥ sm) ─────────────────────────────── */

function ThemeInlinePill() {
	const { mode, setMode } = useLandingTheme();
	return (
		<div
			className="hidden items-center gap-0.5 rounded-full border border-neutral-300/80 bg-white/80 p-0.5 sm:flex dark:border-white/10 dark:bg-white/5"
			role="group"
			aria-label="Color theme"
		>
			{(
				[
					["light", "Light"],
					["system", "Auto"],
					["dark", "Dark"],
				] as const
			).map(([value, label]) => (
				<button
					key={value}
					type="button"
					onClick={() => setMode(value)}
					className={cn(
						"rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors",
						mode === value
							? "bg-forest-800 text-offwhite dark:bg-gold-500 dark:text-forest-900"
							: "text-neutral-600 hover:text-forest-900 dark:text-foreground-muted dark:hover:text-foreground",
					)}
				>
					{label}
				</button>
			))}
		</div>
	);
}

/* ── Mobile popover (< sm) ─────────────────────────────────── */

function ThemePopover() {
	const { mode, resolved, setMode } = useLandingTheme();
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	/* close on outside click */
	useEffect(() => {
		if (!open) return;
		function handleClick(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [open]);

	/* close on Escape */
	useEffect(() => {
		if (!open) return;
		function handleKey(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}
		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [open]);

	const pick = useCallback(
		(v: LandingThemeMode) => {
			setMode(v);
			setOpen(false);
		},
		[setMode],
	);

	return (
		<div ref={containerRef} className="relative sm:hidden">
			{/* trigger button */}
			<button
				type="button"
				aria-label="Change theme"
				aria-expanded={open}
				onClick={() => setOpen((p) => !p)}
				className={cn(
					"group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200",
					"border-neutral-300/70 bg-white/70 text-neutral-600 hover:bg-white hover:text-forest-900 hover:shadow-sm",
					"dark:border-white/10 dark:bg-white/5 dark:text-foreground-muted dark:hover:bg-white/10 dark:hover:text-offwhite",
					open && "bg-white shadow-sm dark:bg-white/10",
				)}
			>
				{/* sun – visible in light resolved theme */}
				<SunIcon
					className={cn(
						"absolute h-4 w-4 transition-all duration-300",
						resolved === "light"
							? "rotate-0 scale-100 opacity-100"
							: "rotate-90 scale-0 opacity-0",
					)}
				/>
				{/* moon – visible in dark resolved theme */}
				<MoonIcon
					className={cn(
						"absolute h-4 w-4 transition-all duration-300",
						resolved === "dark"
							? "rotate-0 scale-100 opacity-100"
							: "-rotate-90 scale-0 opacity-0",
					)}
				/>
			</button>

			{/* popover */}
			<div
				className={cn(
					"absolute top-full right-0 z-50 mt-2.5 origin-top-right transition-all duration-200 ease-out",
					open
						? "pointer-events-auto scale-100 opacity-100"
						: "pointer-events-none scale-95 opacity-0",
				)}
			>
				<div
					className={cn(
						"min-w-[160px] overflow-hidden rounded-2xl border p-1.5 shadow-xl shadow-black/8",
						"border-neutral-200/80 bg-white/90 backdrop-blur-2xl",
						"dark:border-white/10 dark:bg-neutral-900/90 dark:shadow-black/30",
					)}
					role="listbox"
					aria-label="Select theme"
				>
					{themeOptions.map(({ value, label, icon: Icon }) => {
						const active = mode === value;
						return (
							<button
								key={value}
								type="button"
								role="option"
								aria-selected={active}
								onClick={() => pick(value)}
								className={cn(
									"flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition-colors duration-150",
									active
										? "bg-forest-800/[.07] text-forest-900 dark:bg-gold-500/10 dark:text-gold-500"
										: "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-neutral-200",
								)}
							>
								<Icon className="h-4 w-4 shrink-0" />
								<span className="flex-1">{label}</span>
								<CheckIcon
									className={cn(
										"h-3.5 w-3.5 shrink-0 transition-opacity duration-150",
										active ? "opacity-100" : "opacity-0",
									)}
								/>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

/* ── Navbar ─────────────────────────────────────────────────── */

export function LandingNav() {
	const [compact, setCompact] = useState(false);

	useEffect(() => {
		const onScroll = () => setCompact(window.scrollY > 60);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<nav
			className={cn(
				"fixed top-0 right-0 left-0 z-[500] flex min-h-0 items-center justify-between gap-3 px-[clamp(1rem,4vw,3.25rem)] pt-[max(0.75rem,env(safe-area-inset-top))] pb-4 transition-[padding,background-color] duration-300 ease-out sm:pt-7 sm:pb-7",
				compact &&
					"bg-offwhite/90 py-3 backdrop-blur-xl sm:py-[18px] dark:bg-background/85",
			)}
			aria-label="Primary"
		>
			<Link
				href="/"
				className="flex min-w-0 shrink cursor-pointer items-center gap-2 text-forest-900 sm:gap-2.5 dark:text-offwhite"
			>
				<LandingFooterLogo />
			</Link>
			<div className="flex min-w-0 shrink items-center justify-end gap-2 sm:gap-3 md:gap-4">
				<ThemePopover />
				<ThemeInlinePill />
				<Link
					href="/leaderboard"
					className="hidden items-center gap-1.5 rounded-full border border-neutral-300/60 bg-white/60 px-3 py-2 text-[12px] font-semibold text-neutral-700 transition-colors hover:border-gold-500/40 hover:bg-gold-500/8 hover:text-forest-900 sm:flex dark:border-white/10 dark:bg-white/5 dark:text-foreground-muted dark:hover:border-gold-500/30 dark:hover:text-gold-400"
				>
					🏆 Leaderboard
				</Link>
				<a
					href={WHATSAPP_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="rounded-full border border-primary-border bg-primary-muted px-3 py-2 text-center text-[12px] font-semibold text-gold-500 transition-colors hover:bg-gold-500 hover:text-forest-900 sm:px-5 sm:py-2.5 sm:text-[13px] dark:border-gold-500/25 dark:bg-gold-500/10"
				>
					<span className="sm:hidden">WhatsApp</span>
					<span className="hidden sm:inline">Start on WhatsApp</span>
				</a>
			</div>
		</nav>
	);
}
