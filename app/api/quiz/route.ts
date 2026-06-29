import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { MOCK_DOCUMENT_TEXT } from '@/lib/mock-data';

export const maxDuration = 30;

const QuizQuestionSchema = z.object({
  id: z.string(),
  prompt: z.string().describe('The question text'),
  choices: z.array(z.string()).length(4).describe('Exactly 4 answer choices'),
  answerIndex: z.number().min(0).max(3).describe('The index (0-3) of the correct choice'),
  explanation: z.string().describe('Explanation of why the answer is correct'),
  topic: z.string().describe('A short 1-3 word topic category for this question'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

const QuizSchema = z.object({
  title: z.string().describe('A catchy title for this quiz based on the document'),
  questions: z.array(QuizQuestionSchema),
});

export async function POST(req: Request) {
  try {
    const { numQuestions = 5, difficulty = 'Medium', questionType = 'Multiple Choice' } = await req.json();

    const result = await generateObject({
      model: google('models/gemini-1.5-flash-latest', {
        structuredOutputs: false, // Use standard JSON mode for Gemini 1.5 Flash if strict structured outputs fail
      }),
      schema: QuizSchema,
      prompt: `You are an expert teacher. Generate a ${difficulty.toLowerCase()} difficulty quiz containing exactly ${numQuestions} questions based on the document below.
The questions should be of type: ${questionType}.
      
--- DOCUMENT START ---
${MOCK_DOCUMENT_TEXT}
--- DOCUMENT END ---`,
    });

    return new Response(JSON.stringify({ quiz: result.object }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Quiz API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate quiz' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
