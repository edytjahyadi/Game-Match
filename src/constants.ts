import { Difficulty } from './types';

export const PAIRS_PER_DIFFICULTY: Record<Difficulty, number> = {
    [Difficulty.EASY]: 4,
    [Difficulty.MEDIUM]: 6,
    [Difficulty.HARD]: 10,
};