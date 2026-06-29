"use client";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "accent";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  shine?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-glow-primary",
  secondary:
    "bg-surface-700 text-surface-200 border border-surface-600 hover:bg-surface-600 hover:border-surface-500 hover:shadow-card",
  ghost:
    "text-surface-300 hover:bg-surface-700 hover:text-surface-100",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow-glow-red",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm hover:shadow-glow-accent",
};

const sizeStyles: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5 rounded-lg",
  md: "text-sm px-4 py-2 gap-2 rounded-lg",
  lg: "text-base px-5 py-2.5 gap-2 rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  shine = false,
  icon,
  iconRight,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed select-none",
        "active:scale-95",
        shine && "btn-shine",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2
          className="animate-spin shrink-0"
          size={size === "sm" ? 13 : 15}
        />
      ) : icon ? (
        <span className="shrink-0 transition-transform duration-150 group-hover:scale-110">
          {icon}
        </span>
      ) : null}
      {children}
      {iconRight && !loading && (
        <span className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5">
          {iconRight}
        </span>
      )}
    </button>
  );
}
