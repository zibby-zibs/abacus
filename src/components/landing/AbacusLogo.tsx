import { cn } from "@/lib/utils";

const serif = "font-[family-name:var(--font-dm-serif-display),ui-serif,Georgia,serif]";

type LogoVariant = "nav" | "footer";

export function AbacusLogoInner({ variant }: { variant: LogoVariant }) {
  const word =
    variant === "nav"
      ? cn(serif, "text-xl tracking-tight text-forest-900 dark:text-offwhite")
      : cn(
          serif,
          "text-[17px] text-neutral-600 dark:text-foreground-muted"
        );

  const beadOn = "h-[5px] w-[7px] rounded-sm bg-gold-500";
  const beadOff =
    "h-[5px] w-[7px] rounded-sm bg-gold-500/25 dark:bg-gold-500/20";

  return (
    <>
      <div className="flex gap-[3.5px]">
        <div className="flex flex-col gap-0.5">
          <div className={beadOn} />
          <div className={beadOff} />
          <div className={beadOff} />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className={beadOff} />
          <div className={beadOn} />
          <div className={beadOff} />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className={beadOff} />
          <div className={beadOff} />
          <div className={beadOn} />
        </div>
      </div>
      <span className={word}>Abacus</span>
    </>
  );
}
