import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
	BEAD_COLS,
	BEAD_ROWS,
	beadOpacity,
	beadScaleX,
} from "@/components/landing/bead-art";

export type HeroBeadGridVariant = "section" | "column";

type Props = {
	variant?: HeroBeadGridVariant;
};

export function HeroBeadGrid({ variant = "section" }: Props) {
	const cells: ReactNode[] = [];
	for (let r = 0; r < BEAD_ROWS; r++) {
		for (let c = 0; c < BEAD_COLS; c++) {
			const o = beadOpacity(r, c);
			const sx = beadScaleX(r, c);
			cells.push(
				<div
					key={`${r}-${c}`}
					className="h-3.5 w-[22px] rounded-md bg-gold-500 dark:bg-gold-500"
					style={
						{
							opacity: o,
							transform: `scaleX(${sx})`,
						} as CSSProperties
					}
				/>,
			);
		}
	}

	const wrapClass =
		variant === "section"
			? cn(
					"pointer-events-none absolute top-0 right-0 z-0 hidden h-full w-[42%] items-center justify-center opacity-[0.1] sm:flex sm:w-[48%] md:opacity-[0.14] lg:hidden lg:w-[55%]",
				)
			: cn(
					"pointer-events-none absolute inset-0 z-0 hidden items-center justify-center overflow-hidden opacity-[0.14] lg:flex lg:opacity-[0.18]",
				);

	const innerClass =
		variant === "section"
			? "grid -rotate-6 scale-105 grid-cols-12 gap-2 p-6 sm:scale-110 sm:gap-3 sm:p-10"
			: "grid -rotate-6 scale-90 grid-cols-12 gap-2 p-4 sm:gap-3 sm:p-6";

	return (
		<div className={wrapClass} aria-hidden>
			<div className={innerClass}>{cells}</div>
		</div>
	);
}
