import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * Uses DiceBear (free, no-auth) for varied gamer-style avatars.
 * `adventurer` style fits the playful tone.
 */
function avatarUrl(seed: string) {
	const params = new URLSearchParams({
		seed,
		backgroundType: "gradientLinear",
		backgroundColor: "1a3a2e,2d6147,f5c842,c9a02e,7e22ce,0891b2",
	});
	return `https://api.dicebear.com/7.x/adventurer/svg?${params.toString()}`;
}

export function Avatar({
	seed,
	size = 48,
	ringClass,
	className,
}: {
	seed: string;
	size?: number;
	ringClass?: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative shrink-0 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-surface",
				ringClass ?? "ring-white/15",
				className,
			)}
			style={{ width: size, height: size }}
		>
			<Image
				src={avatarUrl(seed)}
				alt={`${seed} avatar`}
				width={size}
				height={size}
				unoptimized
				className="h-full w-full"
			/>
		</div>
	);
}
