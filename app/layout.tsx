import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyAI — AI-Powered Study Assistant",
  description: "Upload your notes and PDFs, get AI summaries, generate quizzes, and chat with your documents. Study smarter with StudyAI.",
  keywords: ["study assistant", "AI tutor", "PDF summarizer", "quiz generator", "student tools"],
  openGraph: {
    title: "StudyAI — AI-Powered Study Assistant",
    description: "Upload notes, get AI summaries, generate quizzes, and chat with your documents.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
