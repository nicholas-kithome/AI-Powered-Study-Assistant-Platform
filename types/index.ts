// Shared TypeScript types for the Study Assistant app

export type DocumentStatus = "uploading" | "processing" | "ready" | "failed";
export type FileType = "pdf" | "docx" | "txt";
export type SummaryMode = "brief" | "detailed" | "exam" | "outline";
export type Difficulty = "easy" | "medium" | "hard";
export type QuestionType = "mcq" | "true-false";

export interface StudyDocument {
  id: string;
  ownerId: string;
  title: string;
  course?: string;
  fileType: FileType;
  status: DocumentStatus;
  pageCount?: number;
  wordCount?: number;
  uploadedAt: string;
  updatedAt: string;
  size?: number; // bytes
  tags?: string[];
}

export interface GeneratedSummary {
  id: string;
  documentId: string;
  mode: SummaryMode;
  content: string;
  createdAt: string;
  wordCount: number;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  topic?: string;
  difficulty: Difficulty;
}

export interface Quiz {
  id: string;
  documentId: string;
  documentTitle: string;
  title: string;
  questions: QuizQuestion[];
  createdAt: string;
  difficulty: Difficulty;
  score?: number;
  completedAt?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SourceChip[];
  timestamp: string;
  isStreaming?: boolean;
}

export interface SourceChip {
  label: string;
  page?: number;
  excerpt?: string;
}

export interface Recommendation {
  id: string;
  type: "summarize" | "quiz" | "review" | "chat" | "deadline";
  title: string;
  description: string;
  documentId?: string;
  documentTitle?: string;
  priority: "high" | "medium" | "low";
  actionLabel: string;
  icon: string;
}

export interface UserStats {
  documentsUploaded: number;
  quizzesTaken: number;
  averageScore: number;
  studyStreak: number;
  totalStudyMinutes: number;
  weeklyGoal: number;
  weeklyProgress: number;
}
