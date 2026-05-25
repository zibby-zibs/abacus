import { cn } from "@/lib/utils";

/**
 * Decorative 3D-ish floating shapes for hero backdrop.
 * Pure CSS — radial gradients + drop shadow give a sphere/torus illusion.
 */
export function FloatingShapes({ className }: { className?: string }) {
	return (
		<div
			aria-hidden
			className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
		>
			{/* gold orb */}
			<div
				className="absolute -top-10 right-[8%] h-44 w-44 rounded-full opacity-90 lb-float lb-float-a"
				style={{
					background:
						"radial-gradient(circle at 32% 28%, #fff5c2 0%, #f5c842 32%, #a8831f 70%, #523c00 100%)",
					boxShadow:
						"0 30px 60px -10px rgba(245,200,66,0.45), inset -8px -10px 24px rgba(0,0,0,0.45), inset 6px 8px 18px rgba(255,255,255,0.35)",
				}}
			/>
			{/* emerald orb */}
			<div
				className="absolute top-[42%] left-[6%] h-28 w-28 rounded-full opacity-90 lb-float lb-float-b"
				style={{
					background:
						"radial-gradient(circle at 28% 28%, #b8f5d3 0%, #3d7a5a 40%, #0d1e17 100%)",
					boxShadow:
						"0 24px 48px -8px rgba(45,97,71,0.5), inset -6px -8px 18px rgba(0,0,0,0.5), inset 4px 6px 14px rgba(255,255,255,0.25)",
				}}
			/>
			{/* magenta torus */}
			<div
				className="absolute top-[18%] left-[38%] h-20 w-20 rounded-full opacity-80 lb-float lb-float-c"
				style={{
					background:
						"conic-gradient(from 220deg, #e879f9, #c026d3, #7e22ce, #e879f9)",
					boxShadow:
						"0 16px 40px rgba(192,38,211,0.5), inset 0 0 14px rgba(0,0,0,0.5)",
					maskImage:
						"radial-gradient(circle, transparent 38%, black 41%, black 100%)",
					WebkitMaskImage:
						"radial-gradient(circle, transparent 38%, black 41%, black 100%)",
				}}
			/>
			{/* cyan diamond */}
			<div
				className="absolute bottom-[18%] right-[18%] h-16 w-16 rotate-45 opacity-90 lb-float lb-float-d"
				style={{
					background:
						"linear-gradient(135deg, #cffafe 0%, #67e8f9 30%, #0891b2 70%, #083344 100%)",
					boxShadow:
						"0 18px 36px rgba(34,211,238,0.45), inset 4px 4px 10px rgba(255,255,255,0.4), inset -4px -4px 10px rgba(0,0,0,0.5)",
					borderRadius: "8px",
				}}
			/>
			{/* tiny dots / sparkles */}
			<div className="absolute top-[20%] right-[28%] h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_12px_4px_rgba(255,255,255,0.6)] lb-twinkle" />
			<div className="absolute top-[60%] right-[42%] h-1 w-1 rounded-full bg-gold-300 shadow-[0_0_10px_3px_rgba(245,200,66,0.6)] lb-twinkle [animation-delay:.7s]" />
			<div className="absolute bottom-[24%] left-[28%] h-1.5 w-1.5 rounded-full bg-fuchsia-300 shadow-[0_0_10px_3px_rgba(232,121,249,0.6)] lb-twinkle [animation-delay:1.4s]" />
			<div className="absolute top-[8%] left-[20%] h-1 w-1 rounded-full bg-cyan-200 shadow-[0_0_8px_2px_rgba(103,232,249,0.6)] lb-twinkle [animation-delay:.3s]" />
		</div>
	);
}
