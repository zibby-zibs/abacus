import { LandingFooterLogo } from "@/components/landing/LandingFooterLogo";

export function LandingFooter() {
	return (
		<footer className="flex flex-wrap items-center justify-between gap-5 border-t border-neutral-300/80 px-[clamp(1.25rem,4vw,3.25rem)] py-10 dark:border-white/10">
			<div className="flex items-center gap-2.5">
				<LandingFooterLogo />
			</div>
			<div className="flex gap-7">
				<a
					href="#"
					className="text-[13px] text-neutral-500 transition-colors hover:text-forest-900 dark:text-foreground-muted/40 dark:hover:text-foreground-muted"
				>
					Privacy
				</a>
				<a
					href="#"
					className="text-[13px] text-neutral-500 transition-colors hover:text-forest-900 dark:text-foreground-muted/40 dark:hover:text-foreground-muted"
				>
					Terms
				</a>
				<a
					href="#"
					className="text-[13px] text-neutral-500 transition-colors hover:text-forest-900 dark:text-foreground-muted/40 dark:hover:text-foreground-muted"
				>
					Contact
				</a>
			</div>
			<span className="text-xs text-neutral-500 dark:text-foreground-muted/30">
				© {new Date().getFullYear()} Abacus. All rights reserved.
			</span>
		</footer>
	);
}
