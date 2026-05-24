"use client";

import { FormEvent, useState } from "react";

import { apiRequest } from "@/lib/api";

const initialForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

export function ContactForm() {
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
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <input className="admin-input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="admin-input" type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="admin-input" placeholder="Company (optional)" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
      <input className="admin-input" placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input className="admin-input" placeholder="Service you need" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} />
      <input className="admin-input" placeholder="Budget range" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
      <textarea className="admin-input min-h-40 md:col-span-2" placeholder="Tell us what you need" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-[color:var(--primary)] px-5 py-3 text-[15px] font-semibold text-white md:col-span-2 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      {message ? (
        <p
          className={`rounded-[0.9rem] border px-4 py-3 text-[14px] md:col-span-2 ${
            messageTone === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
              : "border-rose-500/20 bg-rose-500/10 text-rose-400"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
