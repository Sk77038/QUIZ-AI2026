
import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../../types";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");
  return new GoogleGenAI({ apiKey });
};

export async function solveQuestion(prompt: string, language: 'en' | 'hi') {
  try {
    const ai = getAI();
    const system = language === 'hi' 
      ? "You are 'Master Sahab', a wise Indian teacher. Explain complex topics using simple Hinglish (Hindi + English). Provide step-by-step solutions."
      : "You are 'Master Sahab', a professional academic tutor. Provide clear, step-by-step solutions in English.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: `${system}\n\nQuestion: ${prompt}` }] }],
      config: { temperature: 0.7 }
    });
    return response.text || "I'm thinking... please try asking in a different way.";
  } catch (error) {
    console.error("AI Solve Error:", error);
    throw new Error("Master Sahab is busy. Try again or check your connection.");
  }
}

export async function generateAIQuiz(grade: string, subject: string): Promise<Question[]> {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: `Generate a 5-question MCQ quiz for Class ${grade}, Subject: ${subject}. Return valid JSON array.` }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text_en: { type: Type.STRING },
              text_hi: { type: Type.STRING },
              options_en: { type: Type.ARRAY, items: { type: Type.STRING } },
              options_hi: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.INTEGER },
              explanation_en: { type: Type.STRING },
              explanation_hi: { type: Type.STRING },
              difficulty: { type: Type.STRING },
              type: { type: Type.STRING }
            },
            required: ["id", "text_en", "text_hi", "options_en", "options_hi", "correctAnswer", "explanation_en", "explanation_hi"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Quiz Gen Error:", error);
    throw error;
  }
}

export async function solveWithImage(base64: string, language: 'en' | 'hi') {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64 } },
          { text: "Identify the academic question and solve it step-by-step in a friendly teacher tone." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Image Solve Error:", error);
    throw error;
  }
}
