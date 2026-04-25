"use client";

import { useEffect } from "react";

type AlertVariant = "warning" | "error" | "success" | "info";

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  variant?: AlertVariant;
  /** Label tombol aksi utama (default: "OK") */
  actionLabel?: string;
  /** Callback tombol aksi, jika tidak diberikan maka onClose */
  onAction?: () => void;
}

const VARIANT_STYLES: Record<AlertVariant, { bg: string; icon: string; accent: string; iconPath: string }> = {
  warning: {
    bg: "rgba(251,191,36,0.10)",
    icon: "#f59e0b",
    accent: "#b45309",
    iconPath:
      "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  },
  error: {
    bg: "rgba(239,68,68,0.08)",
    icon: "#ef4444",
    accent: "#b91c1c",
    iconPath:
      "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z",
  },
  success: {
    bg: "rgba(34,197,94,0.08)",
    icon: "#22c55e",
    accent: "#15803d",
    iconPath: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  info: {
    bg: "rgba(59,130,246,0.08)",
    icon: "#3b82f6",
    accent: "#1d4ed8",
    iconPath:
      "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
  },
};

export default function AlertDialog({
  open,
  onClose,
  title,
  message,
  variant = "warning",
  actionLabel = "OK",
  onAction,
}: AlertDialogProps) {
  // Tutup dengan Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Cegah scroll body
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const v = VARIANT_STYLES[variant];

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-title"
        aria-describedby="alert-msg"
      >
        {/* Icon */}
        <div
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: v.bg }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={v.icon}
            className="h-7 w-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={v.iconPath} />
          </svg>
        </div>

        {/* Title */}
        <h3
          id="alert-title"
          className="mb-2 text-center text-lg font-bold"
          style={{ color: v.accent }}
        >
          {title}
        </h3>

        {/* Message */}
        <p
          id="alert-msg"
          className="mb-6 text-center text-sm leading-relaxed"
          style={{ color: "#64748b" }}
        >
          {message}
        </p>

        {/* Action */}
        <button
          type="button"
          onClick={onAction ?? onClose}
          autoFocus
          className="w-full rounded-xl py-3 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
          style={{ background: v.icon }}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
