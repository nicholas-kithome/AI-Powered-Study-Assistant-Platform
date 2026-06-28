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
  ready: "status-ready",
  processing: "status-processing",
  uploading: "status-uploading",
  failed: "status-failed",
};

const STATUS_LABELS: Record<string, string> = {
  ready: "Ready",
  processing: "Processing",
  uploading: "Uploading",
  failed: "Failed",
};

export default function DashboardPage() {
  const [docs, setDocs] = useState<StudyDocument[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
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

  const recentDocs = docs.slice(0, 4);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Calculate dynamic stats
  const docCount = docs.length;
  const readyCount = docs.filter(d => d.status === 'ready').length;

  return (
    <div className="animate-fade-in">
      <Topbar title="Dashboard" />

      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Welcome + Upload CTA */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 rounded-2xl p-6 md:p-8 text-white shadow-panel">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-4 right-8 w-32 h-32 border-4 border-white rounded-full" />
            <div className="absolute -bottom-4 right-24 w-20 h-20 border-2 border-white rounded-full" />
          </div>
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Flame size={18} className="text-amber-300" />
                <span className="text-sm font-medium text-primary-200">{stats.studyStreak}-day study streak 🔥</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-1">{greeting}, Alex!</h2>
              <p className="text-primary-200 text-sm">
                You have {readyCount} {readyCount === 1 ? "document" : "documents"} ready to study and {stats.weeklyGoal - stats.weeklyProgress} sessions to reach your weekly goal.
              </p>
            </div>
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow-sm shrink-0 text-sm"
            >
              <Upload size={16} />
              Upload Notes
            </Link>
          </div>

          {/* Weekly progress */}
          <div className="relative mt-6 pt-5 border-t border-primary-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-primary-200">Weekly study goal</span>
              <span className="text-xs font-bold text-white">{stats.weeklyProgress}/{stats.weeklyGoal} sessions</span>
            </div>
            <div className="h-2 bg-primary-500 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Documents", value: docCount, icon: <FileText size={18} className="text-primary-500" />, bg: "bg-primary-50" },
            { label: "Quizzes Taken", value: stats.quizzesTaken, icon: <BookOpen size={18} className="text-violet-500" />, bg: "bg-violet-50" },
            { label: "Avg. Score", value: `${stats.averageScore}%`, icon: <TrendingUp size={18} className="text-emerald-500" />, bg: "bg-emerald-50" },
            { label: "Study Minutes", value: stats.totalStudyMinutes, icon: <Flame size={18} className="text-amber-500" />, bg: "bg-amber-50" },
          ].map((stat) => (
            <Card key={stat.label} padding="md">
              <div className={clsx("w-9 h-9 rounded-lg flex items-center justify-center mb-3", stat.bg)}>
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-surface-900">{stat.value}</p>
              <p className="text-xs text-surface-500 mt-0.5">{stat.label}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Documents */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-surface-900">Recent Documents</h2>
              <Link href="/library" className="text-sm text-primary-600 hover:text-primary-800 flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {recentDocs.length === 0 ? (
                <div className="text-center py-10 bg-white border border-surface-200 rounded-xl">
                  <p className="text-3xl mb-2">📂</p>
                  <p className="text-sm text-surface-500">No documents uploaded yet.</p>
                </div>
              ) : (
                recentDocs.map((doc) => (
                  <Link key={doc.id} href={`/documents/${doc.id}`}>
                    <Card hover className="group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center text-lg shrink-0">
                          {doc.fileType === "pdf" ? "📄" : doc.fileType === "docx" ? "📝" : "📃"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-surface-900 text-sm truncate group-hover:text-primary-700 transition-colors">
                            {doc.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {doc.course && <span className="text-xs text-surface-400">{doc.course}</span>}
                            {doc.pageCount && <span className="text-xs text-surface-300">· {doc.pageCount} pages</span>}
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

          {/* Recommendations */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-surface-900 flex items-center gap-2">
                <Sparkles size={16} className="text-accent-500" />
                Recommended
              </h2>
              <Link href="/recommendations" className="text-sm text-primary-600 hover:text-primary-800 flex items-center gap-1">
                See all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {MOCK_RECOMMENDATIONS.slice(0, 3).map((rec) => (
                <Card key={rec.id} hover padding="md">
                  <div className="flex gap-3">
                    <span className="text-2xl shrink-0">{rec.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-surface-800 leading-snug mb-1">{rec.title}</p>
                      <p className="text-xs text-surface-500 leading-relaxed mb-3 line-clamp-2">{rec.description}</p>
                      {rec.documentId ? (
                        <Link href={`/documents/${rec.documentId}`} className="text-xs font-semibold text-primary-600 hover:text-primary-800 flex items-center gap-1">
                          {rec.actionLabel} <ArrowRight size={11} />
                        </Link>
                      ) : (
                        <button className="text-xs font-semibold text-primary-600 hover:text-primary-800 flex items-center gap-1">
                          {rec.actionLabel} <ArrowRight size={11} />
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
