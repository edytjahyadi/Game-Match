import { GameCategory, MatchPair } from '../types';

const mockData: Record<GameCategory, MatchPair[]> = {
  [GameCategory.ANIMALS]: [
    { item1: 'Cat', item2: 'Meow' },
    { item1: 'Dog', item2: 'Woof' },
    { item1: 'Horse', item2: 'Neigh' },
    { item1: 'Sheep', item2: 'Baa' },
    { item1: 'Pig', item2: 'Oink' },
    { item1: 'Duck', item2: 'Quack' },
    { item1: 'Lion', item2: 'Roar' },
    { item1: 'Snake', item2: 'Hiss' },
    { item1: 'Frog', item2: 'Ribbit' },
    { item1: 'Rooster', item2: 'Cock-a-doodle-doo' },
  ],
  [GameCategory.VOCABULARY]: [
    { item1: 'Happy', item2: 'Feeling Joy' },
    { item1: 'Huge', item2: 'Very Big' },
    { item1: 'Tiny', item2: 'Very Small' },
    { item1: 'Fast', item2: 'Moves Quickly' },
    { item1: 'Sleepy', item2: 'Needs Rest' },
    { item1: 'Clever', item2: 'Smart' },
    { item1: 'Scared', item2: 'Afraid' },
    { item1: 'Shout', item2: 'Yell Loudly' },
    { item1: 'Quiet', item2: 'Makes No Sound' },
    { item1: 'Funny', item2: 'Makes You Laugh' },
  ],
  [GameCategory.MATH]: [
    { item1: '5 + 3', item2: '8' },
    { item1: '10 + 2', item2: '12' },
    { item1: '8 + 4', item2: '12' },
    { item1: '7 + 6', item2: '13' },
    { item1: '9 + 9', item2: '18' },
    { item1: '15 + 5', item2: '20' },
    { item1: '12 + 8', item2: '20' },
    { item1: '20 + 10', item2: '30' },
    { item1: '11 + 6', item2: '17' },
    { item1: '14 + 7', item2: '21' },
  ],
  [GameCategory.WORD_PROBLEMS]: [
    { item1: 'You have 4 apples and get 2 more. How many apples now?', item2: '6' },
    { item1: 'There are 8 birds. 3 fly away. How many are left?', item2: '5' },
    { item1: 'Sam has 5 balls. Ann has 6 balls. How many in total?', item2: '11' },
    { item1: 'A cat has 4 legs. How many legs do 2 cats have?', item2: '8' },
    { item1: 'I had 10 cookies and ate 4. How many are left?', item2: '6' },
    { item1: 'There are 7 days in a week. How many days in 2 weeks?', item2: '14' },
    { item1: 'A farmer has 5 sheep and 5 cows. How many animals?', item2: '10' },
    { item1: 'You read 3 pages on Monday and 5 on Tuesday. Total pages?', item2: '8' },
    { item1: 'A box holds 12 pencils. You take out 2. How many are in the box?', item2: '10' },
    { item1: 'A pizza has 8 slices. You eat 3. How many are left?', item2: '5' },
  ],
};

export const getMockData = (category: GameCategory, pairs: number): MatchPair[] => {
    const data = mockData[category] || [];
    // Shuffle and slice to get a random-ish set of pairs
    return data.sort(() => 0.5 - Math.random()).slice(0, pairs);
};