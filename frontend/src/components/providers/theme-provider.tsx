"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  attribute?: "class";
  children: ReactNode;
  defaultTheme?: Theme;
  disableTransitionOnChange?: boolean;
  enableSystem?: boolean;
  storageKey?: string;
  themes?: Theme[];
};

type ThemeContextValue = {
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: Theme;
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  attribute = "class",
  children,
  defaultTheme = "light",
  disableTransitionOnChange = false,
  enableSystem = false,
  storageKey = "theme",
  themes = ["light", "dark"],
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const nextSystemTheme = getSystemTheme();
    const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
    const nextTheme =
      storedTheme && themes.includes(storedTheme)
        ? storedTheme
        : enableSystem
          ? nextSystemTheme
          : defaultTheme;

    setSystemTheme(nextSystemTheme);
    setThemeState(nextTheme);
    setMounted(true);
  }, [defaultTheme, enableSystem, storageKey, themes]);

  useEffect(() => {
    if (!mounted || attribute !== "class") {
      return;
    }

    const root = document.documentElement;
    const previousTransition = root.style.transition;

    if (disableTransitionOnChange) {
      root.style.transition = "none";
    }

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;

    window.localStorage.setItem(storageKey, theme);

    if (disableTransitionOnChange) {
      window.requestAnimationFrame(() => {
        root.style.transition = previousTransition;
      });
    }
  }, [attribute, disableTransitionOnChange, mounted, storageKey, theme]);

  useEffect(() => {
    if (!enableSystem) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const nextSystemTheme = mediaQuery.matches ? "dark" : "light";
      setSystemTheme(nextSystemTheme);

      const storedTheme = window.localStorage.getItem(storageKey) as Theme | null;
      if (!storedTheme) {
        setThemeState(nextSystemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [enableSystem, storageKey]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      resolvedTheme: theme,
      setTheme: setThemeState,
      systemTheme,
      theme,
    }),
    [systemTheme, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }

  return context;
}
