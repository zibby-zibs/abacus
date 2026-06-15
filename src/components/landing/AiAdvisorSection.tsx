import { cn } from "@/lib/utils";
import { Reveal } from "@/components/landing/Reveal";
import { WHATSAPP_URL } from "@/components/landing/constants";
import { SendIcon } from "@/components/landing/SendIcon";

const conversations = [
	{
		id: "01",
		ask: "If I wanted to save for a benz c300 how soon can I afford it based on what you know about me?",
		response:
			"A fairly used 2018–2020 Benz C-300 currently goes for about ₦20M to ₦30M in Nigeria, depending on condition and mileage. Given your current spending of ₦303,000 this month, and ₦211,000 of that on transport, how much of that ₦20M to ₦30M do you realistically want to save each month?",
	},
	{
		id: "02",
		ask: "How can I make more money?",
		response:
			"It's a tough cycle when transport is eating 74% of your spend before the month is even half over. Since you're feeling the pinch, we should look at where those transport costs are actually coming from — do you want to see which days you hit the highest spending so we can spot the patterns?",
	},
];

export function AiAdvisorSection() {
	return (
		<section
			id="conversations"
			className="relative overflow-hidden bg-forest-900 px-[clamp(1.25rem,4vw,3.25rem)] py-[clamp(5rem,10vw,9rem)] dark:bg-surface"
		>
			{/* Subtle texture */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 bg-landing-grain opacity-60"
			/>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0"
				style={{
					background:
						"radial-gradient(ellipse 70% 60% at 80% 20%, rgba(245,200,66,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 90%, rgba(45,97,71,0.4) 0%, transparent 60%)",
				}}
			/>

			<div className="relative mx-auto max-w-container">
				{/* Header */}
				<Reveal>
					<p className="mb-5 flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.16em] text-gold-500/70 uppercase">
						<span className="h-px w-7 shrink-0 bg-gold-500/40" />
						Real conversations · unedited
					</p>
					<h2 className="max-w-2xl font-serif text-[clamp(2.125rem,3.5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.025em] text-offwhite">
						It knows your money.{" "}
						<span className="italic text-gold-400">Ask it anything.</span>
					</h2>
					<p className="mt-5 max-w-lg text-base font-light leading-relaxed text-foreground-muted">
						Abakus doesn't give generic advice. Every answer is grounded in your
						actual data — your spending, your patterns, your reality.
					</p>
				</Reveal>

				{/* Conversation cards */}
				<div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16">
					{conversations.map((c, i) => (
						<Reveal key={c.id}>
							<ConversationCard {...c} />
						</Reveal>
					))}
				</div>

				{/* "IT KNOWS." callout */}
				<Reveal>
					<div className="mt-16 flex flex-col items-start gap-6 border-t border-gold-500/15 pt-12 sm:flex-row sm:items-center sm:justify-between">
						<p className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light italic leading-none tracking-[-0.02em] text-offwhite/90">
							IT KNOWS.
						</p>
						<a
							href={WHATSAPP_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex shrink-0 items-center gap-2.5 rounded-sm bg-gold-500 px-7 py-3.5 text-[15px] font-bold text-forest-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffd84a] hover:shadow-[0_16px_40px_rgba(245,200,66,0.3)] sm:px-9 sm:py-[18px]"
						>
							<SendIcon size={18} className="shrink-0" />
							Try it on WhatsApp
						</a>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

function ConversationCard({
	id,
	ask,
	response,
}: {
	id: string;
	ask: string;
	response: string;
}) {
	return (
		<article className="relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-forest-800/60 backdrop-blur-sm">
			{/* Top bar */}
			<div className="flex items-center justify-between border-b border-white/8 px-6 py-3">
				<span className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold-500/60">
					Real conversation
				</span>
				<span className="font-mono text-[9px] text-white/20">№ {id} · unedited</span>
			</div>

			<div className="flex flex-1 flex-col gap-5 p-6">
				{/* The Ask */}
				<div className="flex gap-4">
					<div className="mt-1 h-full w-px shrink-0 self-stretch bg-gold-500/50" />
					<div>
						<p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-500/60">
							The ask
						</p>
						<blockquote className="font-serif text-[1.125rem] font-normal italic leading-[1.45] text-offwhite/90">
							&ldquo;{ask}&rdquo;
						</blockquote>
					</div>
				</div>

				{/* Response */}
				<p className="text-[13.5px] font-light leading-[1.75] text-foreground-muted">
					{response}
				</p>
			</div>

			{/* Bottom rule */}
			<div className="border-t border-white/6 px-6 py-3">
				<p className="text-[9px] font-medium tracking-wider text-white/15 uppercase">
					try it · just whatsapp
				</p>
			</div>
		</article>
	);
}
