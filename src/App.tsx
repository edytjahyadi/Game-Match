
import React, { useState, useCallback, useEffect } from 'react';
import { GameCategory, GameState, MatchPair, Difficulty } from './types';
import { generateMatchingPairs } from './services/geminiService';
import CategorySelector from './components/CategorySelector';
import GameBoard from './components/GameBoard';
import GameEndModal from './components/GameEndModal';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import { PAIRS_PER_DIFFICULTY } from './constants';
import { initAudioContext } from './services/audioService';
import DifficultySelector from './components/DifficultySelector';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SELECTING_CATEGORY);
  const [gameCategory, setGameCategory] = useState<GameCategory | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [matchPairs, setMatchPairs] = useState<MatchPair[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const handleCategorySelect = useCallback((category: GameCategory) => {
    initAudioContext();
    setGameCategory(category);
    setGameState(GameState.SELECTING_DIFFICULTY);
  }, []);

  const handleDifficultySelect = useCallback(async (selectedDifficulty: Difficulty) => {
    if (!gameCategory) return;

    setDifficulty(selectedDifficulty);
    setGameState(GameState.LOADING);
    setError(null);
    try {
      const pairsCount = PAIRS_PER_DIFFICULTY[selectedDifficulty];
      const { pairs, isMock } = await generateMatchingPairs(gameCategory, pairsCount);
      setMatchPairs(pairs);
      setIsDemoMode(isMock);
      setStartTime(Date.now());
      setGameState(GameState.PLAYING);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Could not create the game. Please try again!');
      }
      setGameState(GameState.SELECTING_CATEGORY);
    }
  }, [gameCategory]);
  
  const handleBackToCategory = useCallback(() => {
    setGameState(GameState.SELECTING_CATEGORY);
    setGameCategory(null);
  }, []);

  const handleBackToDifficulty = useCallback(() => {
    setGameState(GameState.SELECTING_DIFFICULTY);
  }, []);

  const handleGameEnd = useCallback(() => {
    setEndTime(Date.now());
    setGameState(GameState.FINISHED);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameState(GameState.SELECTING_CATEGORY);
    setGameCategory(null);
    setDifficulty(null);
    setMatchPairs([]);
    setError(null);
    setIsDemoMode(false);
  }, []);

  const renderContent = () => {
    switch (gameState) {
      case GameState.LOADING:
        return <LoadingSpinner category={gameCategory} onBack={handleBackToDifficulty} />;
      case GameState.PLAYING:
        return <GameBoard pairs={matchPairs} onGameEnd={handleGameEnd} category={gameCategory} onGoHome={handlePlayAgain} isDemoMode={isDemoMode} onGoBack={handleBackToDifficulty} difficulty={difficulty} />;
      case GameState.FINISHED:
        return (
          <>
            <GameBoard pairs={matchPairs} onGameEnd={() => {}} isFinished={true} category={gameCategory} onGoHome={() => {}} isDemoMode={isDemoMode} onGoBack={() => {}} difficulty={difficulty} />
            <GameEndModal
              onPlayAgain={handlePlayAgain}
              startTime={startTime}
              endTime={endTime}
            />
          </>
        );
      case GameState.SELECTING_DIFFICULTY:
        return <DifficultySelector onSelectDifficulty={handleDifficultySelect} onBack={handleBackToCategory} category={gameCategory!} />;
      case GameState.SELECTING_CATEGORY:
      default:
        // FIX: Corrected function name from handleSelectCategory to handleCategorySelect
        return <CategorySelector onSelectCategory={handleCategorySelect} error={error} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-100 to-indigo-200">
      <Header />
      <main className="w-full max-w-4xl mx-auto flex-grow flex flex-col items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
