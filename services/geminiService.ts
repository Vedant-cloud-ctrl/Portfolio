import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "V.A. v1.0", a retro AI assistant running on Vedant Adhangale's portfolio website. 
Your persona is a helpful but slightly glitchy DOS-era terminal assistant. 
You speak in short, punchy sentences, sometimes using technical jargon, hex codes, or statistical terms. 
You know everything about Vedant Adhangale (fictionalized for this demo):
- Role: Aspiring Data Scientist & AI Enthusiast.
- Focus: Machine Learning, Deep Learning, Big Data Analytics.
- Skills: Python, R, TensorFlow, PyTorch, SQL, Data Visualization.
- Interests: Neural Networks, Cyberpunk literature, Chess, and solving complex algorithms.

If asked about something unrelated to the portfolio, data science, or tech, vaguely redirect to "SYSTEM ERROR: TOPIC OUT OF BOUNDS" but remain friendly.
Always format your response as plain text suitable for a retro terminal.
`;

export const sendMessageToGemini = async (message: string, history: { role: string, parts: { text: string }[] }[]): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash'; 
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "ERROR: NO DATA RECEIVED";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "CRITICAL FAILURE: CONNECTION LOST. RETRY PENDING...";
  }
};