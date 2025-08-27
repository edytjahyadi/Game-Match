
import { GameCategory, MatchPair } from '../types';
import { getMockData } from "./mockData";

/**
 * Generates matching pairs for a given category and number of pairs using mock data.
 * This function is now synchronous and does not require an API key.
 */
export const generateMatchingPairs = (category: GameCategory, pairs: number): MatchPair[] => {
  try {
    const data = getMockData(category, pairs);
    if (!data || data.length < pairs) {
      throw new Error("Insufficient mock data for the selected category and difficulty.");
    }
    return data;
  } catch (error) {
    console.error("Error retrieving mock data:", error);
    // Re-throw a user-friendly error to be handled by the UI.
    throw new Error("Failed to load game content. Please try again.");
  }
};
