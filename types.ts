
export enum GameCategory {
  ANIMALS = 'Animals & Sounds',
  VOCABULARY = 'Vocabulary',
  MATH = 'Simple Math',
  WORD_PROBLEMS = 'Word Problems',
}

export enum Difficulty {
    EASY = 'Easy',
    MEDIUM = 'Medium',
    HARD = 'Hard',
}

export enum GameState {
  SELECTING_CATEGORY = 'selecting_category',
  SELECTING_DIFFICULTY = 'selecting_difficulty',
  LOADING = 'loading',
  PLAYING = 'playing',
  FINISHED = 'finished',
}

export interface MatchPair {
  item1: string;
  item2: string;
}

export interface CardData {
  id: string;
  content: string;
  matchId: string;
  isSound?: boolean;
}