import * as React from "react";

import { cn } from "@/lib/utils";

function Card({
	className,
	size = "default",
	variant = "default",
	...props
}: React.ComponentProps<"div"> & {
	size?: "default" | "sm";
	variant?: "default" | "accent";
}) {
	return (
		<div
			data-slot="card"
			data-size={size}
			data-variant={variant}
			className={cn(
				"group/card relative flex cursor-default flex-col overflow-hidden rounded-xl border text-card-foreground shadow-none transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
				"border-neutral-300/80 bg-white text-ink",
				"motion-safe:hover:-translate-y-1 motion-safe:hover:border-gold-600/25 motion-safe:hover:shadow-[0_16px_40px_rgba(15,26,20,0.1)]",
				"dark:border-white/[0.05] dark:bg-card dark:text-foreground",
				"dark:motion-safe:hover:border-gold-500/20 dark:motion-safe:hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]",
				"before:pointer-events-none before:absolute before:left-0 before:top-[20%] before:bottom-[20%] before:w-0.5 before:rounded-sm before:bg-gradient-to-b before:from-transparent before:via-gold-500 before:to-transparent before:opacity-0 before:transition-[opacity,transform] before:duration-300 before:ease-[cubic-bezier(0.22,1,0.36,1)] before:scale-y-[0.4] motion-safe:hover:before:opacity-100 motion-safe:hover:before:scale-y-100",
				"after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:opacity-0 after:transition-opacity after:duration-300 motion-safe:hover:after:opacity-100",
				"after:bg-[radial-gradient(ellipse_85%_85%_at_20%_50%,rgba(245,200,66,0.07)_0%,transparent_65%)]",
				"dark:after:bg-[radial-gradient(ellipse_85%_85%_at_20%_50%,rgba(245,200,66,0.04)_0%,transparent_65%)]",
				variant === "accent" &&
					"border-gold-600/20 bg-gold-100/50 dark:border-gold-500/15 dark:bg-gold-500/[0.06]",
				size === "default" && "gap-3 p-6",
				size === "sm" && "gap-2.5 p-5",
				className,
			)}
			{...props}
		/>
	);
}

function CardKicker({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="card-kicker"
			className={cn(
				"font-mono text-[9px] font-medium tracking-[0.14em] text-gold-700/70 uppercase dark:text-gold-500/35",
				"group-data-[variant=accent]/card:text-gold-700 dark:group-data-[variant=accent]/card:text-gold-500/70",
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"relative z-[1] grid auto-rows-min items-start gap-1 px-0 group-data-[size=sm]/card:gap-0.5",
				"has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"font-serif",
				"relative z-[1] text-[22px] leading-snug font-light tracking-[-0.01em] text-forest-900 dark:text-offwhite",
				"group-data-[variant=accent]/card:text-gold-800 dark:group-data-[variant=accent]/card:text-gold-500",
				className,
			)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn(
				"relative z-[1] text-[13px] leading-[1.65] font-light text-neutral-600 dark:text-offwhite/40",
				className,
			)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"relative z-[1] col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn(
				"relative z-[1] px-0 group-data-[size=sm]/card:pt-0",
				className,
			)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"relative z-[1] flex items-center px-0 [.border-t]:mt-1 [.border-t]:border-white/10 [.border-t]:pt-4 dark:[.border-t]:border-white/10",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardKicker,
	CardTitle,
};
