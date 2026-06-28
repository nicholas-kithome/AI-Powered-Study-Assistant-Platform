"use client";
import { useState } from "react";
import Topbar from "@/components/app-shell/Topbar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { MOCK_QUIZ } from "@/lib/mock-data";
import { CheckCircle2, XCircle, ChevronLeft, ChevronRight, Clock, BookOpen, Trophy, RefreshCw, Sparkles, Lightbulb } from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";

type QuizPhase = "intro" | "taking" | "review" | "complete";

export default function QuizPage() {
  const quiz = MOCK_QUIZ;
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 min

  const q = quiz.questions[currentQ];
  const totalQ = quiz.questions.length;
  const answered = Object.keys(selected).length;
  const correct = quiz.questions.filter((_, i) => selected[i] === quiz.questions[i].answerIndex).length;
  const score = Math.round((correct / totalQ) * 100);
  const isRevealed = revealed[currentQ];
  const isCorrect = selected[currentQ] === q.answerIndex;

  const handleSelect = (choiceIdx: number) => {
    if (isRevealed) return;
    setSelected((prev) => ({ ...prev, [currentQ]: choiceIdx }));
  };

  const handleReveal = () => {
    setRevealed((prev) => ({ ...prev, [currentQ]: true }));
  };

  const handleNext = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ((c) => c + 1);
    } else {
      setPhase("complete");
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrentQ(0);
    setSelected({});
    setRevealed({});
    setTimeLeft(300);
  };

  const weakTopics = quiz.questions
    .filter((_, i) => selected[i] !== quiz.questions[i].answerIndex)
    .map((q) => q.topic)
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i) as string[];

  const SCORE_COLOR = score >= 80 ? "text-emerald-600" : score >= 60 ? "text-amber-600" : "text-red-600";
  const SCORE_BG = score >= 80 ? "bg-emerald-50 border-emerald-200" : score >= 60 ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200";

  return (
    <div className="animate-fade-in">
      <Topbar
        breadcrumbs={[
          { label: "Library", href: "/library" },
          { label: quiz.documentTitle, href: `/documents/${quiz.documentId}` },
          { label: "Quiz" },
        ]}
      />

      <div className="p-4 md:p-8 max-w-3xl mx-auto">
        {/* Intro */}
        {phase === "intro" && (
          <div className="space-y-6 animate-slide-up">
            <Card padding="lg">
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={28} className="text-violet-600" />
                </div>
                <h1 className="text-2xl font-bold text-surface-900 mb-2">{quiz.title}</h1>
                <p className="text-surface-500 text-sm mb-6">From: {quiz.documentTitle}</p>
                <div className="flex justify-center gap-6 mb-8">
                  {[
                    { label: "Questions", value: totalQ },
                    { label: "Difficulty", value: quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1) },
                    { label: "Est. Time", value: `${totalQ} min` },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-xl font-bold text-surface-900">{s.value}</p>
                      <p className="text-xs text-surface-400">{s.label}</p>
                    </div>
                  ))}
                </div>
                <Button onClick={() => setPhase("taking")} icon={<Sparkles size={15} />} size="lg">
                  Start Quiz
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Taking */}
        {phase === "taking" && (
          <div className="space-y-4 animate-fade-in">
            {/* Progress */}
            <div className="flex items-center justify-between text-sm text-surface-600 mb-2">
              <span>Question {currentQ + 1} of {totalQ}</span>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-surface-400" />
                <span className="font-mono font-medium">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${((currentQ) / totalQ) * 100}%` }} />
            </div>

            <Card padding="lg">
              {/* Topic badge */}
              {q.topic && <Badge variant="gray" className="mb-4">{q.topic}</Badge>}

              <h2 className="text-base font-semibold text-surface-900 leading-relaxed mb-6">{q.prompt}</h2>

              {/* Choices */}
              <div className="space-y-3">
                {q.choices.map((choice, i) => {
                  const isSelected = selected[currentQ] === i;
                  const isAnswer = q.answerIndex === i;
                  let style = "border-surface-200 bg-white text-surface-700 hover:border-primary-300 hover:bg-primary-50";
                  if (isRevealed) {
                    if (isAnswer) style = "border-emerald-400 bg-emerald-50 text-emerald-800";
                    else if (isSelected && !isAnswer) style = "border-red-400 bg-red-50 text-red-800";
                    else style = "border-surface-200 bg-surface-50 text-surface-400";
                  } else if (isSelected) {
                    style = "border-primary-400 bg-primary-50 text-primary-800";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={isRevealed}
                      className={clsx(
                        "w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 text-sm font-medium transition-all duration-150",
                        style
                      )}
                    >
                      <span className={clsx(
                        "w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold",
                        isRevealed && isAnswer ? "bg-emerald-500 border-emerald-500 text-white" :
                        isRevealed && isSelected ? "bg-red-500 border-red-500 text-white" :
                        isSelected ? "bg-primary-600 border-primary-600 text-white" : "border-current"
                      )}>
                        {isRevealed && isAnswer ? <CheckCircle2 size={14} /> :
                         isRevealed && isSelected ? <XCircle size={14} /> :
                         String.fromCharCode(65 + i)}
                      </span>
                      {choice}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isRevealed && (
                <div className={clsx(
                  "mt-5 p-4 rounded-xl border",
                  isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200"
                )}>
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={15} className={isCorrect ? "text-emerald-600" : "text-amber-600"} />
                    <span className={clsx("text-sm font-semibold", isCorrect ? "text-emerald-800" : "text-amber-800")}>
                      {isCorrect ? "Correct!" : "Not quite — here's why:"}
                    </span>
                  </div>
                  <p className="text-sm text-surface-700">{q.explanation}</p>
                </div>
              )}
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                icon={<ChevronLeft size={15} />}
                onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
                disabled={currentQ === 0}
              >
                Previous
              </Button>
              <div className="flex gap-2">
                {selected[currentQ] !== undefined && !isRevealed && (
                  <Button variant="secondary" onClick={handleReveal}>Check Answer</Button>
                )}
                {isRevealed && (
                  <Button onClick={handleNext} iconRight={<ChevronRight size={15} />}>
                    {currentQ === totalQ - 1 ? "Finish Quiz" : "Next Question"}
                  </Button>
                )}
              </div>
            </div>

            {/* Question navigator */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-surface-100">
              {quiz.questions.map((_, i) => {
                const isAnswered = selected[i] !== undefined;
                const isReviewedQ = revealed[i];
                const isCorrectQ = selected[i] === quiz.questions[i].answerIndex;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentQ(i)}
                    className={clsx(
                      "w-8 h-8 rounded-lg text-xs font-bold transition-colors",
                      i === currentQ ? "ring-2 ring-primary-500 ring-offset-1" : "",
                      isReviewedQ && isCorrectQ ? "bg-emerald-100 text-emerald-700" :
                      isReviewedQ && !isCorrectQ ? "bg-red-100 text-red-700" :
                      isAnswered ? "bg-primary-100 text-primary-700" :
                      "bg-surface-100 text-surface-500"
                    )}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Complete */}
        {phase === "complete" && (
          <div className="space-y-6 animate-slide-up">
            <Card padding="lg">
              <div className="text-center py-4">
                <Trophy size={48} className={clsx("mx-auto mb-4", score >= 80 ? "text-amber-400" : score >= 60 ? "text-surface-400" : "text-surface-300")} />
                <h2 className="text-2xl font-bold text-surface-900 mb-1">Quiz Complete!</h2>
                <p className="text-surface-500 text-sm mb-6">{quiz.title}</p>
                <div className={clsx("inline-flex flex-col items-center px-8 py-5 rounded-2xl border-2 mb-6", SCORE_BG)}>
                  <span className={clsx("text-5xl font-extrabold", SCORE_COLOR)}>{score}%</span>
                  <span className="text-sm text-surface-500 mt-1">{correct} of {totalQ} correct</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Correct", value: correct, color: "text-emerald-600" },
                    { label: "Incorrect", value: totalQ - correct, color: "text-red-600" },
                    { label: "Score", value: `${score}%`, color: SCORE_COLOR },
                  ].map((s) => (
                    <div key={s.label} className="bg-surface-50 rounded-xl p-3">
                      <p className={clsx("text-xl font-bold", s.color)}>{s.value}</p>
                      <p className="text-xs text-surface-400">{s.label}</p>
                    </div>
                  ))}
                </div>

                {weakTopics.length > 0 && (
                  <div className="mb-6 text-left p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                      <Lightbulb size={15} />
                      Weak topics to review:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {weakTopics.map((t) => (
                        <Badge key={t} variant="amber">{t}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 justify-center">
                  <Button variant="secondary" icon={<RefreshCw size={15} />} onClick={handleRestart}>Retake Quiz</Button>
                  <Link href={`/documents/${quiz.documentId}`}>
                    <Button icon={<BookOpen size={15} />}>Back to Document</Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Answer review */}
            <div className="space-y-3">
              <h3 className="font-bold text-surface-900">Answer Review</h3>
              {quiz.questions.map((question, i) => {
                const userAnswer = selected[i];
                const isCorrectAnswer = userAnswer === question.answerIndex;
                return (
                  <Card key={i} padding="md">
                    <div className="flex gap-3">
                      <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5", isCorrectAnswer ? "bg-emerald-100" : "bg-red-100")}>
                        {isCorrectAnswer
                          ? <CheckCircle2 size={14} className="text-emerald-600" />
                          : <XCircle size={14} className="text-red-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-surface-900 mb-2">{question.prompt}</p>
                        <p className="text-xs text-surface-500">
                          Your answer: <span className={isCorrectAnswer ? "text-emerald-700 font-medium" : "text-red-700 font-medium"}>{userAnswer !== undefined ? question.choices[userAnswer] : "Not answered"}</span>
                        </p>
                        {!isCorrectAnswer && (
                          <p className="text-xs text-surface-500 mt-0.5">
                            Correct: <span className="text-emerald-700 font-medium">{question.choices[question.answerIndex]}</span>
                          </p>
                        )}
                        <p className="text-xs text-surface-400 mt-2 italic">{question.explanation}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
