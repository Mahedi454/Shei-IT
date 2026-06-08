"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { getFirebaseAuthErrorMessage } from "@/lib/firebase-auth-errors";
import { firebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!firebaseAuth) {
        throw new Error("Firebase frontend config is missing.");
      }

      await signInWithEmailAndPassword(firebaseAuth, email, password);
      router.replace("/admin");
    } catch (err) {
      setError(getFirebaseAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[color:var(--background)] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-[color:var(--stat-border)] bg-[color:var(--stat-bg)] p-7"
      >
        <h1 className="text-[2rem] font-semibold text-[color:var(--foreground)]">
          Admin Login
        </h1>
        <p className="mt-2 text-[14px] text-[color:var(--muted-foreground)]">
          This page is unlisted and protected by Firebase plus backend admin checks.
        </p>

        {mounted && !isFirebaseConfigured ? (
          <p className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-[14px] text-red-500">
            Firebase config is missing. Add the required frontend environment variables.
          </p>
        ) : null}

        <div className="mt-6 space-y-4">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Admin email"
            className="w-full rounded-xl border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-4 py-3 text-[color:var(--foreground)] outline-none"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-[color:var(--stat-border)] bg-[color:var(--card-solid)] px-4 py-3 text-[color:var(--foreground)] outline-none"
          />
        </div>

        {error ? (
          <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-[14px] text-red-400">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading || (mounted && !isFirebaseConfigured)}
          className="mt-6 w-full rounded-xl bg-[color:var(--primary)] px-5 py-3 text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
