"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { SendIcon } from "@/components/landing/SendIcon";
import { initializePayment, type PlanId } from "@/services/payment-initialize";
import { PAYSTACK_CALLBACK_PATH } from "@/lib/payment-constants";

// ─── Types ───────────────────────────────────────────────────────────────────

type Step =
	| "WELCOME"
	| "COLLECT_NAME"
	| "COLLECT_EMAIL"
	| "COLLECT_CURRENCY"
	| "COLLECT_TIMEZONE"
	| "COLLECT_INCOME"
	| "SET_FIRST_BUDGET"
	| "PROCESSING"
	| "ERROR";

interface ChatMessage {
	id: string;
	role: "bot" | "user";
	content: string;
}

interface CollectedData {
	name?: string;
	email?: string;
	currency?: string;
	timezone?: string;
	income?: number;
	budget?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
	return Math.random().toString(36).slice(2);
}

function sleep(ms: number) {
	return new Promise<void>((r) => setTimeout(r, ms));
}

function parseAmount(raw: string): number | null {
	const s = raw
		.trim()
		.toLowerCase()
		.replace(/,/g, "")
		.replace(/[₦$£€r]/g, "");
	const value = s.endsWith("k") ? parseFloat(s) * 1000 : parseFloat(s);
	return isNaN(value) || value <= 0 ? null : Math.round(value);
}

