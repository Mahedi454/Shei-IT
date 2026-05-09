import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

import { footerConfig } from "@/config/site";

import { Logo } from "../ui/logo";

const contactIconMap = {
  email: Mail,
  phone: Phone,
  location: MapPin,
} as const;

function SocialIcon({
  type,
}: {
  type: "facebook" | "twitter" | "instagram" | "linkedin";
}) {
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.2-1.5 1.5-1.5H17V4.6c-.4 0-.9-.1-1.6-.1-3 0-4.9 1.8-4.9 5.1v1.3H8v3.1h2.5v8h3Z" />
      </svg>
    );
  }

  if (type === "twitter") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.1l-4.8-6.4L6.5 22H3.4l7.3-8.4L1 2h6.2l4.3 5.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm5 3.1A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3Zm0 2.2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Zm5-3.8a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 17 5.7Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M6.9 8.6A1.6 1.6 0 1 1 8.5 7a1.6 1.6 0 0 1-1.6 1.6ZM8.2 10H5.5v8.5h2.7V10Zm4.3 0H9.9v8.5h2.6v-4.7c0-2.6 3.4-2.8 3.4 0v4.7h2.6v-5.6c0-4.4-5-4.2-6 .6V10Z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pb-12 pt-10">
      <div className="w-full border-t border-[color:var(--stat-border)]">
        <div className="mx-auto w-11/12 px-8 py-12 sm:px-10 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr_auto]">
            <div className="max-w-sm">
              <a href="#" className="inline-flex">
                <Logo iconClassName="h-10 w-10" textClassName="text-[20px]" />
              </a>
              <p className="mt-5 text-[15px] leading-8 text-[color:var(--muted-foreground)]">
                {footerConfig.description}
              </p>

              <div className="mt-7 flex items-center gap-3">
                {footerConfig.socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={item.label}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--stat-border)] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--primary)]"
                  >
                    <SocialIcon type={item.type} />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {footerConfig.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-[15px] font-semibold text-[color:var(--foreground)]">
                    {group.title}
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-[15px] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div>
                <h3 className="text-[15px] font-semibold text-[color:var(--foreground)]">
                  Contact
                </h3>
                <ul className="mt-5 space-y-4">
                  {footerConfig.contact.map((item) => {
                    const Icon = contactIconMap[item.type];

                    return (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="flex items-start gap-3 text-[15px] text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
                        >
                          <Icon className="mt-0.5 h-4.5 w-4.5 shrink-0" strokeWidth={2} />
                          <span>{item.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="flex items-end justify-start lg:justify-end">
              <a
                href="#top"
                aria-label="Back to top"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--cta-dark)] text-white"
              >
                <ArrowUp className="h-5 w-5" strokeWidth={2.2} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-[color:var(--stat-border)]">
        <div className="mx-auto w-11/12 px-8 pt-6 text-center text-[14px] text-[color:var(--muted-foreground)] sm:px-10 lg:px-12">
          © {year} Shei IT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
