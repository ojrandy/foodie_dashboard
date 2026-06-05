"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface ThemeContextValue {
  theme: string | undefined;
  setTheme: (t: string) => void;
  themes: string[];
  systemTheme: string | undefined;
  resolvedTheme: string | undefined;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: undefined,
  setTheme: () => {},
  themes: ["light", "dark", "system"],
  systemTheme: undefined,
  resolvedTheme: undefined,
});

const THEMES = ["light", "dark", "system"];

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getThemeClass(t: string): "dark" | "light" {
  if (t === "system") return getSystemTheme();
  return t as "dark" | "light";
}

export function SimpleThemeProvider({ children, defaultTheme = "system" }: { children: ReactNode; defaultTheme?: string }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<string>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return localStorage.getItem("theme") || defaultTheme;
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const setTheme = (t: string) => {
    if (!THEMES.includes(t)) return;
    setThemeState(t);
    localStorage.setItem("theme", t);
    const resolved = getThemeClass(t);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);
  };

  useEffect(() => {
    const resolved = getThemeClass(theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") {
        const resolved = getSystemTheme();
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(resolved);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const systemTheme = typeof window !== "undefined" ? getSystemTheme() : "dark";
  const resolvedTheme = getThemeClass(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES, systemTheme: mounted ? systemTheme : undefined, resolvedTheme: mounted ? resolvedTheme : undefined }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
