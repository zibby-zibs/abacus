/** Deterministic “random” bead art — matches SSR + client (no hydration mismatch). */
export const BEAD_ROWS = 14;
export const BEAD_COLS = 12;

function pseudoNoise(r: number, c: number): number {
  return Math.sin(r * 12.9898 + c * 78.233) * 0.5 + 0.5;
}

export function beadOpacity(r: number, c: number): number {
  const rows = BEAD_ROWS;
  const cols = BEAD_COLS;
  const diag = (r + c) / (rows + cols);
  const o = 0.15 + diag * 0.6 + pseudoNoise(r, c) * 0.25;
  return Math.min(o, 1);
}

export function beadScaleX(r: number, c: number): number {
  return 0.6 + pseudoNoise(c + 3, r * 7) * 0.6;
}
