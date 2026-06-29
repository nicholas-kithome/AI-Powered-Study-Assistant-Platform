import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { MOCK_DOCUMENT_TEXT } from '@/lib/mock-data';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { mode } = await req.json(); // "brief", "detailed", "exam", or "outline"

    let modePrompt = "";
    switch (mode) {
      case "brief":
        modePrompt = "Create a very brief, high-level summary of the document (1-2 paragraphs max) focusing only on the core definitions.";
        break;
      case "detailed":
        modePrompt = "Create a detailed, comprehensive summary broken down by sections. Explain concepts thoroughly.";
        break;
      case "exam":
        modePrompt = "Create an exam-focused study guide. Highlight must-know definitions, high-yield concepts, and potential trick questions.";
        break;
      case "outline":
        modePrompt = "Create a hierarchical, bulleted outline of the topics covered in the document. Do not include paragraphs of text.";
        break;
      default:
        modePrompt = "Create a brief summary.";
    }

    const result = await generateText({
      model: google('models/gemini-1.5-flash-latest'),
      prompt: `You are StudyAI, an expert educational summarizer. Based on the document provided below, fulfill the following request: ${modePrompt}
      
Please format your response in clean Markdown. Do NOT include any conversational filler (like "Here is your summary:"), just output the Markdown.

--- DOCUMENT START ---
${MOCK_DOCUMENT_TEXT}
--- DOCUMENT END ---`,
    });

    return new Response(JSON.stringify({ summary: result.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Summarize API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate summary' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
