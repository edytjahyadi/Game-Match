
import React from 'react';
import { GameCategory, Difficulty } from '../types';
import BackIcon from './icons/BackIcon';
import HomeIcon from './icons/HomeIcon';

interface GameNavBarProps {
    onGoBack: () => void;
    onQuit: () => void;
    category: GameCategory | null;
    difficulty: Difficulty | null;
}

const GameNavBar: React.FC<GameNavBarProps> = ({ onGoBack, onQuit, category, difficulty }) => {
    return (
        <div className="w-full max-w-lg md:max-w-xl lg:max-w-2xl flex items-center justify-between bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-lg">
            <button
                onClick={onGoBack}
                className="flex items-center gap-2 font-semibold text-slate-600 hover:text-indigo-600 transition-colors duration-300 transform hover:scale-105 pl-3 pr-4 py-1"
                aria-label="Go Back"
            >
                <BackIcon className="w-6 h-6" />
                <span className="hidden sm:inline">Back</span>
            </button>
            <div className="text-center">
                <p className="font-bold text-sm sm:text-base text-slate-700">{category}</p>
                <p className="text-xs sm:text-sm text-slate-500">{difficulty}</p>
            </div>
            <button
                onClick={onQuit}
                className="flex items-center gap-2 font-semibold text-slate-600 hover:text-red-600 transition-colors duration-300 transform hover:scale-105 pl-4 pr-3 py-1"
                aria-label="Quit Game"
            >
                <span className="hidden sm:inline">Quit</span>
                <HomeIcon className="w-6 h-6" />
            </button>
        </div>
    );
};

export default GameNavBar;
