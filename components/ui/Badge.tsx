"use client";
import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "teal" | "amber" | "red" | "green" | "gray" | "purple";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

const variantStyles = {
  blue:   "bg-blue-900/30 text-blue-400 border border-blue-700/50",
  teal:   "bg-teal-900/30 text-teal-400 border border-teal-700/50",
  amber:  "bg-amber-900/30 text-amber-400 border border-amber-700/50",
  red:    "bg-red-900/30 text-red-400 border border-red-700/50",
  green:  "bg-emerald-900/30 text-emerald-400 border border-emerald-700/50",
  gray:   "bg-surface-700 text-surface-300 border border-surface-600",
  purple: "bg-purple-900/30 text-purple-400 border border-purple-700/50",
};

const dotColors = {
  blue: "bg-blue-500", teal: "bg-teal-500", amber: "bg-amber-500",
  red: "bg-red-500", green: "bg-emerald-500", gray: "bg-surface-400", purple: "bg-purple-500",
};

export default function Badge({ children, variant = "gray", size = "sm", dot, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 font-medium rounded-full",
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1",
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={clsx("w-1.5 h-1.5 rounded-full shrink-0", dotColors[variant])} />}
      {children}
    </span>
  );
}
