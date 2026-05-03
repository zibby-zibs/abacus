import { Reveal } from "@/components/landing/Reveal";
import { SendIcon } from "@/components/landing/SendIcon";
import { cn } from "@/lib/utils";

export function ChatDemoSection() {
	return (
		<section
			className="relative overflow-hidden px-[clamp(1.25rem,4vw,3.25rem)] py-40"
			id="demo"
		>
			<div
				className="pointer-events-none absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(245,200,66,0.12)_20%,rgba(245,200,66,0.2)_50%,rgba(245,200,66,0.12)_80%,transparent_100%)] dark:bg-[linear-gradient(90deg,transparent_0%,rgba(245,200,66,0.08)_20%,rgba(245,200,66,0.15)_50%,rgba(245,200,66,0.08)_80%,transparent_100%)]"
				aria-hidden
			/>
			<div
				className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(45,97,71,0.12)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(45,97,71,0.18)_0%,transparent_65%)]"
				aria-hidden
			/>
			<div className="relative mx-auto grid max-w-container grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-[100px]">
				<div>
					<p className="mb-6 flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.14em] text-gold-600 uppercase dark:text-gold-500/70">
						<span className="h-px w-6 bg-gold-500/50" />
						Real conversation
					</p>
					<h2
						className={cn(
							"font-serif",
							"mb-6 text-[clamp(2.125rem,3.5vw,3.375rem)] leading-tight font-normal tracking-[-0.025em] text-forest-900 dark:text-offwhite",
						)}
					>
						It understands how you{" "}
						<em className="italic text-gold-600 dark:text-gold-500">
							actually
						</em>{" "}
						talk.
					</h2>
					<p className="text-base font-light leading-relaxed text-neutral-600 dark:text-foreground-muted">
						&quot;5k on food&quot;, &quot;okada 800&quot;, &quot;emeka owes me
						15k&quot; — Abacus knows what you mean. Nigerian context built in.
						No configuration, no categories to select, no dropdowns.
					</p>
				</div>
				<Reveal>
					<div className="overflow-hidden rounded-3xl border border-neutral-300/80 bg-surface shadow-[0_0_0_1px_rgba(245,200,66,0.08),0_32px_80px_rgba(13,30,23,0.08)] dark:border-white/10 dark:bg-surface dark:shadow-[0_0_0_1px_rgba(245,200,66,0.04),0_32px_80px_rgba(0,0,0,0.6),0_0_120px_rgba(26,58,46,0.3)]">
						<div className="flex items-center gap-3 border-b border-neutral-300/80 bg-forest-100 px-5 py-4 dark:border-white/10 dark:bg-forest-800">
							<div
								className={cn(
									"font-serif",
									"flex size-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-gold-500),var(--color-gold-600))] text-[15px] text-primary-fg",
								)}
							>
								A
							</div>
							<div>
								<div className="text-sm font-semibold text-forest-900 dark:text-offwhite">
									Abacus
								</div>
								<div className="text-[11px] text-neutral-600 dark:text-white/45">
									<span className="mr-1.5 inline-block size-1.5 translate-y-px rounded-full bg-whatsapp align-middle" />
									online
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2 bg-forest-50/60 p-5 dark:bg-[#101a13]">
							<div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-forest-200/90 px-3.5 py-2.5 text-sm leading-normal text-forest-900/90 dark:bg-forest-800 dark:text-foreground/90">
								spent 4,500 at chicken republic
								<div className="mt-1 text-right text-[9.5px] text-neutral-600 dark:text-foreground-muted">
									10:41 ✓✓
								</div>
							</div>
							<div className="max-w-[80%] self-start rounded-2xl rounded-bl-sm border border-neutral-300/60 bg-offwhite px-3.5 py-2.5 text-sm leading-normal text-forest-900/90 dark:border-white/10 dark:bg-surface-raised dark:text-foreground/85">
								Got it —{" "}
								<span className="font-mono text-[13px] font-medium text-gold-600 dark:text-gold-500">
									₦4,500
								</span>{" "}
								for Food at Chicken Republic.
								<br />
								You&apos;ve spent{" "}
								<span className="font-mono text-[13px] font-medium text-gold-600 dark:text-gold-500">
									₦18,200
								</span>{" "}
								on food this month.{" "}
								<span className="font-mono text-[13px] font-medium text-gold-600 dark:text-gold-500">
									₦21,800
								</span>{" "}
								left in your budget.
								<div className="mt-1 text-right text-[9.5px] text-neutral-600 dark:text-foreground-muted">
									10:41
								</div>
							</div>
							<div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-forest-200/90 px-3.5 py-2.5 text-sm leading-normal text-forest-900/90 dark:bg-forest-800 dark:text-foreground/90">
								emeka owes me 15k from last night
								<div className="mt-1 text-right text-[9.5px] text-neutral-600 dark:text-foreground-muted">
									10:43 ✓✓
								</div>
							</div>
							<div className="max-w-[80%] self-start rounded-2xl rounded-bl-sm border border-neutral-300/60 bg-offwhite px-3.5 py-2.5 text-sm leading-normal text-forest-900/90 dark:border-white/10 dark:bg-surface-raised dark:text-foreground/85">
								Logged — Emeka owes you{" "}
								<span className="font-mono text-[13px] font-medium text-gold-600 dark:text-gold-500">
									₦15,000
								</span>
								.
								<div className="mt-1 text-right text-[9.5px] text-neutral-600 dark:text-foreground-muted">
									10:43
								</div>
							</div>
							<div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-forest-200/90 px-3.5 py-2.5 text-sm leading-normal text-forest-900/90 dark:bg-forest-800 dark:text-foreground/90">
								how much did I spend this week
								<div className="mt-1 text-right text-[9.5px] text-neutral-600 dark:text-foreground-muted">
									10:45 ✓✓
								</div>
							</div>
							<div className="max-w-[80%] self-start rounded-2xl rounded-bl-sm border border-neutral-300/60 bg-offwhite px-3.5 py-2.5 text-sm leading-normal text-forest-900/90 dark:border-white/10 dark:bg-surface-raised dark:text-foreground/85">
								<span className="font-mono text-[13px] font-medium text-gold-600 dark:text-gold-500">
									₦31,400
								</span>{" "}
								this week across 12 transactions.
								<br />
								Food:{" "}
								<span className="font-mono text-[13px] font-medium text-gold-600 dark:text-gold-500">
									₦18,200
								</span>{" "}
								· Transport:{" "}
								<span className="font-mono text-[13px] font-medium text-gold-600 dark:text-gold-500">
									₦7,800
								</span>{" "}
								· Other:{" "}
								<span className="font-mono text-[13px] font-medium text-gold-600 dark:text-gold-500">
									₦5,400
								</span>
								<div className="mt-1 text-right text-[9.5px] text-neutral-600 dark:text-foreground-muted">
									10:45
								</div>
							</div>
						</div>
						<div className="flex items-center gap-2.5 border-t border-neutral-300/60 bg-surface px-4 py-3 dark:border-white/10 dark:bg-surface">
							<div className="flex-1 rounded-full border border-neutral-300/80 bg-neutral-200/50 px-3.5 py-2.5 font-sans text-[13px] text-neutral-500 dark:border-white/10 dark:bg-white/5 dark:text-foreground-muted">
								Message
							</div>
							<div
								className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gold-500 text-forest-900"
								aria-hidden
							>
								<SendIcon size={15} strokeWidth={2.5} />
							</div>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
