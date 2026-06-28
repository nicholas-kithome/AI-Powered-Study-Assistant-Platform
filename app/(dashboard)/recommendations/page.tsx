"use client";
import { useEffect, useState } from "react";
import Topbar from "@/components/app-shell/Topbar";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MOCK_RECOMMENDATIONS } from "@/lib/mock-data";
import { Recommendation } from "@/types";
import { Sparkles, Calendar, BookOpen, Star, RefreshCw, ChevronRight } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

export default function RecommendationsPage() {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRecs(MOCK_RECOMMENDATIONS);
    setMounted(true);
  }, []);

  const handleDelete = (id: string) => {
    setRecs((prev) => prev.filter((r) => r.id !== id));
  };

  if (!mounted) {
    return (
      <div>
        <Topbar title="Recommendations" />
        <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-4">
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-40 w-full" />
          <div className="skeleton h-40 w-full" />
        </div>
      </div>
    );
  }

  const priorityColors = {
    high: "red" as const,
    medium: "amber" as const,
    low: "blue" as const,
  };

  return (
    <div className="animate-fade-in">
      <Topbar breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Recommendations" }]} />

      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-surface-900 flex items-center gap-2">
              <Sparkles size={20} className="text-accent-500" />
              Study Recommendations
            </h1>
            <p className="text-sm text-surface-500 mt-1">AI-generated tasks to optimize your retention and prepare for tests.</p>
          </div>
          <Button variant="ghost" icon={<RefreshCw size={14} />} onClick={() => setRecs(MOCK_RECOMMENDATIONS)}>Reset</Button>
        </div>

        {recs.length === 0 ? (
          <Card padding="lg" className="text-center py-12">
            <Star size={40} className="text-surface-300 mx-auto mb-3" />
            <h3 className="font-semibold text-surface-800 mb-1">All caught up!</h3>
            <p className="text-sm text-surface-500">Upload more notes to receive new recommendations.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {recs.map((rec) => {
              return (
                <Card key={rec.id} padding="lg" className="relative group">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <span className="text-3xl bg-surface-50 p-2 rounded-xl shrink-0">{rec.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Badge variant={priorityColors[rec.priority]} dot size="sm">
                          {rec.priority.toUpperCase()} PRIORITY
                        </Badge>
                        {rec.documentTitle && (
                          <span className="text-xs text-surface-400 font-medium">In: {rec.documentTitle}</span>
                        )}
                      </div>
                      <h3 className="font-bold text-surface-900 text-base leading-snug mb-1">{rec.title}</h3>
                      <p className="text-sm text-surface-500 leading-relaxed mb-4">{rec.description}</p>

                      <div className="flex items-center gap-3">
                        {rec.documentId ? (
                          <Link href={`/documents/${rec.documentId}`}>
                            <Button size="sm" iconRight={<ChevronRight size={13} />}>{rec.actionLabel}</Button>
                          </Link>
                        ) : (
                          <Button size="sm">{rec.actionLabel}</Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(rec.id)}>Dismiss</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Timeline forecast */}
        <Card padding="lg" className="bg-surface-50/50">
          <h2 className="text-sm font-semibold text-surface-700 mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-primary-500" />
            Spaced Retention Timeline
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { day: "Today", task: "ML fundamentals quiz review" },
              { day: "Tomorrow", task: "Chemistry reaction mechanisms summary" },
              { day: "In 3 Days", task: "Macroeconomics review (GDP & Inflation)" },
            ].map((forecast, i) => (
              <div key={i} className="bg-white border border-surface-200 rounded-xl p-4 shadow-sm">
                <span className="text-xs font-bold text-primary-600 uppercase">{forecast.day}</span>
                <p className="text-sm font-semibold text-surface-800 mt-1">{forecast.task}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
