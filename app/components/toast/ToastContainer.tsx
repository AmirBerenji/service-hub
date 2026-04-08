"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Toast } from "./toast.types";
import type { ReactElement } from "react";
import "./toast.css";

// ─── Icons ────────────────────────────────────────────────────────────────────
const icons: Record<Toast["type"], ReactElement> = {
  success: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#22c55e22"
        stroke="#22c55e"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 12.5l3 3 6-6"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#ef444422"
        stroke="#ef4444"
        strokeWidth="1.5"
      />
      <path
        d="M8 8l8 8M16 8l-8 8"
        stroke="#ef4444"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <path
        d="M12 3L22 20H2L12 3z"
        fill="#f59e0b22"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 9v5M12 16.5v.5"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#38bdf822"
        stroke="#38bdf8"
        strokeWidth="1.5"
      />
      <path
        d="M12 8v.5M12 11v5"
        stroke="#38bdf8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const styles: Record<
  Toast["type"],
  { bar: string; bg: string; border: string; label: string }
> = {
  success: {
    bar: "#22c55e",
    bg: "#0d1f12",
    border: "#166534",
    label: "#4ade80",
  },
  error: { bar: "#ef4444", bg: "#1f0d0d", border: "#7f1d1d", label: "#f87171" },
  warning: {
    bar: "#f59e0b",
    bg: "#1c1506",
    border: "#78350f",
    label: "#fbbf24",
  },
  info: { bar: "#38bdf8", bg: "#081929", border: "#0c4a6e", label: "#7dd3fc" },
};

// ─── Single Toast Item ────────────────────────────────────────────────────────
interface ToastItemProps {
  toast: Toast;
  onRemove: (id: number) => void;
}

export function ToastItem({ toast, onRemove }: ToastItemProps) {
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [progress, setProgress] = useState(100);
  const { bar, bg, border, label } = styles[toast.type];

  useEffect(() => {
    startRef.current = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.max(0, 100 - (elapsed / toast.duration) * 100);
      setProgress(pct);
      if (pct > 0) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onRemove(toast.id);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "12px",
        overflow: "hidden",
        width: "340px",
        maxWidth: "calc(100vw - 40px)",
        boxShadow: `0 8px 32px #00000066, 0 0 0 1px ${bar}18`,
        animation: toast.leaving
          ? "toastOut 0.4s cubic-bezier(.4,0,.2,1) forwards"
          : "toastIn 0.4s cubic-bezier(.16,1,.3,1) forwards",
        fontFamily: "'Geist', 'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Content row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          padding: "14px 14px 12px",
        }}
      >
        <div style={{ flexShrink: 0, marginTop: "1px" }}>
          {icons[toast.type]}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              margin: 0,
              color: label,
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.01em",
              marginBottom: "3px",
            }}
          >
            {toast.title}
          </p>
          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              fontSize: "13px",
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            {toast.message}
          </p>
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          aria-label="Dismiss notification"
          style={{
            flexShrink: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#475569",
            padding: "2px",
            borderRadius: "4px",
            lineHeight: 1,
            transition: "color .15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#475569";
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" width="14" height="14">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div style={{ height: "3px", background: "#ffffff08" }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: bar,
            boxShadow: `0 0 8px ${bar}99`,
            borderRadius: "0 2px 2px 0",
          }}
        />
      </div>
    </div>
  );
}

// ─── Container ────────────────────────────────────────────────────────────────
interface ToastContainerProps {
  toasts: Toast[];
  removeToast: (id: number) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {toasts.map((toast) => (
        <div key={toast.id} style={{ pointerEvents: "auto" }}>
          <ToastItem toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>
  );
}
