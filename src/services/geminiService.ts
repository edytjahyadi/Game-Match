import { GoogleGenAI, Type } from "@google/genai";
import { GameCategory, MatchPair } from '../types';
import { getMockData } from "./mockData";

let ai: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  if (!ai) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("Configuration Error: The API_KEY environment variable is not set. Please ensure it is configured in your deployment environment.");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};


const getPromptAndSchemaForCategory = (category: GameCategory, pairs: number) => {
  const baseDescription = `Generate ${pairs} unique pairs of items for a children's memory matching game (ages 7-9).`;
  
  const schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        item1: { type: Type.STRING, description: 'The first item in the pair (e.g., a word, a problem).' },
        item2: { type: Type.STRING, description: 'The second item that matches the first (e.g., a definition, an answer).' },
      },
      required: ["item1", "item2"],
    },
  };

  let prompt;
  switch (category) {
    case GameCategory.ANIMALS:
      prompt = `${baseDescription} Each pair should be an animal and the sound it makes. Example: { "item1": "Cow", "item2": "Moo" }`;
      break;
    case GameCategory.VOCABULARY:
      prompt = `${baseDescription} Each pair should be a simple English word and its brief, easy-to-understand definition. Example: { "item1": "Brave", "item2": "Not afraid" }`;
      break;
    case GameCategory.MATH:
      prompt = `${baseDescription} Each pair should be a simple addition problem and its correct answer. The sum should be less than 100. Example: { "item1": "15 + 8", "item2": "23" }`;
      break;
    case GameCategory.WORD_PROBLEMS:
      prompt = `${baseDescription} Each pair must consist of a simple word problem and its correct numerical answer, suitable for the Cambridge primary curriculum. The problems should involve basic addition or subtraction. Example: { "item1": "Lily has 7 crayons. She gets 5 more. How many does she have now?", "item2": "12" }`;
      break;
    default:
      throw new Error('Invalid game category');
  }

  return { prompt, schema };
};

export const generateMatchingPairs = async (category: GameCategory, pairs: number): Promise<{ pairs: MatchPair[]; isMock: boolean; }> => {
  const { prompt, schema } = getPromptAndSchemaForCategory(category, pairs);

  try {
    const client = getAiClient();
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 1, // Be creative
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    if (!Array.isArray(parsedData) || parsedData.length === 0) {
        throw new Error("API returned an empty or invalid array.");
    }
    
    // Validate that items have the expected structure
    const validatedPairs = parsedData.filter(p => p && typeof p.item1 === 'string' && typeof p.item2 === 'string');

    if(validatedPairs.length < pairs) {
        throw new Error("API returned insufficient valid pairs.");
    }

    return { pairs: validatedPairs.slice(0, pairs), isMock: false };

  } catch (error) {
    if (error instanceof Error && error.message.includes("API_KEY environment variable is not set")) {
        console.warn("API Key not found. Falling back to mock data for a seamless demo experience.");
        return { pairs: getMockData(category, pairs), isMock: true };
    }
    console.error("Error generating content from Gemini:", error);
    // Re-throw other errors to be handled by the UI component
    throw error;
  }
};