"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { VerifyResult, WrappedStats, WrappedStatus } from "@/types/wrapped";
import { WrappedPage } from "@/components/wrapped/WrappedPage";
import styles from "./wrapped.module.css";

type Phase = "loading" | "expired" | "locked" | "error" | "verify" | "unlocked";

function AbakusMark({ size = 28 }: { size?: number }) {
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

function GateScreen({
	title,
	sub,
	children,
}: {
	title: string;
	sub?: string;
	children?: React.ReactNode;
}) {
	return (
		<div className={styles.gateRoot}>
			<div className={styles.gateCard}>
				<div className={styles.gateLogo}>
					<AbakusMark />
				</div>
				<h1 className={styles.gateTitle}>{title}</h1>
				{sub && <p className={styles.gateSub}>{sub}</p>}
				{children}
			</div>
		</div>
	);
}

export function WrappedGate({ token }: { token: string }) {
	const [phase, setPhase] = useState<Phase>("loading");
	const [stats, setStats] = useState<WrappedStats | null>(null);
	const [phone, setPhone] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		fetch(`/api/wrapped/${token}/status`)
			.then((res) => res.json())
			.then((data: WrappedStatus) => {
				if (cancelled) return;
				if (!data.valid) setPhase("expired");
				else if (data.locked) setPhase("locked");
				else setPhase("verify");
			})
			.catch(() => {
				if (!cancelled) setPhase("error");
			});
		return () => {
			cancelled = true;
		};
	}, [token]);

	async function handleVerify(e: FormEvent) {
		e.preventDefault();
		setSubmitting(true);
		setFormError(null);
		try {
			const res = await fetch(`/api/wrapped/${token}/verify`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ phoneNumber: phone }),
			});
			const data: VerifyResult = await res.json();
			if (data.ok) {
				setStats(data.stats);
				setPhase("unlocked");
				return;
			}
			if (data.reason === "LOCKED") {
				setPhase("locked");
			} else if (data.reason === "NOT_FOUND") {
				setPhase("expired");
			} else if (data.reason === "MISMATCH") {
				const left = data.attemptsRemaining;
				setFormError(
					`That number doesn't match. ${left} attempt${left === 1 ? "" : "s"} left.`,
				);
			} else {
				setFormError("Couldn't verify right now. Try again.");
			}
		} catch {
			setFormError("Couldn't verify right now. Try again.");
		} finally {
			setSubmitting(false);
		}
	}

	if (phase === "loading") {
		return <GateScreen title="Loading your Wrapped…" />;
	}

	if (phase === "expired") {
		return (
			<GateScreen
				title="This link has expired."
				sub="Wrapped links last 45 days. Ask for a fresh one in WhatsApp."
			/>
		);
	}

	if (phase === "locked") {
		return (
			<GateScreen
				title="Too many attempts."
				sub="This link is locked for security. Ask for a fresh one in WhatsApp."
			/>
		);
	}

	if (phase === "error") {
		return (
			<GateScreen
				title="Something went wrong."
				sub="Couldn't reach Abakus. Check your connection and try again."
			>
				<button
					type="button"
					className={styles.gateButton}
					style={{ marginTop: 24 }}
					onClick={() => setPhase("loading")}
				>
					Retry
				</button>
			</GateScreen>
		);
	}

	if (phase === "unlocked" && stats) {
		return <WrappedPage stats={stats} />;
	}

	return (
		<GateScreen
			title="Verify it's you."
			sub="Enter the phone number on your Abakus account to see your Wrapped."
		>
			<form className={styles.gateForm} onSubmit={handleVerify}>
				<input
					type="tel"
					inputMode="tel"
					autoComplete="tel"
					placeholder="e.g. 0801 234 5678"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					className={styles.gateInput}
					required
				/>
				<button type="submit" className={styles.gateButton} disabled={submitting}>
					{submitting ? "Checking…" : "Unlock my Wrapped"}
				</button>
			</form>
			{formError && <p className={styles.gateError}>{formError}</p>}
		</GateScreen>
	);
}
