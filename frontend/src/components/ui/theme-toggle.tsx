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
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-white/20 bg-[color:var(--toggle-shell)] p-1 shadow-[var(--shadow-soft)] backdrop-blur-2xl dark:border-white/14",
      )}
      role="group"
      aria-label="Theme switcher"
    >
      <button
        type="button"
        aria-label="Activate light theme"
        aria-pressed={!isDark}
        onClick={() => setTheme("light")}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full transition-all",
          !isDark
            ? "bg-[color:var(--toggle-thumb)] text-[color:var(--foreground)] shadow-[0_8px_20px_rgba(15,23,42,0.14)]"
            : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
        )}
      >
        <SunMedium className="h-3.5 w-3.5" strokeWidth={2} />
      </button>

      <button
        type="button"
        aria-label="Activate dark theme"
        aria-pressed={isDark}
        onClick={() => setTheme("dark")}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full transition-all",
          isDark
            ? "bg-[color:var(--toggle-thumb)] text-[color:var(--foreground)] shadow-[0_8px_20px_rgba(0,0,0,0.28)]"
            : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
        )}
      >
        <MoonStar className="h-3.5 w-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
