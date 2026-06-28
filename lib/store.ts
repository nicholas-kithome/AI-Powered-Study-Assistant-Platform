"use client";

import { StudyDocument, Quiz, UserStats, ChatMessage } from "@/types";
import { MOCK_DOCUMENTS, MOCK_STATS, MOCK_QUIZ } from "./mock-data";

const DOCS_KEY = "study_docs";
const STATS_KEY = "study_stats";
const QUIZZES_KEY = "study_quizzes";
const CHATS_KEY = "study_chats_prefix_";

export function isClient() {
  return typeof window !== "undefined";
}

// ─── Documents ─────────────────────────────────────────────────────
export function getStoredDocuments(): StudyDocument[] {
  if (!isClient()) return MOCK_DOCUMENTS;
  const data = localStorage.getItem(DOCS_KEY);
  if (!data) {
    localStorage.setItem(DOCS_KEY, JSON.stringify(MOCK_DOCUMENTS));
    return MOCK_DOCUMENTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_DOCUMENTS;
  }
}

export function saveStoredDocuments(docs: StudyDocument[]) {
  if (!isClient()) return;
  localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
}

// ─── Stats ─────────────────────────────────────────────────────────
export function getStoredStats(): UserStats {
  if (!isClient()) return MOCK_STATS;
  const data = localStorage.getItem(STATS_KEY);
  if (!data) {
    localStorage.setItem(STATS_KEY, JSON.stringify(MOCK_STATS));
    return MOCK_STATS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return MOCK_STATS;
  }
}

export function saveStoredStats(stats: UserStats) {
  if (!isClient()) return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

// ─── Quizzes ───────────────────────────────────────────────────────
export function getStoredQuizzes(): Quiz[] {
  const defaultQuizzes = [MOCK_QUIZ];
  if (!isClient()) return defaultQuizzes;
  const data = localStorage.getItem(QUIZZES_KEY);
  if (!data) {
    localStorage.setItem(QUIZZES_KEY, JSON.stringify(defaultQuizzes));
    return defaultQuizzes;
  }
  try {
    return JSON.parse(data);
  } catch {
    return defaultQuizzes;
  }
}

export function saveStoredQuizzes(quizzes: Quiz[]) {
  if (!isClient()) return;
  localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
}

// ─── Chats ─────────────────────────────────────────────────────────
export function getStoredChat(docId: string): ChatMessage[] {
  if (!isClient()) return [];
  const data = localStorage.getItem(CHATS_KEY + docId);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveStoredChat(docId: string, messages: ChatMessage[]) {
  if (!isClient()) return;
  localStorage.setItem(CHATS_KEY + docId, JSON.stringify(messages));
}
