import { GoogleGenAI, Type } from "@google/genai";
import { Itinerary, ImageFile } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const fileToGenerativePart = (base64: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64,
      mimeType
    },
  };
};

export const generateItinerary = async (prompt: string, imageFile: ImageFile | null): Promise<Itinerary> => {
  const model = 'gemini-2.5-flash';
  
  const systemInstruction = `You are an expert travel agent AI named Voyara. Your goal is to create personalized, dynamic travel itineraries. Based on the user's request and optional inspiration photo, generate a complete, day-by-day travel itinerary. The itinerary should be optimized for a great experience, considering travel times, opening hours, and local insights. For each activity, provide a highly specific and actionable "ai_tip". This tip should be insider knowledge that enhances the user's experience. Avoid generic advice. Instead, provide context-aware tips. For example, instead of 'Book tickets online', say 'Book tickets online at least 3 days in advance for a 10% discount'. Instead of 'Try the local food', recommend a specific, must-try dish at that location, like 'Order the Salted Caramel gelato; it's what they are famous for'. Instead of 'Arrive early to avoid crowds', suggest a specific time and an alternative activity, like 'Arrive at 8:45 AM before the main gates open and head straight to the top floor for the best views before it gets busy'. Respond ONLY with a valid JSON object that conforms to the provided schema. Do not include any other text, markdown formatting, or code fences.`;

  // FIX: Explicitly type `contents` to allow multimodal parts (text and image).
  // This resolves the TypeScript error where an image part could not be pushed to an array of text parts.
  const contents: ({ text: string; } | { inlineData: { data: string; mimeType: string; }; })[] = [
    { text: `User's Request: "${prompt}"` }
  ];

  if (imageFile) {
    const imagePart = fileToGenerativePart(imageFile.base64, imageFile.mimeType);
    contents.push(imagePart, {text: "Here is an inspiration photo for the kind of vibe I'm looking for."});
  }

  const schema = {
    type: Type.OBJECT,
    properties: {
      destination: { type: Type.STRING, description: 'The primary city and country of the trip.' },
      duration: { type: Type.STRING, description: 'The total duration of the trip, e.g., "7 Days".' },
      budget: { type: Type.STRING, description: 'An estimated budget for the trip, e.g., "Under $2000".' },
      summary: { type: Type.STRING, description: 'A brief, exciting summary of the trip, like "Perfect for couples seeking culture + cuisine".' },
      days: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.INTEGER, description: 'The day number of the itinerary (e.g., 1, 2, 3).' },
            theme: { type: Type.STRING, description: 'A theme for the day, e.g., "Historical Exploration & Culinary Delights".' },
            activities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING, description: 'The suggested time for the activity, e.g., "9:00 AM".' },
                  description: { type: Type.STRING, description: 'A description of the activity.' },
                  type: { type: Type.STRING, description: 'The type of activity: Dining, Attraction, Activity, Travel, or Accommodation.' },
                  ai_tip: { type: Type.STRING, description: 'An insightful tip from the AI about this activity.' },
                },
                required: ['time', 'description', 'type', 'ai_tip']
              }
            }
          },
          required: ['day', 'theme', 'activities']
        }
      }
    },
    required: ['destination', 'duration', 'budget', 'summary', 'days']
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      // FIX: System prompt moved to `systemInstruction` in config.
      // `contents` is now structured as a single `Content` object for a multimodal request.
      contents: { parts: contents },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const jsonText = response.text.trim();
    const itineraryData = JSON.parse(jsonText);

    // Validate the structure a bit, since AI can sometimes miss a field
    if (!itineraryData.days) {
        throw new Error("AI response is missing the 'days' array.");
    }

    return itineraryData as Itinerary;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate itinerary. The AI model may be experiencing issues. Details: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the itinerary.");
  }
};