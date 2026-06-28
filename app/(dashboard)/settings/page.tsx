"use client";
import { useEffect, useRef, useState } from "react";
import Topbar from "@/components/app-shell/Topbar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getStoredStats, saveStoredStats } from "@/lib/store";
import { UserStats } from "@/types";
import { User, Bell, Shield, Database, Sparkles, HardDrive, RefreshCw, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

const SETTINGS_NAV = [
  { label: "Profile",           icon: User,      active: true  },
  { label: "AI Preferences",    icon: Sparkles,  active: false },
  { label: "Notifications",     icon: Bell,      active: false },
  { label: "Security & Privacy",icon: Shield,    active: false },
  { label: "Data Controls",     icon: Database,  active: false },
];

export default function SettingsPage() {
  const [stats,        setStats]        = useState<UserStats | null>(null);
  const [mounted,      setMounted]      = useState(false);
  const [saving,       setSaving]       = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const [name,           setName]           = useState("Alex Johnson");
  const [email,          setEmail]          = useState("alex@university.edu");
  const [goal,           setGoal]           = useState(5);
  const [summaryPref,    setSummaryPref]    = useState("brief");
  const [difficultyPref, setDifficultyPref] = useState("medium");

  const storageBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStats(getStoredStats());
    setMounted(true);
    // Animate storage bar fill after mount
    setTimeout(() => {
      if (storageBarRef.current) {
        storageBarRef.current.style.width = "7.2%";
      }
    }, 300);
  }, []);

  const handleSave = () => {
    if (!stats) return;
    setSaving(true);
    setSavedMessage("");
    setTimeout(() => {
      const updated = { ...stats, weeklyGoal: Number(goal) };
      saveStoredStats(updated);
      setStats(updated);
      setSaving(false);
      setSavedMessage("Settings saved successfully!");
      setTimeout(() => setSavedMessage(""), 3000);
    }, 800);
  };

  const handleReset = () => {
    if (confirm("Are you sure? All documents, quizzes, and study progress will be lost.")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  const inputCls =
    "w-full px-3 py-2.5 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-900 " +
    "focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent focus:bg-white " +
    "transition-all duration-200 placeholder-surface-400";

  if (!mounted) {
    return (
      <div>
        <Topbar title="Settings" />
        <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
          <div className="skeleton h-10 w-40" />
          <div className="skeleton h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Topbar breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Settings" }]} />

      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
        <h1 className="text-xl font-bold text-surface-900 animate-slide-up">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* ── Settings Nav ──────────────────────────────────────── */}
          <div className="md:col-span-1 space-y-0.5 animate-slide-up">
            {SETTINGS_NAV.map(({ label, icon: Icon, active }, i) => (
              <button
                key={label}
                style={{ animationDelay: `${i * 40}ms` }}
                className={clsx(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left",
                  "relative border-l-2 animate-slide-up",
                  active
                    ? "bg-primary-50 text-primary-700 border-l-primary-500"
                    : "text-surface-600 hover:bg-surface-50 hover:text-surface-900 border-l-transparent"
                )}
              >
                <Icon size={16} className={active ? "text-primary-600" : "text-surface-400"} />
                {label}
              </button>
            ))}
          </div>

          {/* ── Main Form ─────────────────────────────────────────── */}
          <div className="md:col-span-2 space-y-5">

            {/* Profile */}
            <Card padding="lg" className="animate-slide-up stagger-1">
              <h2 className="text-base font-semibold text-surface-900 mb-5 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                  <User size={15} className="text-primary-600" />
                </div>
                Profile Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputCls}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputCls}
                      placeholder="you@university.edu"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">
                    Weekly Goal (Sessions)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={goal}
                    onChange={(e) => setGoal(Number(e.target.value))}
                    className={clsx(inputCls, "w-28")}
                  />
                  <p className="text-xs text-surface-400 mt-1.5">
                    Number of study sessions you aim to complete each week.
                  </p>
                </div>
              </div>
            </Card>

            {/* AI Preferences */}
            <Card padding="lg" className="animate-slide-up stagger-2">
              <h2 className="text-base font-semibold text-surface-900 mb-5 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-accent-50 flex items-center justify-center">
                  <Sparkles size={15} className="text-accent-600" />
                </div>
                Study & AI Preferences
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">
                    Default Summary Mode
                  </label>
                  <select
                    value={summaryPref}
                    onChange={(e) => setSummaryPref(e.target.value)}
                    className={inputCls}
                  >
                    <option value="brief">Brief — High-level bullet points</option>
                    <option value="detailed">Detailed — In-depth analysis</option>
                    <option value="exam">Exam-Focused — Key concepts & test questions</option>
                    <option value="outline">Outline — Chronological structure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">
                    Default Quiz Difficulty
                  </label>
                  <div className="flex gap-2">
                    {["easy", "medium", "hard"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDifficultyPref(d)}
                        className={clsx(
                          "px-4 py-2 rounded-xl border text-sm font-semibold capitalize transition-all duration-150 active:scale-95",
                          difficultyPref === d
                            ? "bg-primary-600 border-primary-600 text-white shadow-glow-primary"
                            : "bg-white border-surface-200 text-surface-600 hover:border-primary-300 hover:text-primary-600"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Storage */}
            <Card padding="lg" className="animate-slide-up stagger-3">
              <h2 className="text-base font-semibold text-surface-900 mb-5 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
                  <HardDrive size={15} className="text-amber-600" />
                </div>
                Storage Usage
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-surface-600">
                  <span>Standard Cloud Tier (Free)</span>
                  <span className="font-semibold text-surface-800">7.2 MB / 100 MB</span>
                </div>
                <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div
                    ref={storageBarRef}
                    className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-primary-500 rounded-full"
                    style={{ width: "0%", transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }}
                  />
                </div>
                <p className="text-xs text-surface-400">
                  Upgrade to Premium for up to 10 GB storage, longer PDFs, and faster document indexing.
                </p>
                <button className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors">
                  Upgrade to Premium →
                </button>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card
              padding="lg"
              className="border-red-100 bg-red-50/20 animate-slide-up stagger-4"
            >
              <h2 className="text-base font-semibold text-red-800 mb-2 flex items-center gap-2">
                ⚠️ Danger Zone
              </h2>
              <p className="text-sm text-surface-500 mb-4">
                Permanently clears all documents, quiz history, and study progress. This cannot be undone.
              </p>
              <Button
                variant="danger"
                size="sm"
                icon={<RefreshCw size={13} />}
                onClick={handleReset}
              >
                Reset All App Data
              </Button>
            </Card>

            {/* Save row */}
            <div className="flex items-center gap-3 animate-slide-up stagger-4">
              <Button onClick={handleSave} loading={saving} shine>
                {saving ? "Saving…" : "Save Changes"}
              </Button>
              {savedMessage && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-semibold animate-slide-up">
                  <CheckCircle2 size={15} />
                  {savedMessage}
                </span>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
