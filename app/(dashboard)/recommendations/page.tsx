"use client";
import { useEffect, useState } from "react";
import Topbar from "@/components/app-shell/Topbar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MOCK_RECOMMENDATIONS } from "@/lib/mock-data";
import { Recommendation } from "@/types";
import { Sparkles, Calendar, Star, RefreshCw, ChevronRight } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

const PRIORITY_GLOW: Record<string, string> = {
  high:   "hover:shadow-glow-red",
  medium: "hover:shadow-glow-amber",
  low:    "hover:shadow-glow-primary",
};

const PRIORITY_BORDER: Record<string, string> = {
  high:   "border-l-red-400",
  medium: "border-l-amber-400",
  low:    "border-l-primary-400",
};

export default function RecommendationsPage() {
  const [recs,    setRecs]    = useState<Recommendation[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRecs(MOCK_RECOMMENDATIONS);
    setMounted(true);
  }, []);

  const handleDelete = (id: string) =>
    setRecs((prev) => prev.filter((r) => r.id !== id));

  if (!mounted) {
    return (
      <div>
        <Topbar title="Recommendations" />
        <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
          <div className="skeleton h-12 w-full" />
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="skeleton h-36 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const priorityColors = {
    high:   "red"   as const,
    medium: "amber" as const,
    low:    "blue"  as const,
  };

  return (
    <div className="animate-fade-in">
      <Topbar breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Recommendations" }]} />

      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <h1 className="text-xl font-bold text-surface-900 flex items-center gap-2">
              <Sparkles size={20} className="text-accent-500 animate-pulse-glow" />
              Study Recommendations
            </h1>
            <p className="text-sm text-surface-500 mt-0.5">
              AI-generated tasks to optimize your retention and prepare for exams.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            icon={<RefreshCw size={13} />}
            onClick={() => setRecs(MOCK_RECOMMENDATIONS)}
          >
            Reset
          </Button>
        </div>

        {/* Empty state */}
        {recs.length === 0 ? (
          <Card padding="lg" className="text-center py-16 animate-scale-in">
            <Star size={44} className="text-surface-200 mx-auto mb-3 animate-float" />
            <h3 className="font-semibold text-surface-700 mb-1">All caught up!</h3>
            <p className="text-sm text-surface-400">Upload more notes to receive fresh recommendations.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {recs.map((rec, i) => (
              <div
                key={rec.id}
                className={clsx(
                  "bg-white rounded-card border border-surface-200 shadow-card",
                  "border-l-4 transition-all duration-200",
                  "hover:-translate-y-0.5 hover:shadow-card-hover",
                  PRIORITY_BORDER[rec.priority],
                  PRIORITY_GLOW[rec.priority],
                  "animate-slide-up"
                )}
                style={{ animationDelay: `${i * 50}ms`, padding: "1.5rem" }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Icon */}
                  <span
                    className="text-3xl bg-surface-50 p-2.5 rounded-xl shrink-0 animate-float"
                    style={{ animationDelay: `${i * 150}ms` }}
                  >
                    {rec.icon}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <Badge variant={priorityColors[rec.priority]} dot size="sm">
                        {rec.priority.toUpperCase()} PRIORITY
                      </Badge>
                      {rec.documentTitle && (
                        <span className="text-xs text-surface-400 font-medium">
                          In: {rec.documentTitle}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-surface-900 text-base leading-snug mb-1">
                      {rec.title}
                    </h3>
                    <p className="text-sm text-surface-500 leading-relaxed mb-4">
                      {rec.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2.5">
                      {rec.documentId ? (
                        <Link href={`/documents/${rec.documentId}`}>
                          <Button size="sm" shine iconRight={<ChevronRight size={13} />}>
                            {rec.actionLabel}
                          </Button>
                        </Link>
                      ) : (
                        <Button size="sm" shine>{rec.actionLabel}</Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(rec.id)}
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Spaced Retention Timeline */}
        <div
          className="animate-slide-up stagger-4"
          style={{ background: "linear-gradient(135deg, #f8fafc 0%, #f0fdfa 100%)", borderRadius: 16, border: "1px solid #e2e8f0", padding: "1.5rem" }}
        >
          <h2 className="text-sm font-semibold text-surface-700 mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-primary-500" />
            Spaced Retention Timeline
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { day: "Today",     accent: "bg-red-500",     task: "ML fundamentals quiz review" },
              { day: "Tomorrow",  accent: "bg-amber-500",   task: "Chemistry reaction mechanisms summary" },
              { day: "In 3 Days", accent: "bg-primary-500", task: "Macroeconomics review (GDP & Inflation)" },
            ].map((forecast, i) => (
              <div
                key={i}
                className="bg-white border border-surface-200 rounded-xl p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={clsx("w-2 h-2 rounded-full shrink-0", forecast.accent)} />
                  <span className="text-xs font-bold text-surface-700 uppercase tracking-wide">
                    {forecast.day}
                  </span>
                </div>
                <p className="text-sm font-semibold text-surface-800">{forecast.task}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
