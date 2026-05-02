"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "abacus-landing-theme";

export type LandingThemeMode = "system" | "light" | "dark";

type Ctx = {
  mode: LandingThemeMode;
  resolved: "light" | "dark";
  setMode: (m: LandingThemeMode) => void;
};

const LandingThemeContext = createContext<Ctx | null>(null);

function readStored(): LandingThemeMode {
  if (typeof window === "undefined") return "system";
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "light" || v === "dark" || v === "system") return v;
  return "system";
}

/** Wraps landing so `dark:*` Tailwind utilities apply when resolved theme is dark. */
export function LandingThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<LandingThemeMode>("system");
  const [systemPrefersLight, setSystemPrefersLight] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate persisted landing theme (client-only)
    setModeState(readStored());
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const apply = () => setSystemPrefersLight(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const resolved = useMemo<"light" | "dark">(() => {
    if (mode === "light") return "light";
    if (mode === "dark") return "dark";
    return systemPrefersLight ? "light" : "dark";
  }, [mode, systemPrefersLight]);

  const setMode = useCallback((m: LandingThemeMode) => {
    setModeState(m);
    if (m === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, m);
  }, []);

  const value = useMemo(
    () => ({ mode, resolved, setMode }),
    [mode, resolved, setMode]
  );

  return (
    <LandingThemeContext.Provider value={value}>
      <div className={resolved === "dark" ? "dark" : undefined}>{children}</div>
    </LandingThemeContext.Provider>
  );
}

export function useLandingTheme() {
  const ctx = useContext(LandingThemeContext);
  if (!ctx)
    throw new Error("useLandingTheme must be used within LandingThemeProvider");
  return ctx;
}
