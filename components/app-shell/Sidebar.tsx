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
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/library", label: "Library", icon: Library },
  { href: "/quizzes", label: "Quizzes", icon: BookOpen },
  { href: "/recommendations", label: "For You", icon: Star },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "hidden md:flex flex-col h-screen bg-white border-r border-surface-200 sticky top-0 transition-all duration-300 z-30",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={clsx("flex items-center gap-3 px-4 py-5 border-b border-surface-100", collapsed && "justify-center px-2")}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center shrink-0">
          <Sparkles size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-surface-900 text-base tracking-tight">StudyAI</span>
        )}
      </div>

      {/* Upload CTA */}
      {!collapsed && (
        <div className="px-3 pt-4 pb-2">
          <Link
            href="/library?upload=true"
            className="flex items-center gap-2 w-full px-3 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            <Upload size={15} />
            Upload Notes
          </Link>
        </div>
      )}
      {collapsed && (
        <div className="px-2 pt-4 pb-2">
          <Link
            href="/library?upload=true"
            className="flex items-center justify-center w-full p-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            title="Upload Notes"
          >
            <Upload size={16} />
          </Link>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active
                  ? "bg-primary-50 text-primary-700 border border-primary-100"
                  : "text-surface-600 hover:bg-surface-50 hover:text-surface-900",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      {/* User + Collapse */}
      <div className="border-t border-surface-100 p-3 space-y-1">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-surface-900 truncate">Alex Johnson</p>
              <p className="text-xs text-surface-400 truncate">alex@university.edu</p>
            </div>
            <button className="p-1 rounded hover:bg-surface-100 text-surface-400 hover:text-surface-600" title="Sign out">
              <LogOut size={14} />
            </button>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={clsx(
            "flex items-center gap-2 w-full px-2 py-2 rounded-lg text-xs text-surface-500 hover:bg-surface-100 hover:text-surface-700 transition-colors",
            collapsed && "justify-center"
          )}
        >
          {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
