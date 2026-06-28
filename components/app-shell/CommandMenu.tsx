"use client";
import { useEffect, useState, useRef } from "react";
import {
  Search, FileText, Settings, BookOpen,
  Star, LayoutDashboard, X, Hash,
} from "lucide-react";
import { getStoredDocuments } from "@/lib/store";
import { StudyDocument } from "@/types";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

export default function CommandMenu() {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs]   = useState<StudyDocument[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const router   = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setDocs(getStoredDocuments());
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  if (!open) return null;

  const NAV_LINKS = [
    { label: "Dashboard",  href: "/dashboard",       icon: <LayoutDashboard size={14} className="text-primary-500" /> },
    { label: "Library",    href: "/library",          icon: <FileText size={14} className="text-accent-500" /> },
    { label: "Quizzes",    href: "/quizzes/quiz-1",   icon: <BookOpen size={14} className="text-violet-500" /> },
    { label: "For You",    href: "/recommendations",  icon: <Star size={14} className="text-amber-500" /> },
    { label: "Settings",   href: "/settings",         icon: <Settings size={14} className="text-surface-500" /> },
  ];

  const filteredDocs = docs.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase())
  );
  const filteredNav = NAV_LINKS.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase()) ||
    n.href.toLowerCase().includes(query.toLowerCase())
  );

  const allResults = [
    ...filteredNav.map((n, i) => ({ ...n, type: "nav",  idx: i })),
    ...filteredDocs.map((d, i) => ({
      label: d.title,
      href:  `/documents/${d.id}`,
      icon:  <Hash size={14} className="text-surface-400" />,
      type:  "doc",
      idx:   filteredNav.length + i,
      course: d.course,
    })),
  ];

  const handleNavigate = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 p-4 animate-fade-in"
      style={{ background: "rgba(15, 23, 42, 0.55)", backdropFilter: "blur(4px)" }}
      onClick={() => setOpen(false)}
    >
      {/* Panel */}
      <div
        className="w-full max-w-lg bg-white rounded-2xl border border-surface-200/80 shadow-panel overflow-hidden flex flex-col animate-scale-in"
        style={{ maxHeight: "min(480px, 90vh)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-surface-100">
          <Search size={17} className="text-surface-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search documents or jump to a page…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
            className="w-full text-sm text-surface-800 placeholder-surface-400 focus:outline-none bg-transparent"
          />
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-surface-600 transition-colors active:scale-90"
          >
            <X size={15} />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2 space-y-3">
          {/* Navigation group */}
          {filteredNav.length > 0 && (
            <div>
              <p className="px-3 py-1.5 text-[10px] font-bold text-surface-400 uppercase tracking-widest">
                Navigation
              </p>
              <div className="space-y-0.5">
                {filteredNav.map((n, i) => (
                  <button
                    key={n.href}
                    onClick={() => handleNavigate(n.href)}
                    style={{ animationDelay: `${i * 30}ms` }}
                    className={clsx(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left animate-slide-up",
                      activeIdx === i
                        ? "bg-primary-50 text-primary-700 border-l-2 border-primary-500"
                        : "text-surface-700 hover:bg-surface-50 hover:text-surface-900 border-l-2 border-transparent"
                    )}
                  >
                    <span className="w-5 flex items-center justify-center shrink-0">{n.icon}</span>
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Documents group */}
          {filteredDocs.length > 0 && (
            <div>
              <p className="px-3 py-1.5 text-[10px] font-bold text-surface-400 uppercase tracking-widest">
                Documents
              </p>
              <div className="space-y-0.5">
                {filteredDocs.map((doc, i) => (
                  <button
                    key={doc.id}
                    onClick={() => handleNavigate(`/documents/${doc.id}`)}
                    style={{ animationDelay: `${(filteredNav.length + i) * 30}ms` }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-surface-700 hover:bg-surface-50 hover:text-surface-900 border-l-2 border-transparent hover:border-accent-400 transition-all duration-150 text-left animate-slide-up"
                  >
                    <span className="text-base shrink-0">📄</span>
                    <span className="truncate flex-1">{doc.title}</span>
                    {doc.course && (
                      <span className="text-xs text-surface-400 shrink-0 ml-auto pl-2">
                        {doc.course}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty */}
          {allResults.length === 0 && (
            <div className="text-center py-10 animate-fade-in">
              <p className="text-3xl mb-2">🔍</p>
              <p className="text-sm font-medium text-surface-600">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-surface-400 mt-1">Try a document title or page name</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-surface-100 bg-surface-50/70 text-[10px] text-surface-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded border border-surface-200 bg-white font-mono text-[10px]">↑↓</kbd>
            navigate
            <kbd className="px-1.5 py-0.5 rounded border border-surface-200 bg-white font-mono text-[10px] ml-1">↵</kbd>
            select
          </span>
          <kbd className="px-1.5 py-0.5 rounded border border-surface-200 bg-white font-mono text-[10px]">Esc</kbd>
        </div>
      </div>
    </div>
  );
}
