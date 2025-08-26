import React from 'react';
import StarIcon from './icons/StarIcon';
import SpeakerIcon from './icons/SpeakerIcon';
import { GameCategory } from '../types';

interface CardProps {
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  category: GameCategory | null;
  isSound?: boolean;
  soundToPlay?: string;
  isHard?: boolean;
}

const Card: React.FC<CardProps> = ({ content, isFlipped, isMatched, onClick, category, isSound, soundToPlay, isHard = false }) => {
  const containerSize = isHard ? 'w-20 h-28 md:w-24 md:h-32' : 'w-24 h-32 md:w-32 md:h-40';
  const starIconSize = isHard ? 'w-12 h-12' : 'w-16 h-16';

  const getCardContentFontSize = () => {
    if (isHard) {
        return content.length > 15 ? 'text-xs' : 'text-sm';
    }
    return content.length > 20 ? 'text-xs md:text-sm' : 'text-sm md:text-lg';
  };

  const handleSoundClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (soundToPlay && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(soundToPlay);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`${containerSize} perspective-1000`} onClick={onClick}>
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-indigo-500 rounded-xl shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300">
           <StarIcon className={`${starIconSize} text-yellow-300`} />
        </div>
        
        {/* Card Front */}
        <div
          className={`relative absolute w-full h-full backface-hidden flex items-center justify-center p-2 text-center rotate-y-180 rounded-xl shadow-lg
            ${isMatched ? 'bg-green-400 border-4 border-white' : 'bg-slate-100'}
          `}
        >
          <p className={`font-bold text-slate-800 ${getCardContentFontSize()}`}>{content}</p>
          {isMatched && category === GameCategory.ANIMALS && !isSound && soundToPlay && (
              <button 
                aria-label="Play sound"
                onClick={handleSoundClick} 
                className="absolute bottom-1 right-1 bg-white/50 rounded-full p-1.5 text-slate-700 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                  <SpeakerIcon className="w-4 h-4 md:w-5 md:h-5" />
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;