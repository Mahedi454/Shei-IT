"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

type ToastTone = "success" | "error" | "info";

type ToastInput = {
  description?: string;
  title: string;
  tone?: ToastTone;
};

type ToastItem = ToastInput & {
  id: string;
  tone: ToastTone;
};

type AdminFeedbackContextValue = {
  showToast: (input: ToastInput) => void;
};

const AdminFeedbackContext = createContext<AdminFeedbackContextValue | null>(null);

const toneStyles: Record<
  ToastTone,
  {
    icon: typeof CheckCircle2;
    classes: string;
  }
> = {
  success: {
    icon: CheckCircle2,
    classes:
      "border-emerald-500/25 bg-[linear-gradient(180deg,rgba(16,185,129,0.14),rgba(16,185,129,0.06))] text-emerald-300",
  },
  error: {
    icon: AlertCircle,
    classes:
      "border-rose-500/25 bg-[linear-gradient(180deg,rgba(244,63,94,0.14),rgba(244,63,94,0.06))] text-rose-300",
  },
  info: {
    icon: Info,
    classes:
      "border-[color:var(--stat-border)] bg-[linear-gradient(180deg,rgba(139,124,255,0.16),rgba(139,124,255,0.06))] text-[color:var(--primary-soft)]",
  },
};

export function AdminFeedbackProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, description, tone = "info" }: ToastInput) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const nextToast: ToastItem = { id, title, description, tone };

      setToasts((current) => [...current, nextToast]);

      window.setTimeout(() => {
        removeToast(id);
      }, 3600);
    },
    [removeToast],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <AdminFeedbackContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-[120] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3">
        {toasts.map((toast) => {
          const tone = toneStyles[toast.tone];
          const Icon = tone.icon;

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto rounded-[1.1rem] border px-4 py-3 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl ${tone.classes}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-white">{toast.title}</p>
                  {toast.description ? (
                    <p className="mt-1 text-[12px] leading-6 text-white/72">
                      {toast.description}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="rounded-full p-1 text-white/70 transition hover:bg-white/8 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </AdminFeedbackContext.Provider>
  );
}

export function useAdminFeedback() {
  const context = useContext(AdminFeedbackContext);

  if (!context) {
    throw new Error("useAdminFeedback must be used within AdminFeedbackProvider.");
  }

  return context;
}
