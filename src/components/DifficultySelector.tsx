import React from 'react';
import { GameCategory, Difficulty } from '../types';

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBack: () => void;
  category: GameCategory;
}

const DifficultyButton: React.FC<{
    difficulty: Difficulty;
    onClick: (difficulty: Difficulty) => void;
    color: string;
}> = ({ difficulty, onClick, color }) => (
    <button
        onClick={() => onClick(difficulty)}
        className={`w-full md:w-56 text-2xl font-bold text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 ${color}`}
    >
        {difficulty}
    </button>
);

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty, onBack, category }) => {
  return (
    <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl w-full max-w-3xl">
      <h2 className="text-4xl font-extrabold text-slate-700 mb-2">
        You chose <span className="text-indigo-600">{category}</span>
      </h2>
      <p className="text-slate-500 mb-8 text-lg">Now, pick a difficulty!</p>
      
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <DifficultyButton difficulty={Difficulty.EASY} onClick={onSelectDifficulty} color="bg-green-500 hover:bg-green-600" />
        <DifficultyButton difficulty={Difficulty.MEDIUM} onClick={onSelectDifficulty} color="bg-yellow-500 hover:bg-yellow-600" />
        <DifficultyButton difficulty={Difficulty.HARD} onClick={onSelectDifficulty} color="bg-red-500 hover:bg-red-600" />
      </div>

      <button onClick={onBack} className="mt-8 text-slate-500 hover:text-slate-700 font-semibold transition-colors">
        &larr; Back to Categories
      </button>
    </div>
  );
};

export default DifficultySelector;