
import React, { useState, useEffect, useCallback } from 'react';
import { MatchPair, CardData, GameCategory, Difficulty } from '../types';
import Card from './Card';
import { playFlipSound, playMatchSound, playMismatchSound } from '../services/audioService';
import DemoModeBanner from './DemoModeBanner';
import GameNavBar from './GameNavBar';

interface GameBoardProps {
  pairs: MatchPair[];
  onGameEnd: () => void;
  onGoHome: () => void;
  onGoBack: () => void;
  isFinished?: boolean;
  category: GameCategory | null;
  difficulty: Difficulty | null;
  isDemoMode?: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return array.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const speak = (text: string) => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.error("Browser does not support text-to-speech.");
    }
};

const getGridConfig = (cardCount: number) => {
    if (cardCount <= 8) { // Easy: 4 pairs
        return { grid: 'grid-cols-4', gap: 'gap-4', isHard: false };
    }
    if (cardCount <= 12) { // Medium: 6 pairs
        return { grid: 'grid-cols-4', gap: 'gap-4', isHard: false };
    }
    // Hard: 10 pairs
    return { grid: 'grid-cols-5', gap: 'gap-2 md:gap-3', isHard: true };
};

const GameBoard: React.FC<GameBoardProps> = ({ pairs, onGameEnd, isFinished = false, category, difficulty, onGoHome, onGoBack, isDemoMode = false }) => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const gameCards = pairs.flatMap((pair, index) => {
      const matchId = `pair-${index}`;
      return [
        { id: `${matchId}-a`, content: pair.item1, matchId, isSound: category === GameCategory.ANIMALS ? false : undefined },
        { id: `${matchId}-b`, content: pair.item2, matchId, isSound: category === GameCategory.ANIMALS ? true : undefined },
      ];
    });
    setCards(shuffleArray(gameCards));
    setFlippedCards([]);
    setMatchedPairs([]);
  }, [pairs, category]);

  const handleCardClick = (index: number) => {
    if (isChecking || flippedCards.includes(index) || isFinished) {
      return;
    }

    if (flippedCards.length < 2) {
      playFlipSound();
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);
  };

  const checkMatch = useCallback(() => {
    if (flippedCards.length !== 2) return;

    setIsChecking(true);
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (firstCard.matchId === secondCard.matchId) {
      playMatchSound();
      setMatchedPairs(prev => [...prev, firstCard.matchId]);
       if (category === GameCategory.ANIMALS) {
          const soundCard = firstCard.isSound ? firstCard : secondCard;
          if (soundCard?.content) {
              speak(soundCard.content);
          }
      }
      setFlippedCards([]);
      setIsChecking(false);
    } else {
      playMismatchSound();
      setTimeout(() => {
        setFlippedCards([]);
        setIsChecking(false);
      }, 1200);
    }
  }, [flippedCards, cards, category]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkMatch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flippedCards]);

  useEffect(() => {
    if (cards.length > 0 && matchedPairs.length > 0 && matchedPairs.length === pairs.length) {
      onGameEnd();
    }
  }, [matchedPairs, pairs.length, onGameEnd, cards.length]);

  const { grid, gap, isHard } = getGridConfig(cards.length);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {isDemoMode && <DemoModeBanner />}
      <div className={`grid ${grid} ${gap} p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg`}>
        {cards.map((card, index) => {
            let soundToPlay: string | undefined = undefined;
            if (category === GameCategory.ANIMALS && !card.isSound) {
                const soundCard = cards.find(c => c.matchId === card.matchId && c.id !== card.id);
                soundToPlay = soundCard?.content;
            }

            return (
                <Card
                key={card.id}
                content={card.content}
                isFlipped={flippedCards.includes(index) || matchedPairs.includes(card.matchId)}
                isMatched={matchedPairs.includes(card.matchId)}
                onClick={() => handleCardClick(index)}
                category={category}
                isSound={card.isSound}
                soundToPlay={soundToPlay}
                isHard={isHard}
                />
            );
        })}
      </div>
      {!isFinished && (
        <GameNavBar 
            onGoBack={onGoBack} 
            onQuit={onGoHome}
            category={category}
            difficulty={difficulty}
        />
      )}
    </div>
  );
};

export default GameBoard;
