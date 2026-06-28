"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { LayoutDashboard, Library, BookOpen, Star, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/library", label: "Library", icon: Library },
  { href: "/quizzes", label: "Quizzes", icon: BookOpen },
  { href: "/recommendations", label: "For You", icon: Star },
  { href: "/settings", label: "Profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-surface-200 safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors min-w-0",
                active ? "text-primary-600" : "text-surface-400"
              )}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
