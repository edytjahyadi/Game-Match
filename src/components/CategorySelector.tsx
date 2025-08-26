import React from 'react';
import { GameCategory } from '../types';

interface CategorySelectorProps {
  onSelectCategory: (category: GameCategory) => void;
  error: string | null;
}

const CategoryButton: React.FC<{ category: GameCategory; onClick: (category: GameCategory) => void; color: string; }> = ({ category, onClick, color }) => (
    <button
        onClick={() => onClick(category)}
        className={`w-full md:w-56 text-2xl font-bold text-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 ${color}`}
    >
        {category}
    </button>
);

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory, error }) => {
  return (
    <div className="text-center bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl">
      <h2 className="text-4xl font-extrabold text-slate-700 mb-2">Choose a Category!</h2>
      <p className="text-slate-500 mb-8 text-lg">Let's learn something new and have fun!</p>
      
      {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">{error}</p>}

      <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-center">
        <CategoryButton category={GameCategory.ANIMALS} onClick={onSelectCategory} color="bg-green-500 hover:bg-green-600" />
        <CategoryButton category={GameCategory.VOCABULARY} onClick={onSelectCategory} color="bg-purple-500 hover:bg-purple-600" />
        <CategoryButton category={GameCategory.MATH} onClick={onSelectCategory} color="bg-sky-500 hover:bg-sky-600" />
        <CategoryButton category={GameCategory.WORD_PROBLEMS} onClick={onSelectCategory} color="bg-blue-500 hover:bg-blue-600" />
      </div>
    </div>
  );
};

export default CategorySelector;