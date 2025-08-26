import React from 'react';
import { GameCategory } from '../types';

interface LoadingSpinnerProps {
    category: GameCategory | null;
    onBack: () => void;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ category, onBack }) => {
  return (
    <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl">
      <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-t-4 border-indigo-500 mx-auto"></div>
      <h2 className="text-3xl font-bold text-slate-700 mt-6">Creating your game...</h2>
      {category && <p className="text-slate-500 mt-2 text-lg">Getting fresh questions for <span className="font-bold text-indigo-600">{category}</span>!</p>}
       <button onClick={onBack} className="mt-8 text-slate-500 hover:text-slate-700 font-semibold transition-colors">
        &larr; Back
      </button>
    </div>
  );
};

export default LoadingSpinner;