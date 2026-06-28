"use client";
import { clsx } from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({ children, className, hover, onClick, padding = "md" }: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-6",
  };
  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-white rounded-card border border-surface-200 shadow-card",
        hover && "hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
