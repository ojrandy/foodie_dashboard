"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export type ThemeVariant = "indigo" | "orange" | "emerald" | "crimson";

interface ThemeVariantContextValue {
  variant: ThemeVariant;
  setVariant: (variant: ThemeVariant) => void;
  variants: { id: ThemeVariant; label: string; description: string }[];
}

const STORAGE_KEY = "foodops-variant";

const VARIANTS = [
  { id: "indigo" as const, label: "Indigo Tech", description: "Futuristic intelligence" },
  { id: "orange" as const, label: "Food Tech", description: "Energetic operational" },
  { id: "emerald" as const, label: "Emerald Ops", description: "Stable logistics" },
  { id: "crimson" as const, label: "Executive", description: "Premium high-end" },
];

const ThemeVariantContext = createContext<ThemeVariantContextValue | null>(null);

export function ThemeVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<ThemeVariant>("indigo");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeVariant | null;
    if (stored && VARIANTS.some((v) => v.id === stored)) {
      setVariantState(stored);
    }
  }, []);

  const setVariant = useCallback((newVariant: ThemeVariant) => {
    setVariantState(newVariant);
    localStorage.setItem(STORAGE_KEY, newVariant);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("theme-indigo", "theme-orange", "theme-emerald", "theme-crimson");
    root.classList.add(`theme-${variant}`);
  }, [variant, mounted]);

  return (
    <ThemeVariantContext.Provider value={{ variant, setVariant, variants: VARIANTS }}>
      {children}
    </ThemeVariantContext.Provider>
  );
}

export function useThemeVariant() {
  const context = useContext(ThemeVariantContext);
  if (!context) throw new Error("useThemeVariant must be used within ThemeVariantProvider");
  return context;
}