function isValidEmail(s: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

const CURRENCIES = ["NGN", "USD", "GBP", "EUR", "KES", "GHS", "ZAR"];

const STEP_PROGRESS: Record<Step, number> = {
	WELCOME: 0,
	COLLECT_NAME: 14,
	COLLECT_EMAIL: 28,
	COLLECT_CURRENCY: 43,
	COLLECT_TIMEZONE: 57,
	COLLECT_INCOME: 71,
	SET_FIRST_BUDGET: 86,
	PROCESSING: 100,
	ERROR: 86,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingIndicator() {
	return (
		<div className="flex animate-in fade-in-0 duration-150 max-w-[80%] items-center gap-1 self-start rounded-2xl rounded-bl-sm border border-neutral-300/60 bg-offwhite px-3.5 py-3 dark:border-white/10 dark:bg-surface-raised">
			{[0, 150, 300].map((d) => (
				<span
					key={d}
					className="size-1.5 rounded-full bg-neutral-400 animate-bounce dark:bg-neutral-500"
					style={{ animationDelay: `${d}ms` }}
				/>
			))}
		</div>
	);
}

function BotBubble({ content }: { content: string }) {
	return (
		<div className="animate-in fade-in-0 slide-in-from-bottom-1 duration-200 max-w-[82%] self-start rounded-2xl rounded-bl-sm border border-neutral-300/60 bg-offwhite px-3.5 py-2.5 text-[13px] leading-relaxed text-forest-900/90 dark:border-white/10 dark:bg-surface-raised dark:text-foreground/85">
			{content}
		</div>
	);
}

function UserBubble({ content }: { content: string }) {
	return (
		<div className="animate-in fade-in-0 slide-in-from-bottom-1 duration-200 ml-auto max-w-[82%] rounded-2xl rounded-br-sm bg-forest-200/90 px-3.5 py-2.5 text-[13px] leading-relaxed text-forest-900/90 dark:bg-forest-800 dark:text-foreground/90">
			{content}
		</div>
	);
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

interface PremiumOnboardingModalProps {
	isOpen: boolean;
	onClose: () => void;
	planId: PlanId;
	planName: string;
	planPrice: string;
}

export function PremiumOnboardingModal({
	isOpen,
	onClose,
	planId,
	planName,
	planPrice,
}: PremiumOnboardingModalProps) {
	const [step, setStep] = React.useState<Step>("WELCOME");
	const [messages, setMessages] = React.useState<ChatMessage[]>([]);
	const [isTyping, setIsTyping] = React.useState(false);
	const [inputValue, setInputValue] = React.useState("");
	const [collectedData, setCollectedData] = React.useState<CollectedData>({});
	const [showCurrencyInput, setShowCurrencyInput] = React.useState(false);

	const messagesEndRef = React.useRef<HTMLDivElement>(null);
	const inputRef = React.useRef<HTMLInputElement>(null);
	const cancelRef = React.useRef(false);

	const addMessage = (role: "bot" | "user", content: string) => {
		setMessages((prev) => [...prev, { id: uid(), role, content }]);
	};

	const addBotSequence = async (msgs: { text: string; delay?: number }[]) => {
		setIsTyping(true);
		for (const { text, delay = 800 } of msgs) {
			if (cancelRef.current) return;
			await sleep(delay);
			if (cancelRef.current) return;
			setMessages((prev) => [
				...prev,
				{ id: uid(), role: "bot", content: text },
			]);
		}
		await sleep(250);
		if (!cancelRef.current) setIsTyping(false);
	};

	// Scroll to bottom on each new message or typing state change
	React.useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isTyping]);

	// Focus text input when the current step needs text
	React.useEffect(() => {
		const textSteps: Step[] = [
			"COLLECT_NAME",
			"COLLECT_EMAIL",
			"COLLECT_TIMEZONE",
			"COLLECT_INCOME",
			"SET_FIRST_BUDGET",
		];
		if (textSteps.includes(step) && !isTyping) {
			setTimeout(() => inputRef.current?.focus(), 80);
		}
	}, [step, isTyping]);

	// Reset + run welcome sequence when the modal opens
	React.useEffect(() => {
		if (!isOpen) {
			cancelRef.current = true;
			// Brief delay so the exit animation finishes before resetting
			const t = setTimeout(() => {
				setStep("WELCOME");
				setMessages([]);
				setIsTyping(false);
				setInputValue("");
				setCollectedData({});
				setShowCurrencyInput(false);
				cancelRef.current = false;
			}, 250);
			return () => clearTimeout(t);
		}

		cancelRef.current = false;
		(async () => {
			await addBotSequence([
				{ text: "Hey! 👋", delay: 350 },
				{ text: "I'm Abakus — your money tracker on WhatsApp.", delay: 900 },
				{
					text: `Getting you on ${planName}. Takes about a minute.`,
					delay: 750,
				},
				{ text: "What's your name?", delay: 600 },
			]);
			if (!cancelRef.current) setStep("COLLECT_NAME");
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const handleCurrencySelect = async (currency: string) => {
		addMessage("user", currency);
		setCollectedData((d) => ({ ...d, currency }));
		setShowCurrencyInput(false);

		const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
		setInputValue(detected);
		setStep("COLLECT_TIMEZONE");

		await addBotSequence([
			{ text: `${currency} — noted.`, delay: 500 },
			{ text: `What timezone are you in?`, delay: 400 },
		]);
	};

	const handlePayment = async (data: CollectedData) => {
		const callbackUrl =
			typeof window !== "undefined"
				? `${window.location.origin}${PAYSTACK_CALLBACK_PATH}`
				: undefined;

		const result = await initializePayment({
			email: data.email!,
			planId,
			name: data.name!,
			currency: data.currency!,
			timezone: data.timezone!,
			income: data.income!,
			budget: data.budget!,
			callbackUrl,
		});

		if (result.ok) {
			window.location.href = result.authorizationUrl;
		} else {
			setStep("ERROR");
			await addBotSequence([
				{
					text: `Hmm, something went wrong — ${result.message}. Want to try again?`,
					delay: 700,
				},
			]);
		}
	};

	const handleSubmit = async () => {
		const value = inputValue.trim();
		if (!value) return;

		if (step === "COLLECT_NAME") {
			if (value.length < 2) return;
			addMessage("user", value);
			setInputValue("");
			setCollectedData((d) => ({ ...d, name: value }));
			setStep("COLLECT_EMAIL");
			await addBotSequence([
				{ text: `Nice to meet you, ${value}! 🎉`, delay: 600 },
				{ text: "What email should I send your receipt to?", delay: 500 },
			]);
			return;
		}

		if (step === "COLLECT_EMAIL") {
			addMessage("user", value);
			setInputValue("");
			if (!isValidEmail(value)) {
				await addBotSequence([
					{
						text: "That doesn't look like a valid email — could you double-check?",
						delay: 600,
					},
				]);
				return;
			}
			setCollectedData((d) => ({ ...d, email: value }));
			setStep("COLLECT_CURRENCY");
			await addBotSequence([
				{ text: "Got it.", delay: 500 },
				{ text: "What currency do you mainly spend in?", delay: 400 },
			]);
			return;
		}

		if (step === "COLLECT_TIMEZONE") {
			addMessage("user", value);
			setInputValue("");
			setCollectedData((d) => ({ ...d, timezone: value }));
			setStep("COLLECT_INCOME");
			await addBotSequence([
				{ text: "Perfect.", delay: 400 },
				{
					text: "What's your rough monthly income? Just a number — no commas needed.",
					delay: 500,
				},
			]);
			return;
		}

		if (step === "COLLECT_INCOME") {
			const amount = parseAmount(value);
			addMessage("user", value);
			setInputValue("");
			if (!amount) {
				await addBotSequence([
					{
						text: "I need a number here — try something like 150000 or 150k.",
						delay: 600,
					},
				]);
				return;
			}
			setCollectedData((d) => ({ ...d, income: amount }));
			setStep("SET_FIRST_BUDGET");
			await addBotSequence([
				{ text: "Got it.", delay: 400 },
				{
					text: "Last one — what monthly spending budget should I track against?",
					delay: 500,
				},
			]);
			return;
		}

		if (step === "SET_FIRST_BUDGET") {
			const amount = parseAmount(value);
			addMessage("user", value);
			setInputValue("");
			if (!amount) {
				await addBotSequence([
					{
						text: "I need a number — try something like 80000 or 80k.",
						delay: 600,
					},
				]);
				return;
			}
			const finalData = { ...collectedData, budget: amount };
			setCollectedData(finalData);
			setStep("PROCESSING");
			await addBotSequence([
				{ text: "All set! ✨ Taking you to payment now...", delay: 800 },
			]);
			if (!cancelRef.current) await handlePayment(finalData);
			return;
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	const isProcessing = step === "PROCESSING";
	const progress = STEP_PROGRESS[step];

	const showTextInput =
		!isTyping &&
		(step === "COLLECT_NAME" ||
			step === "COLLECT_EMAIL" ||
			step === "COLLECT_TIMEZONE" ||
			step === "COLLECT_INCOME" ||
			step === "SET_FIRST_BUDGET");

	const showCurrencyChips =
		!isTyping && step === "COLLECT_CURRENCY" && !showCurrencyInput;

	const showCurrencyOtherInput =
		!isTyping && step === "COLLECT_CURRENCY" && showCurrencyInput;

	const inputPlaceholder =
		step === "COLLECT_NAME"
			? "Your name"
			: step === "COLLECT_EMAIL"
				? "you@example.com"
				: step === "COLLECT_TIMEZONE"
					? "e.g. Africa/Lagos"
					: step === "COLLECT_INCOME" || step === "SET_FIRST_BUDGET"
						? "e.g. 150000 or 150k"
						: "Type here...";

	return (
		<DialogPrimitive.Root
			open={isOpen}
			onOpenChange={(open) => !open && onClose()}
		>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 duration-200" />
				<DialogPrimitive.Content
					aria-describedby={undefined}
					onPointerDownOutside={(e) => e.preventDefault()}
					onEscapeKeyDown={isProcessing ? (e) => e.preventDefault() : undefined}
					className={cn(
						"fixed top-1/2 left-1/2 z-[10051] -translate-x-1/2 -translate-y-1/2 outline-none",
						"w-[min(calc(100vw-1.5rem),30rem)] overflow-hidden",
						"rounded-3xl border border-neutral-300/80 bg-surface",
						"shadow-[0_0_0_1px_rgba(245,200,66,0.08),0_32px_80px_rgba(13,30,23,0.12)]",
						"dark:border-white/10 dark:shadow-[0_0_0_1px_rgba(245,200,66,0.04),0_32px_80px_rgba(0,0,0,0.65),0_0_100px_rgba(26,58,46,0.25)]",
						"data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
						"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
						"duration-200 ease-out",
					)}
				>
					{/* Progress bar */}
					<div className="absolute top-0 left-0 right-0 h-0.5 bg-neutral-200/80 dark:bg-white/[0.08]">
						<div
							className="h-full bg-gold-500 transition-all duration-500 ease-out"
							style={{ width: `${progress}%` }}
						/>
					</div>

					{/* Chat header */}
					<div className="flex items-center gap-3 border-b border-neutral-300/80 bg-forest-100 px-5 py-4 dark:border-white/10 dark:bg-forest-800">
						<div
							className={cn(
								"font-serif",
								"flex size-9 shrink-0 items-center justify-center rounded-full",
								"bg-[linear-gradient(135deg,var(--color-gold-500),var(--color-gold-600))]",
								"text-[15px] text-primary-fg",
							)}
						>
							A
						</div>
						<div className="flex-1 min-w-0">
							<div className="text-sm font-semibold text-forest-900 dark:text-offwhite">
								Abakus
							</div>
							<div className="flex items-center gap-2 text-[11px] text-neutral-600 dark:text-white/45">
								<span className="flex items-center gap-1">
									<span className="inline-block size-1.5 rounded-full bg-whatsapp" />
									online
								</span>
								<span className="text-neutral-400 dark:text-white/25">·</span>
								<span className="truncate font-medium text-gold-600 dark:text-gold-500/80">
									{planName} · {planPrice}
								</span>
							</div>
						</div>
						{!isProcessing && (
							<DialogPrimitive.Close asChild>
								<button
									className="flex size-7 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-200/80 hover:text-neutral-700 dark:text-white/40 dark:hover:bg-white/10 dark:hover:text-white/70"
									aria-label="Close"
								>
									<HugeiconsIcon
										icon={Cancel01Icon}
										size={14}
										strokeWidth={2}
									/>
								</button>
							</DialogPrimitive.Close>
						)}
					</div>

					{/* Messages */}
					<div className="flex max-h-[min(52dvh,360px)] flex-col gap-2 overflow-y-auto bg-forest-50/60 p-5 dark:bg-[#101a13]">
						{messages.map((m) =>
							m.role === "bot" ? (
								<BotBubble key={m.id} content={m.content} />
							) : (
								<UserBubble key={m.id} content={m.content} />
							),
						)}
						{isTyping && <TypingIndicator />}
						<div ref={messagesEndRef} />
					</div>

					{/* Currency chips */}
					{showCurrencyChips && (
						<div className="flex flex-wrap gap-2 border-t border-neutral-300/60 bg-surface px-4 py-3.5 dark:border-white/10 dark:bg-surface">
							{CURRENCIES.map((c) => (
								<button
									key={c}
									onClick={() => handleCurrencySelect(c)}
									className="rounded-full border border-neutral-300/80 bg-offwhite px-3.5 py-1.5 text-[12px] font-medium text-forest-900 transition-colors hover:border-gold-500/60 hover:bg-gold-50 dark:border-white/20 dark:bg-white/5 dark:text-offwhite dark:hover:border-gold-500/40 dark:hover:bg-gold-500/10"
								>
									{c}
								</button>
							))}
							<button
								onClick={() => setShowCurrencyInput(true)}
								className="rounded-full border border-dashed border-neutral-300/80 bg-transparent px-3.5 py-1.5 text-[12px] text-neutral-500 transition-colors hover:border-neutral-400 dark:border-white/20 dark:text-white/40 dark:hover:border-white/30"
							>
								Other
							</button>
						</div>
					)}

					{/* Currency free-text input */}
					{showCurrencyOtherInput && (
						<div className="flex items-center gap-2.5 border-t border-neutral-300/60 bg-surface px-4 py-3 dark:border-white/10 dark:bg-surface">
							<input
								ref={inputRef}
								autoFocus
								value={inputValue}
								onChange={(e) =>
									setInputValue(e.target.value.toUpperCase().slice(0, 5))
								}
								onKeyDown={(e) => {
									if (e.key === "Enter" && inputValue.trim()) {
										handleCurrencySelect(inputValue.trim());
										setInputValue("");
									}
								}}
								placeholder="e.g. CAD, AUD, CHF"
								className="flex-1 rounded-full border border-neutral-300/80 bg-neutral-200/50 px-3.5 py-2.5 font-sans text-[13px] text-forest-900 outline-none placeholder:text-neutral-500 focus:border-gold-500/40 dark:border-white/10 dark:bg-white/5 dark:text-offwhite dark:placeholder:text-foreground-muted dark:focus:border-gold-500/25"
							/>
							<button
								onClick={() => {
									if (inputValue.trim()) {
										handleCurrencySelect(inputValue.trim());
										setInputValue("");
									}
								}}
								disabled={!inputValue.trim()}
								className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-forest-900 transition-opacity disabled:opacity-40"
							>
								<SendIcon size={15} strokeWidth={2.5} />
							</button>
						</div>
					)}

					{/* Standard text input */}
					{showTextInput && (
						<div className="flex items-center gap-2.5 border-t border-neutral-300/60 bg-surface px-4 py-3 dark:border-white/10 dark:bg-surface">
							<input
								ref={inputRef}
								type={step === "COLLECT_EMAIL" ? "email" : "text"}
								inputMode={
									step === "COLLECT_INCOME" || step === "SET_FIRST_BUDGET"
										? "numeric"
										: undefined
								}
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder={inputPlaceholder}
								className="flex-1 rounded-full border border-neutral-300/80 bg-neutral-200/50 px-3.5 py-2.5 font-sans text-[13px] text-forest-900 outline-none placeholder:text-neutral-500 focus:border-gold-500/40 dark:border-white/10 dark:bg-white/5 dark:text-offwhite dark:placeholder:text-foreground-muted dark:focus:border-gold-500/25"
							/>
							<button
								onClick={handleSubmit}
								disabled={!inputValue.trim()}
								className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-forest-900 transition-opacity disabled:opacity-40"
							>
								<SendIcon size={15} strokeWidth={2.5} />
							</button>
						</div>
					)}

					{/* Processing */}
					{isProcessing && !isTyping && (
						<div className="flex items-center justify-center border-t border-neutral-300/60 bg-surface px-4 py-3.5 dark:border-white/10 dark:bg-surface">
							<div className="flex items-center gap-2">
								{[0, 150, 300].map((d) => (
									<span
										key={d}
										className="size-1.5 rounded-full bg-gold-500 animate-bounce"
										style={{ animationDelay: `${d}ms` }}
									/>
								))}
								<span className="ml-1 text-[12px] text-neutral-500 dark:text-foreground-muted">
									Redirecting to payment...
								</span>
							</div>
						</div>
					)}

					{/* Error retry */}
					{step === "ERROR" && !isTyping && (
						<div className="border-t border-neutral-300/60 bg-surface px-4 py-3 dark:border-white/10 dark:bg-surface">
							<button
								onClick={async () => {
									setStep("PROCESSING");
									await addBotSequence([
										{ text: "Trying again...", delay: 500 },
									]);
									if (!cancelRef.current) await handlePayment(collectedData);
								}}
								className="w-full rounded-full bg-[linear-gradient(135deg,var(--color-gold-500),var(--color-gold-600))] px-4 py-2.5 text-[13px] font-medium text-forest-900 shadow-[0_0_0_1px_rgba(245,200,66,0.3),0_4px_12px_rgba(245,200,66,0.2)] transition-opacity hover:opacity-90"
							>
								Try again →
							</button>
						</div>
					)}
				</DialogPrimitive.Content>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}

// ─── CTA Button (used in PricingSection) ─────────────────────────────────────

interface PremiumCTAButtonProps {
	planId: PlanId;
	planName: string;
	planPrice: string;
	className?: string;
}

export function PremiumCTAButton({
	planId,
	planName,
	planPrice,
	className,
}: PremiumCTAButtonProps) {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className={cn(
					"mt-5 w-full rounded-full px-4 py-2.5 text-[13px] font-medium transition-all duration-150",
					planId === "light"
						? "bg-[linear-gradient(135deg,var(--color-gold-500),var(--color-gold-600))] text-forest-900 shadow-[0_0_0_1px_rgba(245,200,66,0.25),0_4px_16px_rgba(245,200,66,0.2)] hover:opacity-90 hover:shadow-[0_0_0_1px_rgba(245,200,66,0.35),0_6px_20px_rgba(245,200,66,0.28)]"
						: "bg-forest-900 text-offwhite shadow-sm hover:bg-forest-800 dark:bg-offwhite dark:text-forest-900 dark:hover:bg-offwhite/90",
					className,
				)}
			>
				Get started →
			</button>
			<PremiumOnboardingModal
				isOpen={open}
				onClose={() => setOpen(false)}
				planId={planId}
				planName={planName}
				planPrice={planPrice}
			/>
		</>
	);
}
