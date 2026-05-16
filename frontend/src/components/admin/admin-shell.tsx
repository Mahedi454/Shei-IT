"use client";

import {
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Newspaper,
  PanelsTopLeft,
  ShieldCheck,
} from "lucide-react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";

import { useAdminFeedback } from "@/components/admin/admin-feedback-provider";
import { firebaseAuth } from "@/lib/firebase";
import { cn } from "@/lib/utils";

import { Logo } from "../ui/logo";
import { ThemeToggle } from "../ui/theme-toggle";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blogs", href: "/admin/blogs", icon: Newspaper },
  { label: "Projects", href: "/admin/projects", icon: PanelsTopLeft },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useAdminFeedback();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const currentLabel = useMemo(
    () => adminLinks.find((item) => item.href === pathname)?.label ?? "Admin",
    [pathname],
  );

  const handleLogout = async () => {
    if (firebaseAuth) {
      await signOut(firebaseAuth);
    }

    showToast({
      title: "Signed out",
      description: "Your admin session has been closed safely.",
      tone: "success",
    });

    router.replace("/admin/login");
  };

  return (
    <main className="min-h-screen bg-[color:var(--background)]">
      <div className="mx-auto min-h-screen w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="sticky top-0 z-40 border-b border-[color:var(--stat-border)] bg-[color:var(--background)]/82 backdrop-blur-2xl">
          <div className="flex min-h-[76px] items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileNavOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--stat-border)] text-[color:var(--foreground)] lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              <Link href="/admin" className="flex items-center gap-3">
                <Logo iconClassName="h-10 w-10" textClassName="text-[20px]" />
              </Link>
            </div>

            <div className="hidden min-w-0 flex-1 items-center justify-center px-6 lg:flex">
              <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] px-5 py-2.5 text-[13px] font-medium text-[color:var(--muted-foreground)]">
                <ShieldCheck className="h-4 w-4 text-[color:var(--primary)]" />
                {currentLabel} workspace
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--talk-bg)] px-4 py-2.5 text-[13px] font-semibold text-[color:var(--talk-fg)]"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid min-h-[calc(100vh-76px)] gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside
            className={cn(
              "border-b border-[color:var(--stat-border)] py-6 lg:border-b-0 lg:border-r lg:py-10 lg:pr-8",
              mobileNavOpen ? "block" : "hidden lg:block",
            )}
          >
            <div className="pb-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[color:var(--primary)]">
                Admin Panel
              </p>
              <p className="mt-3 max-w-[18rem] text-[15px] leading-7 text-[color:var(--muted-foreground)]">
                Manage live website content, incoming leads, and published work.
              </p>
            </div>

            <nav className="space-y-1.5 border-t border-[color:var(--stat-border)] pt-5">
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-[1rem] px-3 py-3 text-[14px] font-medium transition",
                      active
                        ? "bg-[color:var(--button-secondary-icon)] text-[color:var(--foreground)]"
                        : "text-[color:var(--muted-foreground)] hover:bg-[color:var(--stat-bg)] hover:text-[color:var(--foreground)]",
                    )}
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--stat-bg)]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          <section className="min-w-0 py-6 lg:py-10 lg:pl-2">{children}</section>
        </div>
      </div>
    </main>
  );
}
