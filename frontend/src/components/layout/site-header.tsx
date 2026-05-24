"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { Logo } from "../ui/logo";
import { ThemeToggle } from "../ui/theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(255,255,255,0.22)] dark:bg-[rgba(0,0,0,0.24)]">
      <div className="mx-auto w-11/12 max-w-[1440px] py-3 backdrop-blur-[1.25px] lg:py-3.5">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="shrink-0" onClick={() => setMobileOpen(false)}>
            <Logo
              priority
              iconClassName="h-12 w-12"
              textClassName="text-[22px]"
            />
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/40 p-0.5 shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur-[50px] dark:border-white/8 dark:bg-white/[0.03] xl:flex">
            {siteConfig.navLinks.map((link) => {
              const isActive = link.href === pathname;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-5 py-1.25 text-[12px] font-medium tracking-tight transition-colors",
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
              href="/contact#contact-form"
              className="hidden items-center rounded-full bg-[color:var(--talk-bg)] px-5 py-1.75 text-[12px] font-semibold text-[color:var(--talk-fg)] shadow-[0_12px_24px_rgba(15,23,42,0.1)] transition-transform hover:-translate-y-0.5 xl:inline-flex"
            >
              Let&apos;s Talk
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--stat-border)] bg-[color:var(--button-secondary)] text-[color:var(--foreground)] shadow-[0_10px_24px_rgba(15,23,42,0.06)] xl:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <nav className="mt-3 grid gap-2 rounded-[1.1rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-3 shadow-[var(--shadow-soft)] backdrop-blur-xl xl:hidden">
            {siteConfig.navLinks.map((link) => {
              const isActive = link.href === pathname;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-[0.85rem] px-4 py-3 text-[13px] font-semibold",
                    isActive
                      ? "bg-[color:var(--primary)] text-white"
                      : "text-[color:var(--muted-foreground)] hover:bg-[color:var(--button-secondary-icon)] hover:text-[color:var(--foreground)]",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="/contact#contact-form"
              onClick={() => setMobileOpen(false)}
              className="rounded-[0.85rem] bg-[color:var(--talk-bg)] px-4 py-3 text-[13px] font-semibold text-[color:var(--talk-fg)]"
            >
              Let&apos;s Talk
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
