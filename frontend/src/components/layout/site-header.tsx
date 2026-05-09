"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Logo } from "../ui/logo";
import { ThemeToggle } from "../ui/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[rgba(255,255,255,0.15)] dark:bg-[rgba(0,0,0,0.15)]">
      <div className="mx-auto flex w-11/12 max-w-[1440px] items-center justify-between gap-4 py-3.5 backdrop-blur-[1.25px] lg:py-4">
        <a href="#" className="shrink-0">
          <Logo
            priority
            iconClassName="h-12 w-12"
            textClassName="text-[22px]"
          />
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/40 p-0.5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur-[50px] dark:border-white/8 dark:bg-white/[0.03] md:flex">
          {siteConfig.navLinks.map((link) => {
            const isActive = link.href === pathname;

            return (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "relative rounded-full px-5 py-1.5 text-[12px] font-medium tracking-tight transition-colors",
                  isActive
                    ? "bg-[color:var(--nav-active)] text-[color:var(--foreground)] shadow-[0_6px_16px_rgba(108,99,255,0.08)]"
                    : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="/#contact"
            className="hidden items-center rounded-full bg-[color:var(--talk-bg)] px-5 py-2 text-[12px] font-semibold text-[color:var(--talk-fg)] shadow-[0_12px_24px_rgba(15,23,42,0.1)] transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Let&apos;s Talk
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
