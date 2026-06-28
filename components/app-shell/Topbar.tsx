"use client";
import Link from "next/link";
import { Bell, Search, Upload } from "lucide-react";

interface TopbarProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function Topbar({ title, breadcrumbs }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 px-4 md:px-6 h-14 flex items-center justify-between gap-4 glass border-b border-surface-200/60">
      {/* Left: breadcrumbs */}
      <div className="flex items-center gap-1.5 min-w-0 animate-fade-in">
        {breadcrumbs ? (
          breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              {i > 0 && <span className="text-surface-300 text-xs">/</span>}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-sm text-surface-400 hover:text-surface-700 truncate transition-colors duration-150"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-sm font-semibold text-surface-800 truncate">
                  {crumb.label}
                </span>
              )}
            </span>
          ))
        ) : (
          <span className="text-sm font-semibold text-surface-800">{title}</span>
        )}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1.5 shrink-0 animate-fade-in">
        {/* Search trigger */}
        <button className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface-100/80 hover:bg-surface-200/80 rounded-xl text-sm text-surface-500 transition-all duration-150 hover:scale-[1.02] active:scale-95 border border-surface-200/50 hover:border-surface-300/50">
          <Search size={13} />
          <span className="text-xs">Search…</span>
          <kbd className="text-[10px] bg-white px-1.5 py-0.5 rounded-md border border-surface-200 text-surface-400 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Bell */}
        <button
          className="relative p-2 rounded-xl hover:bg-surface-100 text-surface-500 hover:text-surface-700 transition-all duration-150 active:scale-95"
          title="Notifications"
        >
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </button>

        {/* Mobile upload */}
        <Link
          href="/library?upload=true"
          className="md:hidden flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white rounded-xl text-sm font-medium active:scale-95 transition-transform"
        >
          <Upload size={13} />
          Upload
        </Link>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-sm font-bold cursor-pointer ring-2 ring-transparent hover:ring-primary-300 hover:ring-offset-1 transition-all duration-200 shadow-sm">
          A
        </div>
      </div>
    </header>
  );
}
