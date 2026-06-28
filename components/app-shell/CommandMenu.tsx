"use client";
import { useEffect, useState, useRef } from "react";
import { Search, FileText, Settings, BookOpen, Star, Sparkles, X } from "lucide-react";
import { getStoredDocuments } from "@/lib/store";
import { StudyDocument } from "@/types";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<StudyDocument[]>([]);
  const router = useRouter();
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
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  if (!open) return null;

  const NAV_LINKS = [
    { label: "Go to Dashboard", href: "/dashboard", icon: <Star size={14} className="text-amber-500" /> },
    { label: "Go to Library", href: "/library", icon: <FileText size={14} className="text-primary-500" /> },
    { label: "Go to Quizzes", href: "/quizzes/quiz-1", icon: <BookOpen size={14} className="text-violet-500" /> },
    { label: "Go to Settings", href: "/settings", icon: <Settings size={14} className="text-surface-500" /> },
  ];

  const filteredDocs = docs.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredNav = NAV_LINKS.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-surface-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-surface-200 shadow-panel overflow-hidden flex flex-col max-h-[450px]">
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-100">
          <Search size={18} className="text-surface-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search documents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm text-surface-800 placeholder-surface-400 focus:outline-none bg-transparent"
          />
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg hover:bg-surface-100 text-surface-400"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {filteredNav.length > 0 && (
            <div>
              <p className="px-3 py-1.5 text-[10px] font-bold text-surface-400 uppercase tracking-wider">Navigation</p>
              <div className="space-y-0.5">
                {filteredNav.map((n) => (
                  <button
                    key={n.href}
                    onClick={() => handleNavigate(n.href)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-surface-700 hover:bg-primary-50 hover:text-primary-700 transition-colors text-left"
                  >
                    {n.icon}
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredDocs.length > 0 && (
            <div>
              <p className="px-3 py-1.5 text-[10px] font-bold text-surface-400 uppercase tracking-wider">Documents</p>
              <div className="space-y-0.5">
                {filteredDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => handleNavigate(`/documents/${doc.id}`)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-surface-700 hover:bg-primary-50 hover:text-primary-700 transition-colors text-left truncate"
                  >
                    <span className="text-lg">📄</span>
                    <span className="truncate">{doc.title}</span>
                    {doc.course && <span className="text-xs text-surface-400 ml-auto shrink-0">{doc.course}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredDocs.length === 0 && filteredNav.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-surface-500">No results found for &ldquo;{query}&rdquo;</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-surface-100 bg-surface-50 text-[10px] text-surface-400 flex items-center justify-between">
          <span>Search documents, courses, or pages</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
