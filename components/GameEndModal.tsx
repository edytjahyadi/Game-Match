
import React from 'react';
import StarIcon from './icons/StarIcon';

interface GameEndModalProps {
  onPlayAgain: () => void;
  startTime: number;
  endTime: number;
}

const GameEndModal: React.FC<GameEndModalProps> = ({ onPlayAgain, startTime, endTime }) => {
    const durationInSeconds = Math.round((endTime - startTime) / 1000);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full animate-jump-in">
        <div className="flex justify-center -mt-20 mb-4">
             <div className="bg-yellow-400 p-4 rounded-full shadow-lg">
                <StarIcon className="w-16 h-16 text-white"/>
             </div>
        </div>
        <h2 className="text-4xl font-black text-indigo-600">Great Job!</h2>
        <p className="text-slate-600 mt-2 mb-4 text-lg">You matched all the cards!</p>
        <div className="bg-indigo-100 p-3 rounded-lg text-indigo-800 font-bold text-xl">
            Time: {durationInSeconds} seconds
        </div>
        <button
          onClick={onPlayAgain}
          className="mt-8 w-full bg-green-500 text-white font-bold text-2xl py-4 px-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300"
        >
          Play Again
        </button>
      </div>
      <style>{`
        @keyframes jump-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-jump-in {
          animation: jump-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default GameEndModal;
