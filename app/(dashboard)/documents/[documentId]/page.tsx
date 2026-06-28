"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Topbar from "@/components/app-shell/Topbar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { MOCK_DOCUMENTS, MOCK_SUMMARY_BRIEF, MOCK_SUMMARY_DETAILED, MOCK_SUMMARY_EXAM, MOCK_CHAT_MESSAGES } from "@/lib/mock-data";
import {
  Sparkles, Copy, RefreshCw, BookOpen, MessageSquare,
  FileText, ChevronDown, Send, Lightbulb, CheckCircle2,
} from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";
import { ChatMessage } from "@/types";

type Tab = "summary" | "quiz" | "chat" | "sources";
type SummaryMode = "brief" | "detailed" | "exam" | "outline";

const SUMMARIES: Record<SummaryMode, string> = {
  brief: MOCK_SUMMARY_BRIEF,
  detailed: MOCK_SUMMARY_DETAILED,
  exam: MOCK_SUMMARY_EXAM,
  outline: `## Topic Outline: Introduction to Machine Learning\n\n1. **What is Machine Learning?**\n   - Definition and scope\n   - Relationship to AI and statistics\n\n2. **Types of Machine Learning**\n   - 2.1 Supervised Learning\n     - Classification\n     - Regression\n   - 2.2 Unsupervised Learning\n     - Clustering\n     - Dimensionality Reduction\n   - 2.3 Reinforcement Learning\n\n3. **The ML Pipeline**\n   - Data collection\n   - Feature engineering\n   - Model training & evaluation\n   - Deployment\n\n4. **Key Algorithms**\n   - Linear/Logistic Regression\n   - Decision Trees & Random Forests\n   - Support Vector Machines\n   - Neural Networks\n   - K-Means, PCA\n\n5. **Model Evaluation**\n   - Train/Validation/Test split\n   - Overfitting & underfitting\n   - Bias-variance tradeoff\n   - Evaluation metrics`,
};

const SUGGESTED_PROMPTS = [
  "What is the bias-variance tradeoff?",
  "Explain gradient descent step by step",
  "What's the difference between classification and regression?",
  "When should I use Random Forest vs SVM?",
];

