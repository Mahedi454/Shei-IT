"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { servicesSection } from "@/config/site";
import { apiRequest } from "@/lib/api";

const contactMethods = [
  {
    title: "Email Us",
    value: "sheiitofficial@gmail.com",
    description: "We reply within 24 hours",
    href: "mailto:sheiitofficial@gmail.com",
    icon: Mail,
    accent:
      "bg-[linear-gradient(180deg,rgba(139,124,255,0.18),rgba(139,124,255,0.08))] text-[color:var(--primary)]",
  },
  {
    title: "Call Us",
    value: "+880 1768 857058",
    description: "Mon - Sat, 9:00 AM - 7:00 PM",
    href: "tel:+8801768857058",
    icon: Phone,
    accent:
      "bg-[linear-gradient(180deg,rgba(111,231,200,0.2),rgba(111,231,200,0.08))] text-[#0f9f7f]",
  },
  {
    title: "Visit Our Office",
    value: "House 12, Road 5, Dhanmondi",
    description: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhanmondi%20Dhaka%20Bangladesh",
    icon: MapPin,
    accent:
      "bg-[linear-gradient(180deg,rgba(255,159,90,0.18),rgba(255,159,90,0.08))] text-[color:var(--orange)]",
  },
  {
    title: "Skype",
    value: "shei.it.agency",
    description: "Let's connect on Skype",
    href: "skype:shei.it.agency?chat",
    icon: Phone,
    accent:
      "bg-[linear-gradient(180deg,rgba(93,174,255,0.18),rgba(93,174,255,0.08))] text-[color:var(--blue)]",
  },
] as const;

const initialForm = {
  budget: "",
  company: "",
  email: "",
  message: "",
  name: "",
  phone: "",
  service: "",
};

export function ContactMessageSection() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"success" | "error" | "">("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageTone("");

    try {
      await apiRequest("/contacts", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setMessage("Your message has been sent. We will get back to you soon.");
      setMessageTone("success");
      setForm(initialForm);
    } catch {
      setMessage("We could not send your message right now. Please try again in a moment.");
      setMessageTone("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-form" className="relative scroll-mt-28 pb-10 lg:pb-12">
      <div className="mx-auto w-11/12 max-w-[1440px]">
        <div className="grid overflow-hidden rounded-[1.6rem] border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:shadow-none lg:grid-cols-[1.08fr_0.92fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <h2 className="text-[1.55rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
              Send Us a Message
            </h2>
            <p className="mt-3 max-w-[24rem] text-[15px] leading-7 text-[color:var(--muted-foreground)]">
              Fill out the form and our team will get back to you as soon as
              possible.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  className="h-14 rounded-[0.75rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-5 text-[14px] font-medium text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--primary)]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  className="h-14 rounded-[0.75rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-5 text-[14px] font-medium text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--primary)]"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, phone: event.target.value }))
                  }
                  className="h-14 rounded-[0.75rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-5 text-[14px] font-medium text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--primary)]"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company (Optional)"
                  value={form.company}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, company: event.target.value }))
                  }
                  className="h-14 rounded-[0.75rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-5 text-[14px] font-medium text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--primary)]"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="relative block">
                  <span className="pointer-events-none absolute left-5 top-3 text-[12px] font-semibold text-[color:var(--muted-foreground)]">
                    Project Type
                  </span>
                  <select
                    name="service"
                    value={form.service}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, service: event.target.value }))
                    }
                    className="h-16 w-full appearance-none rounded-[0.75rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-5 pb-3 pt-7 text-[14px] font-semibold text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--primary)]"
                  >
                    <option value="">Select a service</option>
                    {servicesSection.items.map((service) => (
                      <option key={service.title}>{service.title}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--muted-foreground)]" />
                </label>

                <input
                  type="text"
                  name="budget"
                  placeholder="Budget Range"
                  value={form.budget}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, budget: event.target.value }))
                  }
                  className="h-16 rounded-[0.75rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-5 text-[14px] font-medium text-[color:var(--foreground)] outline-none transition focus:border-[color:var(--primary)]"
                />
              </div>

              <label className="block rounded-[0.75rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-5 py-4 focus-within:border-[color:var(--primary)]">
                <span className="block text-[12px] font-semibold text-[color:var(--muted-foreground)]">
                  Project Details *
                </span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, message: event.target.value }))
                  }
                  placeholder="Tell us about your project, goals, and requirements..."
                  className="mt-2 min-h-28 w-full resize-none bg-transparent text-[14px] font-medium leading-7 text-[color:var(--foreground)] outline-none"
                  required
                />
              </label>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-3 rounded-[0.75rem] bg-[color:var(--cta-dark)] px-7 py-4 text-[15px] font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.2)] disabled:opacity-60 dark:shadow-[0_20px_40px_rgba(0,0,0,0.36)]"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <span className="inline-flex items-center gap-3 text-[13px] font-semibold text-[color:var(--muted-foreground)]">
                  <ShieldCheck className="h-4 w-4 text-[color:var(--primary)]" />
                  We usually reply within 24 hours
                </span>
              </div>

              {message ? (
                <p
                  className={`rounded-[0.75rem] border px-4 py-3 text-[14px] ${
                    messageTone === "success"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : "border-rose-500/20 bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {message}
                </p>
              ) : null}
            </form>
          </div>

          <div className="border-t border-[color:var(--stat-border)] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <h2 className="text-[1.55rem] font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
              Other Ways to Reach Us
            </h2>

            <div className="mt-7 space-y-4">
              {contactMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <a
                    key={method.title}
                    href={method.href}
                    className="group flex items-center gap-5 rounded-[1rem] border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] p-5 shadow-[0_12px_34px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[color:var(--primary-soft)] dark:shadow-none"
                  >
                    <span
                      className={`inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-[1rem] ${method.accent}`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={2.2} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold text-[color:var(--foreground)]">
                        {method.title}
                      </span>
                      <span className="mt-1 block text-[14px] font-semibold text-[color:var(--muted-foreground)]">
                        {method.value}
                      </span>
                      <span className="mt-1 block text-[13px] font-medium text-[color:var(--muted-foreground)]">
                        {method.description}
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-[color:var(--primary)] transition group-hover:translate-x-0.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
