import { GoogleGenAI, Type } from "@google/genai";
import { Question, QuizSettings } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuiz = async (settings: QuizSettings): Promise<Question[]> => {
  const model = "gemini-2.5-flash";

  const prompt = `Generate a trivia quiz with 10 multiple-choice questions about "${settings.topic}". 
  The difficulty level should be ${settings.difficulty}.
  Each question must have 4 options and exactly one correct answer.
  Provide a short, interesting explanation for the correct answer.`;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            questionText: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Must contain exactly 4 distinct options."
            },
            correctAnswerIndex: {
              type: Type.INTEGER,
              description: "The zero-based index (0-3) of the correct option."
            },
            explanation: { type: Type.STRING }
          },
          required: ["questionText", "options", "correctAnswerIndex", "explanation"]
        }
      }
    }
  });

  const jsonText = response.text;
  if (!jsonText) {
    throw new Error("No data returned from Gemini");
  }

  const rawQuestions = JSON.parse(jsonText);
  
  // Add IDs and ensure structure
  return rawQuestions.map((q: any, index: number) => ({
    id: index,
    questionText: q.questionText,
    options: q.options,
    correctAnswerIndex: q.correctAnswerIndex,
    explanation: q.explanation
  }));
};
