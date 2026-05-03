"use client";

import { WHATSAPP_URL } from "@/components/landing/constants";
import { cn } from "@/lib/utils";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useCallback, useEffect, useRef, useState } from "react";

const LS_KEY = "abacus-landing-gamified-onboarding";

type Gate = "pending" | "open" | "closed";

function persistDismiss() {
  try {
    localStorage.setItem(LS_KEY, "1");
  } catch {
    /* ignore */
  }
}

function reactionLine(food: boolean, transport: boolean): string {
  if (!food && !transport)
    return "Yeah — most of us are guessing. That's the whole point of Abacus.";
  if (food && transport)
    return "Okay okay, show-off. Still — want it logged without doing math in your head?";
  return "Same energy most of us have. One category nailed, the other… vibes.";
}

const DISMISS_MS = 220;

export function GamifiedOnboardingModal() {
  const [gate, setGate] = useState<Gate>("pending");
  const [dialogOpen, setDialogOpen] = useState(true);
  const [step, setStep] = useState(0);
  const [food, setFood] = useState<boolean | null>(null);
  const [transport, setTransport] = useState<boolean | null>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const dismissTimer = useRef<number | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(LS_KEY)) setGate("closed");
      else setGate("open");
    } catch {
      setGate("open");
    }
  }, []);

  const dismiss = useCallback(() => {
    persistDismiss();
    setDialogOpen(false);
    if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
    dismissTimer.current = window.setTimeout(() => {
      dismissTimer.current = null;
      setGate("closed");
    }, DISMISS_MS) as unknown as number;
  }, []);

  useEffect(
    () => () => {
      if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
    },
    [],
  );

  const goFood = useCallback((v: boolean) => {
    setFood(v);
    setStep(1);
  }, []);

  const goTransport = useCallback((v: boolean) => {
    setTransport(v);
    setStep(2);
  }, []);

  useEffect(() => {
    if (gate !== "open" || !dialogOpen) return;
    const t = window.setTimeout(() => yesRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [gate, dialogOpen, step]);

  useEffect(() => {
    if (gate !== "open" || !dialogOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "y" || e.key === "Y") {
        e.preventDefault();
        if (step === 0) goFood(true);
        else if (step === 1) goTransport(true);
      }
      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        if (step === 0) goFood(false);
        else if (step === 1) goTransport(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gate, dialogOpen, step, goFood, goTransport]);

  if (gate !== "open") return null;

  const foodKnow = food === true;
  const transportKnow = transport === true;

  return (
    <DialogPrimitive.Root
      open={dialogOpen}
      modal
      onOpenChange={(next) => {
        if (!next) dismiss();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[10050] bg-forest-900/40 backdrop-blur-[2px]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
        />
        <DialogPrimitive.Content
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          className={cn(
            "fixed top-1/2 left-1/2 z-[10051] w-[min(calc(100vw-1.5rem),22rem)] -translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border border-neutral-300/90 bg-offwhite p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] outline-none",
            "dark:border-white/10 dark:bg-card dark:shadow-[0_28px_90px_rgba(0,0,0,0.55)]",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "duration-200 ease-out",
          )}
        >
          <DialogPrimitive.Title className="sr-only">
            Quick check — do you know your spending?
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Two playful yes-or-no questions about food and transport spending,
            then a short pitch with a link to WhatsApp. You can skip anytime.
          </DialogPrimitive.Description>

          <button
            type="button"
            onClick={dismiss}
            className="absolute top-3 right-3 rounded-md px-2 py-1 text-[11px] font-medium text-neutral-500 underline-offset-2 hover:text-forest-900 hover:underline dark:text-foreground-muted dark:hover:text-offwhite"
          >
            I&apos;m not interested
          </button>

          <div className="mb-4 flex gap-1.5 pt-1" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-150",
                  step >= i ? "bg-gold-500" : "bg-neutral-200 dark:bg-white/15",
                )}
              />
            ))}
          </div>

          <div
            key={step}
            className="animate-in fade-in zoom-in-95 duration-150 ease-out"
          >
            {step === 0 ? (
              <>
                <p className="font-[family-name:var(--font-dm-serif-display),ui-serif,Georgia,serif] text-xl leading-snug font-normal tracking-[-0.02em] text-forest-900 dark:text-offwhite">
                  If I ask how much you spent on{" "}
                  <span className="text-gold-700 dark:text-gold-500">food</span>{" "}
                  last week — do you actually know?
                </p>
                <p className="mt-2 text-[12px] text-neutral-500 dark:text-foreground-muted/80">
                  Tap a box. Or press{" "}
                  <kbd className="rounded border border-neutral-300 px-1 font-mono text-[10px] dark:border-white/20">
                    Y
                  </kbd>{" "}
                  /{" "}
                  <kbd className="rounded border border-neutral-300 px-1 font-mono text-[10px] dark:border-white/20">
                    N
                  </kbd>
                  .
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    ref={yesRef}
                    type="button"
                    onClick={() => goFood(true)}
                    className={cn(
                      "rounded-xl border-2 border-forest-200 bg-white py-3.5 text-sm font-semibold text-forest-900",
                      "transition-transform hover:scale-[1.02] active:scale-[0.98]",
                      "dark:border-gold-500/30 dark:bg-forest-900/40 dark:text-offwhite",
                    )}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => goFood(false)}
                    className={cn(
                      "rounded-xl border-2 border-dashed border-neutral-300 bg-forest-50/80 py-3.5 text-sm font-semibold text-forest-800",
                      "transition-transform hover:scale-[1.02] active:scale-[0.98]",
                      "dark:border-white/20 dark:bg-forest-900/20 dark:text-offwhite/90",
                    )}
                  >
                    Nope
                  </button>
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <p className="font-[family-name:var(--font-dm-serif-display),ui-serif,Georgia,serif] text-xl leading-snug font-normal tracking-[-0.02em] text-forest-900 dark:text-offwhite">
                  Okay, fine.{" "}
                  <span className="text-gold-700 dark:text-gold-500">
                    Transport?
                  </span>{" "}
                  Do youuu know?
                </p>
                <p className="mt-2 text-[12px] italic text-neutral-600 dark:text-foreground-muted/85">
                  Be honest. We&apos;re friends here.
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    ref={yesRef}
                    type="button"
                    onClick={() => goTransport(true)}
                    className={cn(
                      "rounded-xl border-2 border-forest-200 bg-white py-3.5 text-sm font-semibold text-forest-900",
                      "transition-transform hover:scale-[1.02] active:scale-[0.98]",
                      "dark:border-gold-500/30 dark:bg-forest-900/40 dark:text-offwhite",
                    )}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => goTransport(false)}
                    className={cn(
                      "rounded-xl border-2 border-dashed border-neutral-300 bg-forest-50/80 py-3.5 text-sm font-semibold text-forest-800",
                      "transition-transform hover:scale-[1.02] active:scale-[0.98]",
                      "dark:border-white/20 dark:bg-forest-900/20 dark:text-offwhite/90",
                    )}
                  >
                    Nope
                  </button>
                </div>
              </>
            ) : null}

            {step === 2 && food !== null && transport !== null ? (
              <>
                <p
                  className="font-[family-name:var(--font-dm-serif-display),ui-serif,Georgia,serif] text-[1.125rem] leading-snug font-normal tracking-[-0.02em] text-forest-900 dark:text-offwhite"
                  aria-live="polite"
                >
                  {reactionLine(foodKnow, transportKnow)}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-neutral-600 dark:text-foreground-muted/85">
                  Abacus lives in WhatsApp — you text what you spent, it remembers
                  categories, budgets, and debts. No spreadsheet cosplay.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={dismiss}
                    className="flex items-center justify-center rounded-xl bg-primary py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                  >
                    Say hi on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={dismiss}
                    className="rounded-xl border border-neutral-300/90 py-2.5 text-sm font-medium text-forest-800 transition-colors hover:bg-forest-50 dark:border-white/15 dark:text-offwhite dark:hover:bg-white/5"
                  >
                    Cool, let me browse
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
