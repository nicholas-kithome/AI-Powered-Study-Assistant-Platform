"use client";
import Link from "next/link";
import { Bell, Search, Upload } from "lucide-react";
import { clsx } from "clsx";

interface TopbarProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function Topbar({ title, breadcrumbs }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-surface-200 px-4 md:px-6 h-14 flex items-center justify-between gap-4">
      {/* Left: breadcrumbs */}
      <div className="flex items-center gap-1.5 min-w-0">
        {breadcrumbs ? (
          breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              {i > 0 && <span className="text-surface-300">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="text-sm text-surface-500 hover:text-surface-800 truncate">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-sm font-semibold text-surface-800 truncate">{crumb.label}</span>
              )}
            </span>
          ))
        ) : (
          <span className="text-sm font-semibold text-surface-800">{title}</span>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface-100 hover:bg-surface-200 rounded-lg text-sm text-surface-500 transition-colors">
          <Search size={14} />
          <span>Search...</span>
          <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-surface-200 text-surface-400">⌘K</kbd>
        </button>
        <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 relative" title="Notifications">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <Link
          href="/library?upload=true"
          className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium"
        >
          <Upload size={14} />
          Upload
        </Link>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}
