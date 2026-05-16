"use client";

import { LayoutDashboard, LogOut, Mail, Newspaper, PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { ReactNode } from "react";

import { firebaseAuth } from "@/lib/firebase";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blogs", href: "/admin/blogs", icon: Newspaper },
  { label: "Projects", href: "/admin/projects", icon: PanelsTopLeft },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    if (firebaseAuth) {
      await signOut(firebaseAuth);
    }
    router.replace("/admin/login");
  };

  return (
    <main className="min-h-screen bg-[color:var(--background)]">
      <div className="mx-auto grid min-h-screen w-11/12 max-w-[1440px] gap-6 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-4">
          <div className="px-3 py-4">
            <p className="text-[22px] font-semibold text-[color:var(--foreground)]">
              Shei IT Admin
            </p>
            <p className="mt-1 text-[13px] text-[color:var(--muted-foreground)]">
              Content, projects, and leads
            </p>
          </div>

          <nav className="mt-4 space-y-2">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[14px] font-medium ${
                    active
                      ? "bg-[color:var(--primary)] text-white"
                      : "text-[color:var(--muted-foreground)] hover:bg-[color:var(--card-solid)] hover:text-[color:var(--foreground)]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 flex w-full items-center gap-3 rounded-xl border border-[color:var(--stat-border)] px-3 py-3 text-left text-[14px] font-medium text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>

        <section className="min-w-0 rounded-2xl border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-5 lg:p-7">
          {children}
        </section>
      </div>
    </main>
  );
}
