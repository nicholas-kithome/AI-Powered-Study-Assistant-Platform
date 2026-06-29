"use client";
import Link from "next/link";
import { ArrowRight, Upload, Sparkles, BookOpen, MessageSquare, Star, CheckCircle2, Play } from "lucide-react";

const FEATURES = [
  {
    icon: <Upload className="text-primary-500" size={22} />,
    title: "Upload Anything",
    description: "Drag and drop PDFs, DOCX, or text files. We handle the rest — extraction, indexing, and AI readiness.",
    bg: "bg-surface-700",
  },
  {
    icon: <Sparkles className="text-primary-500" size={22} />,
    title: "AI Summaries",
    description: "Get concise, detailed, or exam-focused summaries generated from your exact content in seconds.",
    bg: "bg-surface-700",
  },
  {
    icon: <BookOpen className="text-accent-500" size={22} />,
    title: "Smart Quizzes",
    description: "Generate MCQ quizzes at any difficulty level. Get explanations for every question and track weak topics.",
    bg: "bg-surface-700",
  },
  {
    icon: <MessageSquare className="text-primary-400" size={22} />,
    title: "Chat with Docs",
    description: "Ask questions directly about your uploaded material. Answers come with source references from your notes.",
    bg: "bg-surface-700",
  },
];

const WORKFLOW_STEPS = [
  { step: "01", label: "Upload", description: "Drop in your PDF or notes" },
  { step: "02", label: "Summarize", description: "Get an AI summary in seconds" },
  { step: "03", label: "Quiz", description: "Test your knowledge" },
  { step: "04", label: "Master", description: "Study smarter, not harder" },
];

const TESTIMONIALS = [
  {
    quote: "StudyAI turned my 50-page lecture notes into a quiz in under a minute. My exam prep has never been this efficient.",
    name: "Maya R.",
    role: "Computer Science, Year 3",
    avatar: "M",
  },
  {
    quote: "The chat feature is like having a tutor available 24/7 who has actually read all my course materials.",
    name: "James T.",
    role: "Pre-Med Student",
    avatar: "J",
  },
  {
    quote: "I went from barely passing to top of my class after using the spaced review recommendations.",
    name: "Sofia K.",
    role: "Law Student",
    avatar: "S",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-800 text-surface-200">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-surface-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-bold text-surface-100 text-lg tracking-tight">StudyAI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-surface-300 hover:text-surface-100 px-3 py-2 rounded-lg hover:bg-surface-700 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-surface-800 pt-20 pb-24 px-4">
        {/* Background blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-900/20 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute top-48 -left-16 w-72 h-72 bg-accent-900/20 rounded-full blur-3xl opacity-30 pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-900/40 border border-primary-500/30 rounded-full text-primary-400 text-xs font-semibold mb-6 animate-fade-in">
            <Sparkles size={12} />
            AI-powered study assistant for students
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-surface-100 leading-tight mb-6 animate-slide-up">
            Study smarter with{" "}
            <span className="gradient-text">AI-powered</span>
            <br />
            notes &amp; quizzes
          </h1>

          <p className="text-lg sm:text-xl text-surface-400 max-w-2xl mx-auto mb-10 animate-slide-up">
            Upload your course material once. Get instant AI summaries, generate quizzes, chat with your documents, and receive personalized study recommendations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-900/50 hover:-translate-y-0.5"
            >
              Start studying for free
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3.5 bg-surface-700 text-surface-200 font-semibold rounded-xl border border-surface-600 hover:border-surface-500 hover:bg-surface-600 transition-all"
            >
              <Play size={16} className="text-primary-500" fill="currentColor" />
              View demo
            </Link>
          </div>

          {/* Hero card preview */}
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-surface-700 rounded-2xl shadow-panel border border-surface-600 overflow-hidden">
              <div className="bg-surface-800 border-b border-surface-600 px-6 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-surface-400 text-xs font-mono ml-2">Introduction to Machine Learning.pdf</span>
              </div>
              <div className="p-6 text-left space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-surface-800 text-primary-400 text-xs font-semibold rounded-full border border-surface-600 flex items-center gap-1">
                    <Sparkles size={10} />AI Generated
                  </span>
                  <span className="text-xs text-surface-400">Exam-focused summary • 42 pages → 5 min read</span>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-surface-600 rounded-full w-3/4" />
                  <div className="h-4 bg-surface-600 rounded-full w-full" />
                  <div className="h-4 bg-surface-600 rounded-full w-5/6" />
                  <div className="h-4 bg-primary-900/50 rounded-full w-2/3" />
                  <div className="h-4 bg-surface-600 rounded-full w-full" />
                  <div className="h-4 bg-surface-600 rounded-full w-3/5" />
                </div>
                <div className="flex gap-2 pt-2">
                  <span className="px-3 py-1.5 bg-primary-600 text-white text-xs font-medium rounded-lg">Generate Quiz</span>
                  <span className="px-3 py-1.5 bg-surface-600 text-surface-200 text-xs font-medium rounded-lg border border-surface-500">Ask a Question</span>
                  <span className="px-3 py-1.5 bg-surface-600 text-surface-200 text-xs font-medium rounded-lg border border-surface-500">Copy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow steps */}
      <section className="py-20 px-4 bg-surface-800 border-y border-surface-700">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold tracking-widest text-primary-500 uppercase mb-3">How it works</p>
          <h2 className="text-3xl font-bold text-center text-surface-100 mb-12">
            From upload to mastery in minutes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {WORKFLOW_STEPS.map((s, i) => (
              <div key={i} className="relative text-center">
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-px bg-surface-700 -z-0" />
                )}
                <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-sm mb-4 mx-auto">
                  {s.step}
                </div>
                <h3 className="font-bold text-surface-100 mb-1">{s.label}</h3>
                <p className="text-sm text-surface-400">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-surface-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold tracking-widest text-primary-500 uppercase mb-3">Features</p>
          <h2 className="text-3xl font-bold text-center text-surface-100 mb-12">
            Everything you need to ace your exams
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex gap-4 p-6 bg-surface-700 rounded-2xl border border-surface-600 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5">
                <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center shrink-0`}>
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-surface-100 mb-1">{f.title}</h3>
                  <p className="text-sm text-surface-400 leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-surface-800 border-t border-surface-700">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold tracking-widest text-primary-500 uppercase mb-3">Social proof</p>
          <h2 className="text-3xl font-bold text-center text-surface-100 mb-12">
            Students love StudyAI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-surface-700 p-6 rounded-2xl border border-surface-600 shadow-card">
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(0).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-surface-300 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-surface-600 flex items-center justify-center text-surface-200 text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-surface-100 text-sm">{t.name}</p>
                    <p className="text-xs text-surface-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-surface-800">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-surface-700 border border-surface-600 rounded-full text-surface-300 text-xs font-semibold mb-6">
            <CheckCircle2 size={12} className="text-primary-500" />
            Free to get started — no credit card required
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-100 mb-4">
            Ready to study smarter?
          </h2>
          <p className="text-surface-400 mb-8">Join thousands of students who use StudyAI to turn passive reading into active learning.</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-900/50 hover:-translate-y-0.5 text-lg"
          >
            Start for free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-surface-700 py-8 px-4 bg-surface-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary-600 flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
            <span className="font-bold text-surface-300 text-sm">StudyAI</span>
          </div>
          <p className="text-xs text-surface-500">© 2026 StudyAI. Built for students, by students.</p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="text-xs text-surface-500 hover:text-surface-300 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
