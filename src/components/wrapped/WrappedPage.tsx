"use client";

import { cn } from "@/lib/utils";
import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type ComponentType,
	type CSSProperties,
	type PointerEvent as ReactPointerEvent,
	type RefObject,
} from "react";
import type {
	WrappedCategory,
	WrappedStats,
	WrappedWeekDay,
} from "@/types/wrapped";
import styles from "./wrapped.module.css";

const CARD_MS = 6200;

/** Lets CSS custom properties (--d, --w, --h) through inline style. */
function vars(v: Record<string, string | number>): CSSProperties {
	return v as unknown as CSSProperties;
}

const CANVAS_W = 1080;
const CANVAS_H = 1920;

/**
 * Fluid px value: scales with the smaller of viewport width/height (matching
 * the original 1080×1920 reference design's proportions on any screen),
 * capped at `px` so it never exceeds the reference design size.
 */
function fl(px: number, minFactor = 0.42): string {
	const min = +(px * minFactor).toFixed(1);
	const idealVw = +((px / CANVAS_W) * 100).toFixed(3);
	const idealDvh = +((px / CANVAS_H) * 100).toFixed(3);
	return `clamp(${min}px, min(${idealVw}vw, ${idealDvh}dvh), ${px}px)`;
}

/** Counts up to `target` once on mount — each card mounts exactly when it becomes active. */
function useCountUp(target: number, duration: number) {
	const [value, setValue] = useState(0);
	useEffect(() => {
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const dur = reduced ? 0 : duration;
		let raf = 0;
		const start = performance.now();
		const tick = (now: number) => {
			const t = dur === 0 ? 1 : Math.min(1, (now - start) / dur);
			setValue(target * (1 - Math.pow(1 - t, 4)));
			if (t < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [target, duration]);
	return Math.round(value).toLocaleString("en-US");
}

function AbakusMark({ size = 22 }: { size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden
		>
			<rect x={13} y={2} width={2.2} height={44} rx={1.1} fill="#2D5A45" />
			<rect x={7.5} y={9.5} width={13} height={9} rx={4.5} fill="#F0B429" />
			<rect x={33} y={2} width={2.2} height={44} rx={1.1} fill="#2D5A45" />
			<rect x={27.5} y={29.5} width={13} height={9} rx={4.5} fill="#F0B429" />
		</svg>
	);
}

/* ── Decorative canvases (mount/unmount with their card) ─────── */

function EmberCanvas() {
	const ref = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;
		const W = 1080,
			H = 1920;
		const pts = Array.from({ length: 26 }, () => ({
			x: Math.random() * W,
			y: Math.random() * H,
			r: 0.6 + Math.random() * 1.8,
			spd: 0.12 + Math.random() * 0.4,
			op: 0.1 + Math.random() * 0.45,
			ph: Math.random() * 6.28,
		}));
		let raf = 0;
		const loop = () => {
			ctx.clearRect(0, 0, W, H);
			pts.forEach((p) => {
				p.y -= p.spd;
				p.ph += 0.01;
				if (p.y < -10) {
					p.y = H + 10;
					p.x = Math.random() * W;
				}
				const px = p.x + Math.sin(p.ph) * 1.2;
				const a = p.op * (0.5 + 0.5 * Math.sin(p.ph));
				ctx.beginPath();
				ctx.arc(px, p.y, p.r, 0, 6.28);
				ctx.fillStyle = `rgba(240,180,41,${a})`;
				ctx.fill();
				const g = ctx.createRadialGradient(px, p.y, 0, px, p.y, p.r * 5);
				g.addColorStop(0, `rgba(240,180,41,${a * 0.3})`);
				g.addColorStop(1, "rgba(240,180,41,0)");
				ctx.beginPath();
				ctx.arc(px, p.y, p.r * 5, 0, 6.28);
				ctx.fillStyle = g;
				ctx.fill();
			});
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);
	return (
		<canvas
			className={styles.glow}
			ref={ref}
			width={1080}
			height={1920}
			aria-hidden
		/>
	);
}

function ConstellationCanvas() {
	const ref = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;
		const CX = 540,
			CY = 960;
		const nodes = [
			{ x: 300, y: 640 },
			{ x: 800, y: 600 },
			{ x: 880, y: 1050 },
			{ x: 220, y: 1120 },
			{ x: 660, y: 1340 },
			{ x: 400, y: 1420 },
			{ x: 820, y: 820 },
		];
		let t = 0;
		let raf = 0;
		const loop = () => {
			t += 0.016;
			ctx.clearRect(0, 0, 1080, 1920);
			ctx.globalAlpha = 0.1;
			nodes.forEach((n) => {
				ctx.beginPath();
				ctx.moveTo(CX, CY);
				ctx.lineTo(n.x, n.y);
				ctx.strokeStyle = "#F0B429";
				ctx.lineWidth = 1.2;
				ctx.stroke();
			});
			ctx.globalAlpha = 1;
			[...nodes, { x: CX, y: CY }].forEach((n, i) => {
				const pulse = 0.6 + 0.4 * Math.sin(t * 1.1 + i);
				ctx.beginPath();
				ctx.arc(n.x, n.y, i === nodes.length ? 5 : 3.5, 0, 6.28);
				ctx.fillStyle = `rgba(240,180,41,${0.18 * pulse})`;
				ctx.fill();
			});
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);
	return (
		<canvas
			className={styles.glow}
			ref={ref}
			width={1080}
			height={1920}
			aria-hidden
		/>
	);
}

function Glow({ x, y, color }: { x: number; y: number; color: string }) {
	return (
		<div
			className={styles.glow}
			aria-hidden
			style={{
				background: `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, transparent 55%)`,
			}}
		/>
	);
}

/* ── Card content (each mounts exactly while its card is active) ── */

function CoverContent() {
	return (
		<>
			<EmberCanvas />
			<div className={styles.grain} aria-hidden />
			<div className={styles.cvYear} data-r="fade" style={vars({ "--d": 100 })}>
				2 0 2 6
			</div>
			<div className={styles.cvYour} data-r style={vars({ "--d": 300 })}>
				Your June,
			</div>
			<div
				className={styles.cvWrapped}
				data-r="scale"
				style={vars({ "--d": 520 })}
			>
				Wrapped
			</div>
			<div className={styles.cvTap} data-r="fade" style={vars({ "--d": 1100 })}>
				tap to begin →
			</div>
		</>
	);
}

function OpenContent() {
	return (
		<>
			<div className={styles.grain} aria-hidden />
			<div className={styles.kicker} data-r style={vars({ "--d": 60 })}>
				a quiet month, mostly
			</div>
			<p
				className={styles.lede}
				data-r
				style={vars({ "--d": 240, marginTop: fl(36) })}
			>
				You and Abakus spent
				<br />a lot of time together.
			</p>
			<p
				className={styles.lede}
				data-r
				style={vars({
					"--d": 620,
					marginTop: fl(40),
					opacity: 0.6,
					fontSize: fl(64),
				})}
			>
				Here&apos;s what we <em>noticed.</em>
			</p>
		</>
	);
}

function TotalContent({
	totalTracked,
	transactionCount,
}: {
	totalTracked: number;
	transactionCount: number;
}) {
	const display = useCountUp(totalTracked, 1700);
	return (
		<>
			<Glow x={50} y={44} color="rgba(240,180,41,0.16)" />
			<div className={styles.grain} aria-hidden />
			<div className={styles.kicker} data-r style={vars({ "--d": 60 })}>
				you tracked
			</div>
			<div
				className={styles.huge}
				data-r="scale"
				style={vars({ "--d": 240, marginTop: fl(20) })}
			>
				<span className={styles.naira}>₦</span>
				<span className={styles.mono}>{display}</span>
			</div>
			<p
				className={styles.footline}
				data-r
				style={vars({ "--d": 900, marginTop: fl(46) })}
			>
				across{" "}
				<span className={cn(styles.accent, styles.mono)}>
					{transactionCount.toLocaleString("en-US")}
				</span>{" "}
				transactions —
				<br />
				every single one, logged by you.
			</p>
		</>
	);
}

function OpensContent({ appOpens }: { appOpens: number }) {
	const display = useCountUp(appOpens, 1500);
	return (
		<>
			<div className={styles.grain} aria-hidden />
			<div className={styles.kicker} data-r style={vars({ "--d": 60 })}>
				you spoke with Abakus
			</div>
			<div className={styles.huge} data-r="scale" style={vars({ "--d": 240 })}>
				{display}
			</div>
			<p
				className={styles.footline}
				data-r
				style={vars({ "--d": 820, marginTop: fl(30) })}
			>
				times. We&apos;re flattered, honestly.
			</p>
		</>
	);
}

function RankContent({ categories }: { categories: WrappedCategory[] }) {
	const top = categories.find((c) => c.top) ?? categories[0];
	return (
		<>
			<div className={styles.grain} aria-hidden />
			<div className={styles.kicker} data-r style={vars({ "--d": 60 })}>
				where it all went
			</div>
			<div style={{ marginTop: fl(44) }}>
				{categories.map((c, i) => {
					const d = 200 + i * 160;
					return (
						<div key={c.name}>
							<div
								className={cn(styles.rankRow, c.top && styles.rankRowTop)}
								data-r="left"
								style={vars({ "--d": d })}
							>
								<span className={cn(styles.rPos, styles.mono)}>{c.pos}</span>
								<span className={styles.rName}>{c.name}</span>
								<span className={styles.rVal}>{c.val}</span>
							</div>
							<div className={styles.rBar} style={vars({ "--d": d })}>
								<i
									className={cn(styles.rBarFill, c.top && styles.rBarFillTop)}
									style={vars({ "--w": c.width })}
								/>
							</div>
						</div>
					);
				})}
			</div>
			<p
				className={styles.footline}
				data-r
				style={vars({ "--d": 980, marginTop: fl(42) })}
			>
				{top?.name}.{" "}
				<span
					className={styles.accent}
					style={{ fontStyle: "italic", fontFamily: "var(--font-display)" }}
				>
					We are a people.
				</span>
			</p>
		</>
	);
}

function BigContent({ biggestTransaction }: { biggestTransaction: number }) {
	const display = useCountUp(biggestTransaction, 1600);
	return (
		<>
			<Glow x={50} y={44} color="rgba(240,180,41,0.13)" />
			<div className={styles.grain} aria-hidden />
			<div className={styles.kicker} data-r style={vars({ "--d": 60 })}>
				your boldest move
			</div>
			<div
				className={styles.huge}
				data-r="scale"
				style={vars({ "--d": 240, marginTop: fl(18) })}
			>
				<span className={styles.naira}>₦</span>
				{display}
			</div>
			<p
				className={styles.footline}
				data-r
				style={vars({ "--d": 880, marginTop: fl(46) })}
			>
				One transaction. One tap.
				<br />
				<span
					className={styles.accent}
					style={{
						fontStyle: "italic",
						fontFamily: "var(--font-display)",
						fontSize: fl(42),
					}}
				>
					No questions asked.
				</span>
			</p>
		</>
	);
}

// Spec: week is always 7 entries, Monday first through Sunday last.
const DAY_NAMES = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

/* ── Share ─────────────────────────────────────────────────────── */

const SHARE_URL = "https://useabakus.app";

function getCaption(cardIdx: number, stats: WrappedStats): string {
	const tag = `Track yours → ${SHARE_URL}`;
	switch (cardIdx) {
		case 2:
			return `₦${stats.totalTracked.toLocaleString("en-US")} tracked this month. ${stats.transactionCount} transactions, every one logged.\n\n${tag}`;
		case 3:
			return `I checked Abakus ${stats.appOpens} times this month 😂 Serious about the money.\n\n${tag}`;
		case 4: {
			const top = stats.categories.find((c) => c.top) ?? stats.categories[0];
			return `My top spending category this month? ${top?.name ?? "Spending"} 😅\n\n${tag}`;
		}
		case 5:
			return `₦${stats.biggestTransaction.toLocaleString("en-US")} in one move this month. No hesitation.\n\n${tag}`;
		case 6: {
			const peakIdx = stats.week.findIndex((d) => d.peak);
			const day = DAY_NAMES[peakIdx] ?? "the weekend";
			return `Apparently I'm a ${day} spender 📅\n\n${tag}`;
		}
		case 7:
			return `${stats.streakOn} day streak this month 🔥 Most people quit by day three.\n\n${tag}`;
		default:
			return `My monthly spending, wrapped. 📊\n\n${tag}`;
	}
}

type ShareOutcome = "shared" | "downloaded";

async function shareCard(
	captureEl: HTMLDivElement,
	caption: string,
): Promise<ShareOutcome> {
	const { toPng } = await import("html-to-image");

	const pixelRatio = Math.min(2, window.devicePixelRatio || 1);
	const dataUrl = await toPng(captureEl, {
		pixelRatio,
		cacheBust: true,
		skipFonts: true,
		// Animated <canvas> elements taint the capture via canvas.toDataURL();
		// skip them — the card background/glow still shows via CSS.
		filter: (node) => (node as Element).nodeName !== "CANVAS",
	});

	// Try native file share (works on iOS/Android; desktop Chrome may also support it).
	if (typeof navigator.canShare === "function") {
		try {
			const blob = await (await fetch(dataUrl)).blob();
			const file = new File([blob], "abakus-wrapped.png", {
				type: "image/png",
			});
			if (navigator.canShare({ files: [file] })) {
				await navigator.share({ files: [file], text: caption });
				return "shared";
			}
		} catch (err) {
			if ((err as Error)?.name === "AbortError") throw err;
			console.error("[wrapped/share] native share failed, falling back:", err);
		}
	}

	// Guaranteed fallback: trigger a download.
	const a = Object.assign(document.createElement("a"), {
		href: dataUrl,
		download: "abakus-wrapped.png",
	});
	document.body.appendChild(a);
	a.click();
	a.remove();
	return "downloaded";
}

type ShareStatus = "idle" | "busy" | "shared" | "downloaded" | "error";

const SHARE_LABELS: Record<ShareStatus, string> = {
	idle: "Share",
	busy: "Preparing…",
	shared: "Shared ✓",
	downloaded: "Saved ✓",
	error: "Couldn't share — retry",
};

function ShareButton({
	scalerRef,
	cardIdx,
	stats,
	inkDark,
}: {
	scalerRef: RefObject<HTMLDivElement | null>;
	cardIdx: number;
	stats: WrappedStats;
	inkDark: boolean;
}) {
	const [status, setStatus] = useState<ShareStatus>("idle");

	async function handleShare(e: React.MouseEvent) {
		e.stopPropagation();
		const el = scalerRef.current;
		if (!el || status === "busy") return;
		setStatus("busy");
		try {
			const outcome = await shareCard(el, getCaption(cardIdx, stats));
			setStatus(outcome);
		} catch (err) {
			if ((err as Error)?.name === "AbortError") {
				setStatus("idle");
				return;
			}
			console.error("[wrapped/share] failed:", err);
			setStatus("error");
		} finally {
			setTimeout(() => setStatus("idle"), 2500);
		}
	}

	return (
		<button
			type="button"
			className={cn(
				styles.shareCardBtn,
				inkDark && styles.shareCardBtnDark,
				status === "error" && styles.shareCardBtnError,
			)}
			disabled={status === "busy"}
			aria-label="Share this card"
			onPointerDown={(e) => e.stopPropagation()}
			onPointerUp={(e) => e.stopPropagation()}
			onClick={handleShare}
		>
			{status === "busy" ? (
				<span className={styles.shareBtnSpinner} />
			) : (
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden
				>
					<circle cx={18} cy={5} r={3} />
					<circle cx={6} cy={12} r={3} />
					<circle cx={18} cy={19} r={3} />
					<line x1={8.59} y1={13.51} x2={15.42} y2={17.49} />
					<line x1={15.41} y1={6.51} x2={8.59} y2={10.49} />
				</svg>
			)}
			<span>{SHARE_LABELS[status]}</span>
		</button>
	);
}

function RhythmContent({ week }: { week: WrappedWeekDay[] }) {
	const peakIndex = week.findIndex((d) => d.peak);
	const peakDay = peakIndex >= 0 ? DAY_NAMES[peakIndex] : null;
	return (
		<>
			<div className={styles.grain} aria-hidden />
			<div className={styles.kicker} data-r style={vars({ "--d": 60 })}>
				your weekly rhythm
			</div>
			<p
				className={styles.lede}
				data-r
				style={vars({ "--d": 200, marginTop: fl(18), fontSize: fl(62) })}
			>
				{peakDay ? (
					<>
						You&apos;re a <em>{peakDay}</em> spender.
					</>
				) : (
					"Pretty evenly spread across the week."
				)}
			</p>
			<div className={styles.week}>
				{week.map((d, i) => (
					<div
						key={i}
						className={cn(styles.day, d.peak && styles.peak)}
						data-r="fade"
						style={vars({ "--d": 400 + i * 60 })}
					>
						<div className={styles.weekBar} style={vars({ "--h": d.h })} />
						<span className={styles.dlabel}>{d.label}</span>
					</div>
				))}
			</div>
			{peakDay && (
				<p
					className={styles.footline}
					data-r
					style={vars({ "--d": 1000, marginTop: fl(40) })}
				>
					Most of it lands on{" "}
					<span
						className={styles.accent}
						style={{ fontStyle: "italic", fontFamily: "var(--font-display)" }}
					>
						{peakDay}s.
					</span>
				</p>
			)}
		</>
	);
}

function StreakContent({ total, on }: { total: number; on: number }) {
	return (
		<>
			<div className={styles.grain} aria-hidden />
			<div className={styles.kicker} data-r style={vars({ "--d": 60 })}>
				your longest streak
			</div>
			<div className={styles.huge} data-r="scale" style={vars({ "--d": 220 })}>
				{on}
				<span style={{ fontWeight: 300, fontSize: "0.28em" }}> days</span>
			</div>
			<div
				className={styles.streakDots}
				style={{ margin: `${fl(36)} 0 ${fl(44)}` }}
			>
				{Array.from({ length: total }, (_, i) => (
					<i
						key={i}
						className={cn(styles.dot, i >= on && styles.off)}
						style={vars({ "--d": 560 + i * 32 })}
					/>
				))}
			</div>
			<p className={styles.footline} data-r style={vars({ "--d": 1100 })}>
				Most people quit by day three.
			</p>
		</>
	);
}

function TypeContent() {
	return (
		<>
			<Glow x={50} y={42} color="rgba(240,180,41,0.14)" />
			<div className={styles.grain} aria-hidden />
			<div className={styles.atPre} data-r="fade" style={vars({ "--d": 120 })}>
				your money personality
			</div>
			<div className={styles.atName} data-r="blur" style={vars({ "--d": 380 })}>
				The Quiet
				<br />
				Tracker
			</div>
			<p className={styles.atDesc} data-r style={vars({ "--d": 1000 })}>
				You don&apos;t announce your money. You just — <em>know</em> where it
				goes, no fuss.
			</p>
		</>
	);
}

function FinaleContent({
	scalerRef,
	stats,
}: {
	scalerRef: RefObject<HTMLDivElement | null>;
	stats: WrappedStats;
}) {
	const [status, setStatus] = useState<ShareStatus>("idle");

	async function handleShare(e: React.MouseEvent) {
		e.stopPropagation();
		const el = scalerRef.current;
		if (!el || status === "busy") return;
		setStatus("busy");
		try {
			const outcome = await shareCard(el, getCaption(-1, stats));
			setStatus(outcome);
		} catch (err) {
			if ((err as Error)?.name === "AbortError") {
				setStatus("idle");
				return;
			}
			console.error("[wrapped/share] failed:", err);
			setStatus("error");
		} finally {
			setTimeout(() => setStatus("idle"), 2500);
		}
	}

	return (
		<>
			<ConstellationCanvas />
			<div className={styles.grain} aria-hidden />
			<p className={styles.fnCap} data-r style={vars({ "--d": 120 })}>
				That&apos;s a <span className={styles.accent}>wrap.</span>
			</p>
			<p className={styles.fnSee} data-r="fade" style={vars({ "--d": 520 })}>
				See you in July.
			</p>
			<div
				className={styles.fnMark}
				data-r="scale"
				style={vars({ "--d": 760 })}
			>
				<AbakusMark size={90} />
			</div>
			<div className={styles.fnWord} data-r="fade" style={vars({ "--d": 980 })}>
				ABAKUS
			</div>
			<button
				type="button"
				className={styles.shareBtn}
				data-r="fade"
				style={vars({ "--d": 1240 })}
				disabled={status === "busy"}
				onClick={handleShare}
			>
				{status === "idle" ? "Share your Wrapped →" : SHARE_LABELS[status]}
			</button>
		</>
	);
}

/* ── Chrome ───────────────────────────────────────────────────── */

function Brandbar() {
	return (
		<div className={styles.brandbar}>
			<div className={styles.bbLogo}>
				<AbakusMark />
				<span className={styles.bbWord}>Abakus</span>
			</div>
			<span className={cn(styles.bbTag, styles.mono)}>JUN &apos;26</span>
		</div>
	);
}

function Segments({
	count,
	idx,
	paused,
	onComplete,
}: {
	count: number;
	idx: number;
	paused: boolean;
	onComplete: () => void;
}) {
	return (
		<div className={styles.segments}>
			{Array.from({ length: count }, (_, i) => (
				<div key={i} className={styles.seg}>
					<div
						className={cn(styles.segFill, i === idx && styles.segFillActive)}
						style={
							i === idx
								? {
										animationDuration: `${CARD_MS}ms`,
										animationPlayState: paused ? "paused" : "running",
									}
								: { width: i < idx ? "100%" : "0%" }
						}
						onAnimationEnd={i === idx ? onComplete : undefined}
					/>
				</div>
			))}
		</div>
	);
}

/* ── Cards ────────────────────────────────────────────────────── */

type CardMeta = {
	bg: string;
	inkDark?: boolean;
	className: string;
};

const CARDS: CardMeta[] = [
	{ bg: "#0A0F0D", className: styles.cCover },
	{ bg: "#16261E", className: styles.cOpen },
	{ bg: "#0A0F0D", className: styles.cTotal },
	{ bg: "#F0B429", inkDark: true, className: styles.cOpens },
	{ bg: "#0A0F0D", className: styles.cRank },
	{ bg: "#16261E", className: styles.cBig },
	{ bg: "#0A0F0D", className: styles.cRhythm },
	{ bg: "#F0B429", inkDark: true, className: styles.cStreak },
	{ bg: "#0A0F0D", className: styles.cType },
	{ bg: "#0A0F0D", className: styles.cFinale },
];

const N = CARDS.length;

export function WrappedPage({ stats }: { stats: WrappedStats }) {
	const [idx, setIdx] = useState(0);
	const [paused, setPaused] = useState(false);
	const scalerRef = useRef<HTMLDivElement>(null);
	const holdRef = useRef<{
		timer: ReturnType<typeof setTimeout> | null;
		didHold: boolean;
	}>({ timer: null, didHold: false });

	const contents = useMemo<ComponentType[]>(
		() => [
			CoverContent,
			OpenContent,
			() => (
				<TotalContent
					totalTracked={stats.totalTracked}
					transactionCount={stats.transactionCount}
				/>
			),
			() => <OpensContent appOpens={stats.appOpens} />,
			() => <RankContent categories={stats.categories} />,
			() => <BigContent biggestTransaction={stats.biggestTransaction} />,
			() => <RhythmContent week={stats.week} />,
			() => <StreakContent total={stats.streakTotal} on={stats.streakOn} />,
			TypeContent,
			() => <FinaleContent scalerRef={scalerRef} stats={stats} />,
		],
		[stats],
	);

	const go = useCallback((dir: number) => {
		setIdx((i) => (i + dir + N) % N);
	}, []);

	useEffect(() => {
		function onKeydown(e: KeyboardEvent) {
			if (e.key === "ArrowRight" || e.key === " ") {
				e.preventDefault();
				go(1);
			} else if (e.key === "ArrowLeft") go(-1);
		}
		window.addEventListener("keydown", onKeydown);
		return () => window.removeEventListener("keydown", onKeydown);
	}, [go]);

	function handlePointerDown() {
		holdRef.current.didHold = false;
		holdRef.current.timer = setTimeout(() => {
			holdRef.current.didHold = true;
			setPaused(true);
		}, 220);
	}

	function handlePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
		if (holdRef.current.timer) clearTimeout(holdRef.current.timer);
		if (holdRef.current.didHold) {
			setPaused(false);
			return;
		}
		const rect = e.currentTarget.getBoundingClientRect();
		const rel = (e.clientX - rect.left) / rect.width;
		go(rel < 0.32 ? -1 : 1);
	}

	const card = CARDS[idx];
	const Content = contents[idx];

	return (
		<div
			className={cn(
				styles.root,
				card.inkDark && styles.inkDark,
				paused && styles.held,
			)}
			style={{ backgroundColor: card.bg }}
			onPointerDown={handlePointerDown}
			onPointerUp={handlePointerUp}
		>
			{/* Capture target for sharing: a normal-flow box, not the `position:
			    fixed` root — html-to-image can't reliably rasterize fixed-position
			    elements. */}
			<div ref={scalerRef} className={styles.stage}>
				<Segments
					count={N}
					idx={idx}
					paused={paused}
					onComplete={() => go(1)}
				/>
				<Brandbar />
				<section
					key={idx}
					className={cn(styles.card, card.className)}
					style={{ backgroundColor: card.bg }}
				>
					<Content />
				</section>
				</div>
			<ShareButton
				scalerRef={scalerRef}
				cardIdx={idx}
				stats={stats}
				inkDark={!!card.inkDark}
			/>
		</div>
	);
}