function renderMarkdown(content: string) {
  return content
    .replace(/^## (.+)$/gm, '<h2 class="text-base font-bold text-surface-900 mt-5 mb-2">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-bold text-surface-800 mt-4 mb-1.5">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-surface-900">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="bg-surface-100 text-primary-700 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-surface-700 text-sm before:content-[\'•\'] before:mr-2 before:text-surface-400">$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-surface-700 text-sm list-decimal list-inside">$1</li>')
    .replace(/^\| (.+) \|$/gm, (m) => {
      if (m.includes('---')) return '';
      const cells = m.split('|').filter(Boolean).map(c => `<td class="px-3 py-2 text-sm text-surface-700 border border-surface-200">${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    })
    .replace(/\n\n/g, '</p><p class="text-surface-700 text-sm mb-2">')
    .replace(/^(?!<[hltd]).+$/gm, (m) => m.trim() ? m : '');
}

export default function DocumentPage() {
  const { documentId } = useParams<{ documentId: string }>();
  const doc = MOCK_DOCUMENTS.find((d) => d.id === documentId) ?? MOCK_DOCUMENTS[0];

  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [summaryMode, setSummaryMode] = useState<SummaryMode>("brief");
  const [generating, setGenerating] = useState(false);
  const [summaryGenerated, setSummaryGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const handleGenerateSummary = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setSummaryGenerated(true); }, 1800);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(SUMMARIES[summaryMode]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (text?: string) => {
    const msg = text ?? chatInput;
    if (!msg.trim()) return;
    const newMsg: ChatMessage = { id: `msg-${Date.now()}`, role: "user", content: msg, timestamp: new Date().toISOString() };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");
    setChatLoading(true);
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content: "Based on your uploaded notes, this is a great question. The document covers this topic extensively in the relevant sections. Here's a summary of what your material says about this concept, with key points highlighted for exam preparation.",
        sources: [{ label: `${doc.title}, p. ${Math.floor(Math.random() * 30) + 1}` }],
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, reply]);
      setChatLoading(false);
    }, 1500);
  };

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "summary", label: "Summary", icon: <Sparkles size={15} /> },
    { id: "quiz", label: "Quiz", icon: <BookOpen size={15} /> },
    { id: "chat", label: "Chat", icon: <MessageSquare size={15} /> },
    { id: "sources", label: "Sources", icon: <FileText size={15} /> },
  ];

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <Topbar
        breadcrumbs={[
          { label: "Library", href: "/library" },
          { label: doc.title },
        ]}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left panel: doc info */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-surface-200 bg-white p-5 gap-4">
          <div className="w-12 h-12 rounded-xl bg-surface-100 flex items-center justify-center text-2xl">
            {doc.fileType === "pdf" ? "📄" : doc.fileType === "docx" ? "📝" : "📃"}
          </div>
          <div>
            <h2 className="font-bold text-surface-900 text-sm leading-snug mb-1">{doc.title}</h2>
            {doc.course && <p className="text-xs text-surface-400">{doc.course}</p>}
          </div>
          <div className="space-y-2 text-xs text-surface-500">
            {doc.pageCount && <div className="flex justify-between"><span>Pages</span><span className="font-medium text-surface-700">{doc.pageCount}</span></div>}
            {doc.wordCount && <div className="flex justify-between"><span>Words</span><span className="font-medium text-surface-700">{doc.wordCount.toLocaleString()}</span></div>}
            <div className="flex justify-between"><span>Type</span><span className="font-medium text-surface-700 uppercase">{doc.fileType}</span></div>
            <div className="flex justify-between"><span>Status</span>
              <Badge variant={doc.status === "ready" ? "green" : doc.status === "processing" ? "amber" : "red"} dot size="sm">
                {doc.status}
              </Badge>
            </div>
          </div>
          <hr className="border-surface-100" />
          <div className="space-y-2">
            <p className="text-xs font-semibold text-surface-500 uppercase tracking-wide">Quick Actions</p>
            <Link href="/quizzes/quiz-1">
              <button className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-surface-50 text-sm text-surface-700 transition-colors">
                <BookOpen size={15} className="text-violet-500" /> Generate Quiz
              </button>
            </Link>
            <button className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-surface-50 text-sm text-surface-700 transition-colors" onClick={() => setActiveTab("chat")}>
              <MessageSquare size={15} className="text-accent-500" /> Ask a Question
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Tab bar */}
          <div className="flex gap-1 px-4 md:px-6 pt-4 border-b border-surface-200 bg-white">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px",
                  activeTab === tab.id
                    ? "text-primary-700 border-primary-600 bg-primary-50"
                    : "text-surface-500 border-transparent hover:text-surface-800 hover:bg-surface-50"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">

            {/* Summary Tab */}
            {activeTab === "summary" && (
              <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex gap-2 flex-wrap">
                    {(["brief", "detailed", "exam", "outline"] as SummaryMode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setSummaryMode(m)}
                        className={clsx(
                          "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border",
                          summaryMode === m
                            ? "bg-primary-600 text-white border-primary-600"
                            : "bg-white text-surface-600 border-surface-200 hover:border-surface-300"
                        )}
                      >
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </button>
                    ))}
                  </div>
                  {!summaryGenerated && (
                    <Button size="sm" loading={generating} icon={<Sparkles size={13} />} onClick={handleGenerateSummary}>
                      {generating ? "Generating..." : "Generate Summary"}
                    </Button>
                  )}
                  {summaryGenerated && (
                    <div className="flex gap-2 ml-auto">
                      <Button size="sm" variant="secondary" icon={copied ? <CheckCircle2 size={13} className="text-emerald-500" /> : <Copy size={13} />} onClick={handleCopy}>
                        {copied ? "Copied!" : "Copy"}
                      </Button>
                      <Button size="sm" variant="ghost" icon={<RefreshCw size={13} />} onClick={() => { setSummaryGenerated(false); handleGenerateSummary(); }}>
                        Regenerate
                      </Button>
                    </div>
                  )}
                </div>

                {!summaryGenerated && !generating && (
                  <Card padding="lg">
                    <div className="text-center py-8">
                      <Sparkles size={40} className="text-primary-300 mx-auto mb-4" />
                      <h3 className="font-semibold text-surface-800 mb-2">Ready to generate your summary</h3>
                      <p className="text-sm text-surface-500 mb-6">Choose a mode above and click Generate Summary to get started.</p>
                      <Button onClick={handleGenerateSummary} icon={<Sparkles size={15} />}>Generate Summary</Button>
                    </div>
                  </Card>
                )}

                {generating && (
                  <Card padding="lg">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center ai-glow">
                          <Sparkles size={16} className="text-accent-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-surface-800">Generating {summaryMode} summary...</p>
                          <p className="text-xs text-surface-400">Reading 42 pages of content</p>
                        </div>
                      </div>
                      {[80, 100, 60, 90, 70].map((w, i) => (
                        <div key={i} className="skeleton h-4 rounded-full" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                  </Card>
                )}

                {summaryGenerated && (
                  <Card padding="lg" className="animate-fade-in">
                    <div className="flex items-center gap-2 mb-5 pb-4 border-b border-surface-100">
                      <div className="w-7 h-7 rounded-lg bg-accent-100 flex items-center justify-center">
                        <Sparkles size={14} className="text-accent-600" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-accent-700 uppercase tracking-wide">AI Generated</span>
                        <span className="text-xs text-surface-400 ml-2">· {summaryMode} mode · {doc.title}</span>
                      </div>
                    </div>
                    <div
                      className="ai-prose prose prose-sm max-w-none text-surface-700 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(SUMMARIES[summaryMode]) }}
                    />
                    <p className="mt-6 pt-4 border-t border-surface-100 text-xs text-surface-400 flex items-center gap-1.5">
                      <Lightbulb size={12} />
                      AI-generated content. Always verify against your original notes.
                    </p>
                  </Card>
                )}
              </div>
            )}

            {/* Quiz Tab */}
            {activeTab === "quiz" && (
              <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
                <Card padding="lg">
                  <h3 className="font-bold text-surface-900 mb-5">Quiz Settings</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Number of questions</label>
                      <div className="flex gap-2">
                        {[5, 10, 15, 20].map((n) => (
                          <button key={n} className="px-4 py-2 rounded-lg border border-surface-200 text-sm font-medium text-surface-600 hover:border-primary-400 hover:text-primary-700 transition-colors data-[selected=true]:bg-primary-600 data-[selected=true]:text-white data-[selected=true]:border-primary-600" data-selected={n === 5}>
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Difficulty</label>
                      <div className="flex gap-2">
                        {["Easy", "Medium", "Hard"].map((d) => (
                          <button key={d} className="px-4 py-2 rounded-lg border border-primary-200 bg-primary-50 text-sm font-medium text-primary-700 first:bg-primary-600 first:text-white first:border-primary-600 hover:border-primary-400 transition-colors">
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Question type</label>
                      <div className="flex gap-2">
                        {["Multiple Choice", "True / False", "Mixed"].map((t) => (
                          <button key={t} className="px-4 py-2 rounded-lg border border-surface-200 text-sm font-medium text-surface-600 hover:border-primary-400 hover:text-primary-700 transition-colors first:border-primary-600 first:text-primary-700 first:bg-primary-50">
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-100">
                    <Link href="/quizzes/quiz-1">
                      <Button icon={<Sparkles size={15} />} className="w-full justify-center">Generate Quiz</Button>
                    </Link>
                  </div>
                </Card>
              </div>
            )}

            {/* Chat Tab */}
            {activeTab === "chat" && (
              <div className="max-w-3xl mx-auto flex flex-col h-full animate-fade-in" style={{ minHeight: "400px" }}>
                <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                  {/* Suggested prompts */}
                  <div className="flex flex-wrap gap-2 pb-2">
                    {SUGGESTED_PROMPTS.map((p) => (
                      <button
                        key={p}
                        onClick={() => handleSendMessage(p)}
                        className="px-3 py-1.5 bg-surface-100 hover:bg-primary-50 hover:text-primary-700 border border-surface-200 hover:border-primary-200 rounded-full text-xs text-surface-600 transition-colors"
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={clsx("flex gap-3", msg.role === "user" ? "flex-row-reverse" : "flex-row")}>
                      <div className={clsx(
                        "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                        msg.role === "user" ? "bg-primary-600 text-white" : "bg-gradient-to-br from-accent-400 to-primary-400 text-white"
                      )}>
                        {msg.role === "user" ? "A" : <Sparkles size={12} />}
                      </div>
                      <div className={clsx("max-w-[78%] space-y-2", msg.role === "user" ? "items-end" : "items-start")}>
                        <div className={clsx(
                          "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-primary-600 text-white rounded-tr-sm"
                            : "bg-white border border-surface-200 text-surface-800 rounded-tl-sm shadow-card"
                        )}
                          dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
                        />
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {msg.sources.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-primary-50 border border-primary-100 text-primary-700 text-xs rounded-full font-medium">
                                📎 {s.label}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {chatLoading && (
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent-400 to-primary-400 flex items-center justify-center">
                        <Sparkles size={12} className="text-white" />
                      </div>
                      <div className="px-4 py-3 bg-white border border-surface-200 rounded-2xl rounded-tl-sm shadow-card">
                        <div className="flex gap-1.5 items-center h-5">
                          <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Composer */}
                <div className="border border-surface-200 rounded-2xl bg-white shadow-card overflow-hidden">
                  <textarea
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                    placeholder="Ask anything about this document..."
                    rows={2}
                    className="w-full px-4 pt-3 pb-1 text-sm text-surface-800 placeholder-surface-400 resize-none focus:outline-none"
                  />
                  <div className="flex items-center justify-between px-3 pb-3">
                    <span className="text-xs text-surface-400">Shift+Enter for newline · Enter to send</span>
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!chatInput.trim() || chatLoading}
                      className="p-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 text-white rounded-xl transition-colors"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sources Tab */}
            {activeTab === "sources" && (
              <div className="max-w-2xl mx-auto animate-fade-in">
                <Card padding="lg">
                  <h3 className="font-bold text-surface-900 mb-4">Source Document</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-surface-50 rounded-xl border border-surface-200">
                      <span className="text-3xl">{doc.fileType === "pdf" ? "📄" : "📝"}</span>
                      <div>
                        <p className="font-semibold text-surface-900 text-sm">{doc.title}</p>
                        <p className="text-xs text-surface-400 mt-1">{doc.course} · {doc.pageCount} pages · {doc.fileType.toUpperCase()}</p>
                      </div>
                      <Badge variant="green" dot className="ml-auto">Ready</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-700 mb-3">AI Indexed Sections</p>
                      <div className="space-y-2">
                        {["Introduction & Overview (p. 1–8)", "Supervised Learning (p. 9–18)", "Unsupervised Learning (p. 19–26)", "Model Evaluation (p. 27–34)", "Advanced Algorithms (p. 35–42)"].map((section) => (
                          <div key={section} className="flex items-center justify-between px-4 py-2.5 bg-white border border-surface-200 rounded-lg">
                            <span className="text-sm text-surface-700">{section}</span>
                            <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
