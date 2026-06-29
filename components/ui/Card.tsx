"use client";
import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "primary" | "accent" | false;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
  animate?: boolean;
}

export default function Card({
  children,
  className,
  hover,
  glow = false,
  onClick,
  padding = "md",
  animate = false,
}: CardProps) {
  const paddingStyles = {
    none: "",
    sm:   "p-3",
    md:   "p-5",
    lg:   "p-6",
  };

  const glowStyles = {
    primary: "hover:shadow-glow-primary",
    accent:  "hover:shadow-glow-accent",
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-surface-700 rounded-card border border-surface-600 shadow-card",
        "transition-all duration-200",
        hover && "hover:shadow-card-hover hover:-translate-y-1 cursor-pointer",
        glow && glowStyles[glow],
        animate && "animate-slide-up",
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
