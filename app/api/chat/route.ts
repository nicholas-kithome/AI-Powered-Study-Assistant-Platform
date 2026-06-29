import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { MOCK_DOCUMENT_TEXT } from '@/lib/mock-data';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('models/gemini-1.5-flash-latest'),
      messages,
      system: `You are StudyAI, an intelligent, helpful tutoring assistant. 
You are currently helping a student study and understand the following document:

--- DOCUMENT START ---
${MOCK_DOCUMENT_TEXT}
--- DOCUMENT END ---

Instructions:
1. Answer all user questions accurately based *only* on the provided document text. 
2. If the answer is not in the text, inform the user nicely that the current document doesn't cover that topic.
3. Use markdown formatting (bullet points, bold text, code blocks) to make your answers clear and easy to read.
4. Keep your tone encouraging and educational.`,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
