"use client";

import { useLandingTheme } from "@/components/landing/LandingThemeProvider";
import Image from "next/image";

/** Wordmark assets: dark marks on light UI vs treatment for dark UI. */
const logoSrc = {
	light: "/logo-dark.svg",
	dark: "/logo.svg",
} as const;

/**
 * Footer logo follows **resolved** appearance (`light` | `dark`), not the raw
 * toggle value — so with theme “Auto”, the logo still matches the actual UI.
 * Use `mode` from the same hook if you need the stored preference (`light` |
 * `dark` | `system`).
 */
export function LandingFooterLogo() {
	const { resolved } = useLandingTheme();
	const src = logoSrc[resolved];

	return (
		<Image
			src={src}
			alt="Abacus"
			width={150}
			height={34}
			className="h-[34px] w-[150px] object-contain object-left"
			sizes="150px"
		/>
	);
}
