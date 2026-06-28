"use client";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Sparkles, Check } from "lucide-react";
import { clsx } from "clsx";

const STRENGTHS = [
  { label: "At least 8 characters", check: (p: string) => p.length >= 8 },
  { label: "Contains a number", check: (p: string) => /\d/.test(p) },
  { label: "Contains special character", check: (p: string) => /[^a-zA-Z0-9]/.test(p) },
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const passwordStrength = STRENGTHS.filter((s) => s.check(password)).length;
  const strengthColors = ["bg-red-400", "bg-amber-400", "bg-emerald-400"];
  const strengthLabels = ["Weak", "Fair", "Strong"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (!agreed) { setError("Please accept the terms to continue."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { window.location.href = "/dashboard"; }, 1400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl text-surface-900">StudyAI</span>
          </Link>
          <h1 className="text-2xl font-bold text-surface-900 mb-1">Create your account</h1>
          <p className="text-surface-500 text-sm">Start studying smarter — it&apos;s free</p>
        </div>

        <div className="bg-white rounded-2xl shadow-panel border border-surface-200 p-8">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-surface-200 rounded-xl text-sm font-medium text-surface-700 hover:bg-surface-50 hover:border-surface-300 transition-all mb-6 shadow-card">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-surface-200" />
            <span className="text-xs text-surface-400">or create with email</span>
            <div className="flex-1 h-px bg-surface-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5" htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-900 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5" htmlFor="signup-email">Email address</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.edu"
                className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-900 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5" htmlFor="signup-password">Password</label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-xl text-sm text-surface-900 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all pr-11"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-3 space-y-2">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className={clsx("h-1 flex-1 rounded-full transition-colors", i < passwordStrength ? strengthColors[passwordStrength - 1] : "bg-surface-200")} />
                    ))}
                  </div>
                  <p className="text-xs text-surface-500">{passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : "Too weak"}</p>
                  <div className="space-y-1">
                    {STRENGTHS.map((s) => (
                      <div key={s.label} className={clsx("flex items-center gap-2 text-xs", s.check(password) ? "text-emerald-600" : "text-surface-400")}>
                        <Check size={11} className={s.check(password) ? "opacity-100" : "opacity-30"} />
                        {s.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-primary-600"
              />
              <label htmlFor="terms" className="text-sm text-surface-600">
                I agree to the{" "}
                <a href="#" className="text-primary-600 hover:text-primary-800">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-primary-600 hover:text-primary-800">Privacy Policy</a>
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-sm text-sm mt-2",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? "Creating account..." : "Create free account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-surface-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-600 font-semibold hover:text-primary-800">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
