import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function sendMessage(
  message: string,
  history: Message[] = []
): Promise<string> {
  try {
    // Convert message history to Gemini format
    const contents = history.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Add the new user message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    const text = response.text;
    return text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error(`Failed to send message: ${error}`);
  }
}
