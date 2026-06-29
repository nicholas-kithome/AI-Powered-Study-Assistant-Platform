"use client";
import { useEffect, useState } from "react";
import Topbar from "@/components/app-shell/Topbar";
import Card from "@/components/ui/Card";
import { getStoredDocuments, getStoredStats } from "@/lib/store";
import { MOCK_RECOMMENDATIONS } from "@/lib/mock-data";
import { StudyDocument, UserStats } from "@/types";
import { Upload, ArrowRight, Flame, FileText, BookOpen, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

const STATUS_COLORS: Record<string, string> = {
  ready:      "status-ready",
  processing: "status-processing",
  uploading:  "status-uploading",
  failed:     "status-failed",
};

const STATUS_LABELS: Record<string, string> = {
  ready:      "Ready",
  processing: "Processing",
  uploading:  "Uploading",
  failed:     "Failed",
};

const STAT_META = [
  { label: "Documents",     icon: <FileText   size={18} className="text-primary-400" />,  bg: "bg-primary-900/30",  iconBg: "bg-primary-900/50" },
  { label: "Quizzes Taken", icon: <BookOpen   size={18} className="text-accent-400" />,   bg: "bg-accent-900/30",   iconBg: "bg-accent-900/50"  },
  { label: "Avg. Score",    icon: <TrendingUp size={18} className="text-emerald-400" />,  bg: "bg-emerald-900/30",  iconBg: "bg-emerald-900/50" },
  { label: "Study Mins",    icon: <Flame      size={18} className="text-amber-400" />,    bg: "bg-amber-900/30",    iconBg: "bg-amber-900/50"   },
];

export default function DashboardPage() {
  const [docs,    setDocs]    = useState<StudyDocument[]>([]);
  const [stats,   setStats]   = useState<UserStats | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDocs(getStoredDocuments());
    setStats(getStoredStats());
    setMounted(true);
  }, []);

  if (!mounted || !stats) {
    return (
      <div className="animate-fade-in">
        <Topbar title="Dashboard" />
        <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
          <div className="skeleton h-48 w-full rounded-2xl" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="skeleton h-28 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const recentDocs   = docs.slice(0, 4);
  const hour         = new Date().getHours();
  const greeting     = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const docCount     = docs.length;
  const readyCount   = docs.filter(d => d.status === "ready").length;
  const progressPct  = Math.min(100, (stats.weeklyProgress / stats.weeklyGoal) * 100);

  const statValues = [
    docCount,
    stats.quizzesTaken,
    `${stats.averageScore}%`,
    stats.totalStudyMinutes,
  ];

  return (
    <div className="animate-fade-in">
      <Topbar title="Dashboard" />

      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">

        {/* ── Welcome Hero ─────────────────────────────────────────── */}
        <div className="relative overflow-hidden gradient-bg rounded-2xl p-6 md:p-8 text-white shadow-panel">
          {/* Decorative circles */}
          <div className="absolute -top-6 -right-6 w-40 h-40 border-[3px] border-white/10 rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 right-20 w-28 h-28 border-[2px] border-white/10 rounded-full pointer-events-none" />
          <div className="absolute top-10 right-40 w-8 h-8 bg-white/5 rounded-full pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 animate-slide-up">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={17} className="text-amber-300" />
                <span className="text-sm font-medium text-white/70">
                  {stats.studyStreak}-day streak 🔥
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">{greeting}, Alex!</h2>
              <p className="text-white/60 text-sm">
                {readyCount} {readyCount === 1 ? "document" : "documents"} ready &middot;&nbsp;
                {stats.weeklyGoal - stats.weeklyProgress} sessions to weekly goal
              </p>
            </div>

            <Link
              href="/library"
              className="btn-shine inline-flex items-center gap-2 px-5 py-3 bg-surface-700 text-surface-100 font-semibold rounded-xl hover:bg-surface-600 border border-surface-600 transition-all duration-200 shadow-md shrink-0 text-sm active:scale-95 animate-slide-up stagger-2"
            >
              <Upload size={15} className="text-primary-500" />
              Upload Notes
            </Link>
          </div>

          {/* Progress bar */}
          <div className="relative mt-6 pt-5 border-t border-white/15 animate-slide-up stagger-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-white/60">Weekly study goal</span>
              <span className="text-xs font-bold text-white">
                {stats.weeklyProgress}/{stats.weeklyGoal} sessions
              </span>
            </div>
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Stats Row ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STAT_META.map((meta, i) => (
            <Card
              key={meta.label}
              padding="md"
              glow="primary"
              className={clsx("animate-slide-up", `stagger-${i + 1}`)}
            >
              <div className={clsx("w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-transform duration-200 hover:scale-110", meta.iconBg)}>
                {meta.icon}
              </div>
              <p className="text-2xl font-bold text-surface-100 tabular-nums">
                {statValues[i]}
              </p>
              <p className="text-xs text-surface-400 mt-0.5">{meta.label}</p>
            </Card>
          ))}
        </div>

        {/* ── Main Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent Documents */}
          <div className="lg:col-span-2 space-y-4 animate-slide-up stagger-2">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-surface-100">Recent Documents</h2>
              <Link
                href="/library"
                className="text-sm text-primary-500 hover:text-primary-400 flex items-center gap-1 transition-colors group"
              >
                View all
                <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentDocs.length === 0 ? (
                <div className="text-center py-12 bg-surface-700 border border-surface-600 rounded-xl">
                  <p className="text-4xl mb-2 animate-float">📂</p>
                  <p className="text-sm font-medium text-surface-300">No documents yet</p>
                  <p className="text-xs text-surface-500 mt-1">Upload your first set of notes to get started</p>
                </div>
              ) : (
                recentDocs.map((doc, i) => (
                  <Link key={doc.id} href={`/documents/${doc.id}`}>
                    <Card
                      hover
                      glow="primary"
                      className={clsx("group animate-slide-up", `stagger-${i + 1}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-surface-600 flex items-center justify-center text-lg shrink-0 transition-transform duration-200 group-hover:scale-105">
                          {doc.fileType === "pdf" ? "📄" : doc.fileType === "docx" ? "📝" : "📃"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-surface-100 text-sm truncate group-hover:text-primary-400 transition-colors duration-150">
                            {doc.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {doc.course    && <span className="text-xs text-surface-400">{doc.course}</span>}
                            {doc.pageCount && <span className="text-xs text-surface-500">· {doc.pageCount} pages</span>}
                          </div>
                        </div>
                        <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-full shrink-0", STATUS_COLORS[doc.status])}>
                          {STATUS_LABELS[doc.status]}
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Recommendations sidebar */}
          <div className="space-y-4 animate-slide-up stagger-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-surface-100 flex items-center gap-2">
                <Sparkles size={15} className="text-accent-400 animate-pulse-glow" />
                Recommended
              </h2>
              <Link
                href="/recommendations"
                className="text-sm text-primary-500 hover:text-primary-400 flex items-center gap-1 transition-colors group"
              >
                See all
                <ArrowRight size={13} className="transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {MOCK_RECOMMENDATIONS.slice(0, 3).map((rec, i) => (
                <Card
                  key={rec.id}
                  hover
                  glow="accent"
                  padding="md"
                  className={clsx("animate-slide-up", `stagger-${i + 2}`)}
                >
                  <div className="flex gap-3">
                    <span className="text-2xl shrink-0 animate-float" style={{ animationDelay: `${i * 200}ms` }}>
                      {rec.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-surface-200 leading-snug mb-1">
                        {rec.title}
                      </p>
                      <p className="text-xs text-surface-400 leading-relaxed mb-2.5 line-clamp-2">
                        {rec.description}
                      </p>
                      {rec.documentId ? (
                        <Link
                          href={`/documents/${rec.documentId}`}
                          className="text-xs font-semibold text-primary-500 hover:text-primary-400 flex items-center gap-1 group transition-colors"
                        >
                          {rec.actionLabel}
                          <ArrowRight size={11} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                        </Link>
                      ) : (
                        <button className="text-xs font-semibold text-primary-500 hover:text-primary-400 flex items-center gap-1 group transition-colors">
                          {rec.actionLabel}
                          <ArrowRight size={11} className="transition-transform duration-150 group-hover:translate-x-0.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
