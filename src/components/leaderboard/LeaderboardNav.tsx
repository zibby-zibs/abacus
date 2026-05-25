import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, FireIcon } from "@hugeicons/core-free-icons";
import { WHATSAPP_URL } from "@/components/landing/constants";
import { YOU } from "./mockData";

export function LeaderboardNav() {
	return (
		<nav className="sticky top-0 z-40 flex items-center justify-between border-b border-white/8 bg-background/70 px-[clamp(1rem,4vw,3.25rem)] py-3 backdrop-blur-xl">
			<div className="flex items-center gap-3">
				<Link
					href="/"
					className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold text-foreground-muted transition-colors hover:text-offwhite"
				>
					<HugeiconsIcon icon={ArrowLeft01Icon} size={13} strokeWidth={2.5} />
					Home
				</Link>
				<div className="hidden h-5 w-px bg-white/10 sm:block" />
				<Link
					href="/"
					className="hidden items-center gap-2 text-offwhite sm:flex"
				>
					<Image
						src="/logo.svg"
						alt="Abakus"
						width={120}
						height={28}
						className="h-7 w-auto object-contain"
					/>
					<span className="rounded-md bg-gold-500/15 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-gold-300">
						Arena
					</span>
				</Link>
			</div>
			<div className="flex items-center gap-2">
				{/* <div className="hidden items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-[11px] font-bold text-orange-300 sm:inline-flex">
					<HugeiconsIcon
						icon={FireIcon}
						size={12}
						strokeWidth={2.5}
						className="text-orange-400"
					/>
					{YOU.streak}-day streak
				</div> */}
				<a
					href={WHATSAPP_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="rounded-full bg-gold-500 px-4 py-2 text-[11px] font-bold text-forest-900 transition-colors hover:bg-gold-400"
				>
					Earn XP →
				</a>
			</div>
		</nav>
	);
}
