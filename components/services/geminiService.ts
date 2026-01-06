
import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../../types";

const getAI = () => {
  // Use a strictly safe check for the API key
  const apiKey = (process.env.API_KEY || "").trim();
  if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
    return null;
  };
  try {
    return new GoogleGenAI({ apiKey });
  } catch (e) {
    console.error("AI Init Failed:", e);
    return null;
  }
};

export async function solveQuestion(prompt: string, language: 'en' | 'hi') {
  try {
    const ai = getAI();
    if (!ai) return "Master Sahab is currently in Offline Mode. I can help with quizzes, but for complex AI answers, please check your internet.";

    const system = language === 'hi' 
      ? "You are 'Master Sahab', a wise Indian teacher. Explain complex topics using simple Hinglish (Hindi + English). Provide step-by-step solutions for students."
      : "You are 'Master Sahab', a professional academic tutor. Provide clear, step-by-step solutions in English suitable for school students.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: `${system}\n\nQuestion: ${prompt}` }] }],
      config: { temperature: 0.7 }
    });
    return response.text || "I am thinking... please try asking in a different way or check your internet.";
  } catch (error) {
    console.error("AI Solve Error:", error);
    return "Guru is taking a short break (Offline). Use our Master Quizzes in the meantime!";
  }
}

export async function generateAIQuiz(grade: string, subject: string): Promise<Question[]> {
  try {
    const ai = getAI();
    if (!ai) return [];

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: `Generate 5 multiple choice questions for Class ${grade}, Subject: ${subject}. Follow the JSON schema strictly. Languages: en and hi.` }] }],
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
    console.error("Quiz Generation Failure:", error);
    return [];
  }
}

export async function solveWithImage(base64: string, language: 'en' | 'hi') {
  try {
    const ai = getAI();
    if (!ai) return "Scanner needs an active internet connection to process images via AI.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64 } },
          { text: "Identify the student's question in this image and explain the solution simply as 'Master Sahab' tutor." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Image Processing Error:", error);
    return "Master Sahab couldn't read the image. Please snap a clearer photo or check your network.";
  }
}
