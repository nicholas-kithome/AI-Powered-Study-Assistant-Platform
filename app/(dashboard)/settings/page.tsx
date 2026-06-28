"use client";
import { useEffect, useState } from "react";
import Topbar from "@/components/app-shell/Topbar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getStoredStats, saveStoredStats } from "@/lib/store";
import { UserStats } from "@/types";
import { User, Bell, Shield, Database, Sparkles, HardDrive, RefreshCw } from "lucide-react";
import { clsx } from "clsx";

export default function SettingsPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  // Fields
  const [name, setName] = useState("Alex Johnson");
  const [email, setEmail] = useState("alex@university.edu");
  const [goal, setGoal] = useState(5);
  const [summaryPref, setSummaryPref] = useState("brief");
  const [difficultyPref, setDifficultyPref] = useState("medium");

  useEffect(() => {
    setStats(getStoredStats());
    setMounted(true);
  }, []);

  const handleSave = () => {
    if (!stats) return;
    setSaving(true);
    setSavedMessage("");
    setTimeout(() => {
      const updatedStats = { ...stats, weeklyGoal: Number(goal) };
      saveStoredStats(updatedStats);
      setStats(updatedStats);
      setSaving(false);
      setSavedMessage("Settings saved successfully!");
      setTimeout(() => setSavedMessage(""), 3000);
    }, 1000);
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to clear all data? This will reset all documents, quizzes, and study progress.")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  if (!mounted) {
    return (
      <div>
        <Topbar title="Settings" />
        <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-4">
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Topbar breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Settings" }]} />

      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
        <h1 className="text-xl font-bold text-surface-900">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Navigation Links */}
          <div className="md:col-span-1 space-y-1">
            {[
              { label: "Profile", icon: <User size={16} />, active: true },
              { label: "AI Preferences", icon: <Sparkles size={16} />, active: false },
              { label: "Notifications", icon: <Bell size={16} />, active: false },
              { label: "Security & Privacy", icon: <Shield size={16} />, active: false },
              { label: "Data Controls", icon: <Database size={16} />, active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={clsx(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left",
                  item.active
                    ? "bg-primary-50 text-primary-700 border border-primary-100"
                    : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-2 space-y-6">
            <Card padding="lg">
              <h2 className="text-base font-semibold text-surface-900 mb-4 flex items-center gap-2">
                <User size={18} className="text-primary-600" />
                Profile Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">Weekly Goal (Sessions)</label>
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={goal}
                    onChange={(e) => setGoal(Number(e.target.value))}
                    className="w-24 px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-xs text-surface-400 mt-1">Number of study sessions you aim to complete each week.</p>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <h2 className="text-base font-semibold text-surface-900 mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-accent-500" />
                Study &amp; AI Preferences
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">Default Summary Mode</label>
                  <select
                    value={summaryPref}
                    onChange={(e) => setSummaryPref(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-50 border border-surface-200 rounded-lg text-sm text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="brief">Brief (High-level bullet points)</option>
                    <option value="detailed">Detailed (In-depth analysis)</option>
                    <option value="exam">Exam-Focused (Crucial concepts &amp; test questions)</option>
                    <option value="outline">Outline (Chronological structure)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-surface-500 uppercase tracking-wide mb-1.5">Default Quiz Difficulty</label>
                  <div className="flex gap-2">
                    {["easy", "medium", "hard"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDifficultyPref(d)}
                        className={clsx(
                          "px-4 py-2 rounded-lg border text-sm font-semibold capitalize transition-all",
                          difficultyPref === d
                            ? "bg-primary-600 border-primary-600 text-white shadow-sm"
                            : "bg-white border-surface-200 text-surface-600 hover:border-surface-300"
                        )}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card padding="lg">
              <h2 className="text-base font-semibold text-surface-900 mb-4 flex items-center gap-2">
                <HardDrive size={18} className="text-amber-500" />
                Storage Usage
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-surface-600">
                  <span>Standard Cloud Tier (Free)</span>
                  <span className="font-semibold">7.2 MB / 100 MB</span>
                </div>
                <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-primary-500 rounded-full" style={{ width: "7.2%" }} />
                </div>
                <p className="text-xs text-surface-400">Upgrade to Premium to get up to 10 GB storage limits, longer PDFs, and faster document indexing.</p>
              </div>
            </Card>

            <Card padding="lg" className="border-red-100 bg-red-50/20">
              <h2 className="text-base font-semibold text-red-800 mb-3 flex items-center gap-2">
                ⚠️ Danger Zone
              </h2>
              <p className="text-sm text-surface-500 mb-4">Once you delete your data, it cannot be undone. Please proceed with caution.</p>
              <div className="flex gap-3">
                <Button variant="danger" size="sm" icon={<RefreshCw size={14} />} onClick={handleReset}>Reset All App Data</Button>
              </div>
            </Card>

            <div className="flex items-center gap-3">
              <Button onClick={handleSave} loading={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              {savedMessage && (
                <span className="text-sm text-emerald-600 font-semibold animate-fade-in">{savedMessage}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
