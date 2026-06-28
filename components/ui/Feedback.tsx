"use client";
import { clsx } from "clsx";

// ─── Skeleton ──────────────────────────────────────────────────────
export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("skeleton rounded-lg", className)} />;
}

// ─── EmptyState ────────────────────────────────────────────────────
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold text-surface-800 mb-2">{title}</h3>
      {description && <p className="text-sm text-surface-500 max-w-sm mb-6">{description}</p>}
      {action}
    </div>
  );
}

// ─── ErrorAlert ────────────────────────────────────────────────────
interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorAlert({ title = "Something went wrong", message, onRetry }: ErrorAlertProps) {
  return (
    <div className="rounded-card border border-red-200 bg-red-50 p-4 flex gap-3">
      <span className="text-red-500 text-xl shrink-0">⚠️</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-red-800 text-sm">{title}</p>
        <p className="text-red-700 text-sm mt-0.5">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm font-medium text-red-700 underline underline-offset-2 hover:text-red-900"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Spinner ───────────────────────────────────────────────────────
export function Spinner({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      className={clsx("animate-spin text-primary-500", className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Toast ─────────────────────────────────────────────────────────
interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
}

export function Toast({ message, type = "success" }: ToastProps) {
  const styles = {
    success: "bg-emerald-600",
    error: "bg-red-600",
    info: "bg-primary-600",
  };
  const icons = { success: "✓", error: "✕", info: "ℹ" };

  return (
    <div
      className={clsx(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg animate-slide-up",
        styles[type]
      )}
    >
      <span className="font-bold">{icons[type]}</span>
      {message}
    </div>
  );
}

// ─── Progress Bar ──────────────────────────────────────────────────
interface ProgressBarProps {
  value: number; // 0-100
  color?: "primary" | "accent" | "green";
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function ProgressBar({ value, color = "primary", size = "sm", showLabel }: ProgressBarProps) {
  const colorStyles = {
    primary: "bg-primary-500",
    accent: "bg-accent-500",
    green: "bg-emerald-500",
  };
  const heights = { sm: "h-1.5", md: "h-2.5" };

  return (
    <div className="flex items-center gap-3">
      <div className={clsx("flex-1 bg-surface-200 rounded-full overflow-hidden", heights[size])}>
        <div
          className={clsx("h-full rounded-full transition-all duration-500", colorStyles[color])}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-surface-600 w-8 text-right">{value}%</span>
      )}
    </div>
  );
}
