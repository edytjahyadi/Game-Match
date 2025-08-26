
import React from 'react';
import StarIcon from './icons/StarIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-5xl md:text-6xl font-black text-indigo-600 tracking-tight flex items-center justify-center gap-3">
        <StarIcon className="w-10 h-10 text-yellow-400" />
        Gemini Match Masters
        <StarIcon className="w-10 h-10 text-yellow-400" />
      </h1>
      <p className="text-lg text-slate-500 mt-2">An Educational Matching Game</p>
    </header>
  );
};

export default Header;
