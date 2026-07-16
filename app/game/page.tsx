"use client";
import { useState, useCallback, useEffect } from "react";
import { assets, Asset } from "@/data/assets";
import AssetCard from "@/components/AssetCard";
import Divider from "@/components/Divider";
import GameOverOverlay from "@/components/GameOverOverlay";
import { motion, AnimatePresence } from "framer-motion";

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const playingDeck = assets;

export default function GamePage() {
  const [deck, setDeck] = useState<Asset[]>(playingDeck);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [animating, setAnimating] = useState(false);
  // Desktop lays the cards out side by side, so cards push left instead of up
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setDeck(shuffleArray(playingDeck));
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  
  const initGame = useCallback(() => {
    setDeck(shuffleArray(playingDeck));
    setRound(1);
    setScore(0);
    setIsRevealed(false);
    setIsCorrect(null);
    setGameOver(false);
    setAnimating(false);
  }, []);

  if (deck.length < 2) return null;

  const topCard = deck[round - 1];
  const bottomCard = deck[round];

  const handleGuess = (guess: "higher" | "lower") => {
    if (isRevealed || animating || gameOver) return;
    
    setAnimating(true);
    setIsRevealed(true);
    
    const isGuessCorrect = 
      topCard.return === bottomCard.return ||
      (guess === "higher" && bottomCard.return > topCard.return) || 
      (guess === "lower" && bottomCard.return < topCard.return);
      
    setIsCorrect(isGuessCorrect);

    setTimeout(() => {
      if (isGuessCorrect) {
        setScore(prev => prev + 1);
        setIsRevealed(false);
        setIsCorrect(null);
        setRound(prev => {
          const nextRound = prev + 1;
          // The deck holds every asset exactly once, so nothing repeats within
          // a game. Only if the player clears all of them do we reshuffle and
          // extend — making sure the seam never shows the same asset twice in a row.
          if (nextRound >= deck.length - 1) {
            setDeck(currentDeck => {
              const next = shuffleArray(playingDeck);
              if (next[0].id === currentDeck[currentDeck.length - 1].id) {
                next.push(next.shift()!);
              }
              return [...currentDeck, ...next];
            });
          }
          return nextRound;
        });
        setAnimating(false);
      } else {
        setGameOver(true);
        setAnimating(false);
      }
    }, 1500);
  };

  return (
    <main className="h-[100dvh] bg-black overflow-hidden flex flex-col font-sans">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={round}
            initial={isMobile ? { y: "50%", opacity: 1 } : { x: "50%", opacity: 1 }}
            animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
            exit={isMobile ? { y: "-50%", opacity: 1 } : { x: "-50%", opacity: 1 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="absolute inset-0 flex flex-col md:flex-row"
          >
            <AssetCard asset={topCard} isBottom={false} revealed={true} />
            <AssetCard asset={bottomCard} isBottom={true} revealed={isRevealed} isCorrect={isCorrect} />
          </motion.div>
        </AnimatePresence>
        
        {/* Divider stays fixed in the center of the playable area during push transitions */}
        <Divider isCorrect={isCorrect} isRevealed={isRevealed} />
      </div>

      <div className="flex-none flex bg-black border-t border-[var(--color-border)] z-20 relative">
        <button 
          onClick={() => handleGuess("higher")}
          className="flex-1 py-6 font-bold text-xl text-white bg-[var(--color-green)] flex items-center justify-center gap-2"
        >
          ▲ Higher
        </button>
        <button 
          onClick={() => handleGuess("lower")}
          className="flex-1 py-6 font-bold text-xl text-white bg-[#222222] flex items-center justify-center gap-2"
        >
          ▼ Lower
        </button>
      </div>
      
      {gameOver && (
        <GameOverOverlay score={score} onPlayAgain={initGame} />
      )}
    </main>
  );
}
