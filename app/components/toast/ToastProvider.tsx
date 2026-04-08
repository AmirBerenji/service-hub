"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import type {
  Toast,
  ToastContextValue,
  ToastOptions,
  ToastType,
} from "./toast.types";
import { ToastContainer } from "./ToastContainer";

// ─── Context ──────────────────────────────────────────────────────────────────
const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (type: ToastType, message: string, options?: ToastOptions): number => {
      const id = Date.now() + Math.random();
      const defaults: Record<ToastType, string> = {
        success: "Success",
        error: "Error",
        warning: "Warning",
        info: "Info",
      };
      setToasts((prev) => [
        ...prev,
        {
          id,
          type,
          message,
          title: options?.title ?? defaults[type],
          duration: options?.duration ?? 3000,
          leaving: false,
        },
      ]);
      return id;
    },
    [],
  );

  const removeToast = useCallback((id: number) => {
    // Start leave animation
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)),
    );
    // Remove from DOM after animation
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 1000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");

  return {
    /** Show a green success toast */
    success: (message: string, options?: ToastOptions) =>
      ctx.addToast("success", message, options),

    /** Show a red error toast */
    error: (message: string, options?: ToastOptions) =>
      ctx.addToast("error", message, options),

    /** Show an amber warning toast */
    warning: (message: string, options?: ToastOptions) =>
      ctx.addToast("warning", message, options),

    /** Show a blue info toast */
    info: (message: string, options?: ToastOptions) =>
      ctx.addToast("info", message, options),

    /** Manually remove a toast by its id */
    remove: (id: number) => ctx.removeToast(id),
  };
}
