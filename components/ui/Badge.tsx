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
  blue:   "bg-blue-100 text-blue-700 border border-blue-200",
  teal:   "bg-teal-100 text-teal-700 border border-teal-200",
  amber:  "bg-amber-100 text-amber-700 border border-amber-200",
  red:    "bg-red-100 text-red-700 border border-red-200",
  green:  "bg-emerald-100 text-emerald-700 border border-emerald-200",
  gray:   "bg-surface-100 text-surface-600 border border-surface-200",
  purple: "bg-purple-100 text-purple-700 border border-purple-200",
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
