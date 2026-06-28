"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  LayoutDashboard, Library, FileText, BookOpen,
  Star, Settings, Upload, ChevronLeft, ChevronRight,
  Sparkles, LogOut,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/dashboard",       label: "Dashboard",  icon: LayoutDashboard },
  { href: "/library",         label: "Library",    icon: Library },
  { href: "/quizzes",         label: "Quizzes",    icon: BookOpen },
  { href: "/recommendations", label: "For You",    icon: Star },
  { href: "/settings",        label: "Settings",   icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "hidden md:flex flex-col h-screen bg-white border-r border-surface-100",
        "sticky top-0 z-30",
        "transition-[width] duration-300 ease-spring",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div
        className={clsx(
          "flex items-center gap-3 px-4 py-5 border-b border-surface-100",
          collapsed && "justify-center px-2"
        )}
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shrink-0 shadow-glow-accent ai-glow">
          <Sparkles size={15} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-surface-900 text-base tracking-tight animate-fade-in">
            StudyAI
          </span>
        )}
      </div>

      {/* Upload CTA */}
      <div className={clsx("pt-4 pb-2", collapsed ? "px-2" : "px-3")}>
        {!collapsed ? (
          <Link
            href="/library?upload=true"
            className="btn-shine flex items-center gap-2 w-full px-3 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl text-sm font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-sm hover:shadow-glow-primary active:scale-95"
          >
            <Upload size={14} className="shrink-0" />
            Upload Notes
          </Link>
        ) : (
          <Link
            href="/library?upload=true"
            title="Upload Notes"
            className="flex items-center justify-center w-full p-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-150 active:scale-95"
          >
            <Upload size={16} />
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }, idx) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              style={{ animationDelay: `${idx * 40}ms` }}
              className={clsx(
                "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                "transition-all duration-200 animate-slide-up",
                active
                  ? "bg-primary-50 text-primary-700 shadow-inner-glow nav-active-pill active"
                  : "text-surface-600 hover:bg-surface-50 hover:text-surface-900",
                collapsed && "justify-center px-2"
              )}
            >
              {/* Active left-bar accent */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary-500 rounded-r-full" />
              )}
              <Icon
                size={18}
                className={clsx(
                  "shrink-0 transition-transform duration-200",
                  "group-hover:scale-110",
                  active && "text-primary-600"
                )}
              />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      {/* User + Collapse */}
      <div className="border-t border-surface-100 p-3 space-y-1">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-surface-50 transition-colors group cursor-pointer animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-sm font-bold shrink-0 ring-2 ring-white shadow-sm group-hover:ring-primary-200 transition-all duration-200">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-surface-900 truncate">Alex Johnson</p>
              <p className="text-xs text-surface-400 truncate">alex@university.edu</p>
            </div>
            <button
              className="p-1 rounded-lg hover:bg-surface-200 text-surface-400 hover:text-surface-600 transition-colors"
              title="Sign out"
            >
              <LogOut size={13} />
            </button>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={clsx(
            "flex items-center gap-2 w-full px-2 py-2 rounded-xl text-xs text-surface-500",
            "hover:bg-surface-100 hover:text-surface-700 transition-all duration-150 active:scale-95",
            collapsed && "justify-center"
          )}
        >
          <span className={clsx("transition-transform duration-300", collapsed ? "rotate-0" : "rotate-180")}>
            <ChevronRight size={14} />
          </span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
