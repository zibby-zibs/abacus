import type { CSSProperties, ReactNode } from "react";
import {
  BEAD_COLS,
  BEAD_ROWS,
  beadOpacity,
  beadScaleX,
} from "@/components/landing/bead-art";

export function HeroBeadGrid() {
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
        />
      );
    }
  }

  return (
    <div
      className="pointer-events-none absolute top-0 right-0 flex h-full w-[55%] items-center justify-center opacity-[0.18]"
      aria-hidden
    >
      <div className="grid -rotate-6 scale-110 grid-cols-12 gap-3 p-10">{cells}</div>
    </div>
  );
}
