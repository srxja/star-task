
import { GoogleGenAI, Type } from "@google/genai";
import { MissionBriefing } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getMissionBriefing = async (taskTitle: string): Promise<MissionBriefing> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a cool space-themed mission codename and a short 1-sentence 8-bit style motivational briefing for this task: "${taskTitle}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            codename: {
              type: Type.STRING,
              description: "A short space-themed codename, e.g., 'Project Nebula-9'",
            },
            motivationalQuote: {
              type: Type.STRING,
              description: "A short, gritty, futuristic military-style briefing sentence.",
            }
          },
          required: ["codename", "motivationalQuote"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      codename: "Operation Starfall",
      motivationalQuote: "Failure is not an option in the void."
    };
  }
};
