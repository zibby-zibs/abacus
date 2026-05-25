import { cn } from "@/lib/utils";
import { BADGES, YOU, type Badge } from "./mockData";

const RARITY_GRAD: Record<Badge["rarity"], string> = {
	Common: "from-slate-600 to-slate-400",
	Rare: "from-cyan-500 to-sky-400",
	Epic: "from-fuchsia-500 to-violet-500",
	Legendary: "from-gold-500 via-orange-400 to-rose-400",
};

const RARITY_TEXT: Record<Badge["rarity"], string> = {
	Common: "text-slate-300",
	Rare: "text-cyan-300",
	Epic: "text-fuchsia-300",
	Legendary: "text-gold-300",
};

export function BadgesShowcase() {
	const owned = new Set(YOU.badges);

	return (
		<section className="rounded-2xl border border-white/8 bg-surface/60 p-5 backdrop-blur sm:p-6">
			<header className="mb-5 flex items-end justify-between">
				<div>
					<h3 className="font-serif text-2xl font-semibold text-offwhite">
						Trophy Case
					</h3>
					<p className="mt-0.5 text-[11px] font-medium text-foreground-muted">
						Collect them all. Show them off.
					</p>
				</div>
				<span className="font-mono text-sm font-bold text-offwhite">
					{owned.size}
					<span className="text-foreground-muted">/{BADGES.length}</span>
				</span>
			</header>

			<ul className="grid grid-cols-3 gap-3 sm:grid-cols-3">
				{BADGES.map((b) => {
					const have = owned.has(b.id);
					return (
						<li
							key={b.id}
							className={cn(
								"group relative overflow-hidden rounded-xl border p-3 text-center transition-transform hover:-translate-y-0.5",
								have
									? "border-white/12 bg-white/[0.04]"
									: "border-white/8 bg-background/40 opacity-55 grayscale",
							)}
						>
							{/* halo */}
							<div
								aria-hidden
								className={cn(
									"pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity group-hover:opacity-100",
									"bg-gradient-to-br",
									RARITY_GRAD[b.rarity],
									"blur-2xl",
								)}
								style={{ opacity: have ? 0.18 : 0 }}
							/>
							<div className="relative z-10">
								<div
									className={cn(
										"mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-3xl shadow-inner",
										RARITY_GRAD[b.rarity],
									)}
								>
									{b.emoji}
								</div>
								<p className="mt-2 truncate text-[12px] font-bold text-offwhite">
									{b.name}
								</p>
								<p
									className={cn(
										"text-[9px] font-bold uppercase tracking-wider",
										RARITY_TEXT[b.rarity],
									)}
								>
									{b.rarity}
								</p>
								<p className="mt-0.5 font-mono text-[9px] text-foreground-muted">
									{b.holders.toLocaleString()} hold
								</p>
							</div>
							{!have && (
								<span className="absolute right-1.5 top-1.5 rounded bg-black/40 px-1 text-[8px] font-bold uppercase tracking-wider text-foreground-muted">
									Locked
								</span>
							)}
						</li>
					);
				})}
			</ul>
		</section>
	);
}
