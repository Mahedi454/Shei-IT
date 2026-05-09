"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-8 w-[66px] items-center rounded-full border border-white/20 bg-[color:var(--toggle-shell)] p-1 shadow-[var(--shadow-soft)] backdrop-blur-2xl transition-colors dark:border-white/14",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
      )}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={cn(
          "absolute left-1 top-1 h-6 w-6 rounded-full border border-white/12 bg-[color:var(--toggle-thumb)] shadow-[0_8px_20px_rgba(15,23,42,0.16)] transition-transform duration-300 dark:shadow-[0_10px_24px_rgba(0,0,0,0.4)]",
          isDark ? "translate-x-[28px]" : "translate-x-0",
        )}
      />
      <span className="relative z-10 flex w-full items-center justify-between px-2.5 text-[color:var(--foreground)]">
        <SunMedium
          className={cn(
            "h-3 w-3 transition-opacity",
            isDark ? "opacity-55" : "opacity-100",
          )}
          strokeWidth={2}
        />
        <MoonStar
          className={cn(
            "h-3 w-3 transition-opacity",
            isDark ? "opacity-100" : "opacity-55",
          )}
          strokeWidth={2}
        />
      </span>
    </button>
  );
}
