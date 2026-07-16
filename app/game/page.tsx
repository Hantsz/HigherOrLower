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

const playingDeck = assets.length > 1 ? assets : [
  { id: "1", name: "S&P 500", logo: "", return: 15.5, funFact: "Solid growth tracking US top 500." },
  { id: "2", name: "Bitcoin", logo: "", return: -4.2, funFact: "Crypto winter effects." },
  { id: "3", name: "Gold", logo: "", return: 8.1, funFact: "A traditional safe haven." },
  { id: "4", name: "Tesla", logo: "", return: -12.4, funFact: "EV market faces headwinds." },
  { id: "5", name: "Apple", logo: "", return: 5.5, funFact: "Steady growth and services." },
  { id: "6", name: "Oil", logo: "", return: 12.0, funFact: "Energy demand surged." },
  { id: "7", name: "Bonds", logo: "", return: 2.1, funFact: "Low risk, low reward." },
  { id: "8", name: "Ethereum", logo: "", return: 22.4, funFact: "DeFi and NFTs driving value." },
  { id: "9", name: "Real Estate", logo: "", return: 4.5, funFact: "Housing market stable." },
  { id: "10", name: "Amazon", logo: "", return: 18.2, funFact: "E-commerce dominance continues." },
  { id: "11", name: "Netflix", logo: "", return: 14.1, funFact: "Subscriber growth rebounds." },
  { id: "12", name: "Google", logo: "", return: 9.9, funFact: "AI integration boosts search." },
];

export default function GamePage() {
  const [deck, setDeck] = useState<Asset[]>(playingDeck);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setDeck(shuffleArray(playingDeck));
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
          // Dynamically extend deck if approaching the end
          if (nextRound >= deck.length - 1) {
            setDeck(currentDeck => [...currentDeck, ...shuffleArray(playingDeck)]);
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
    <main className="min-h-screen bg-black overflow-hidden relative font-sans">
      <div className="absolute inset-0 pb-[72px] overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={round}
            initial={{ y: "50%", opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-50%", opacity: 1 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="absolute inset-0 flex flex-col" 
          >
            <AssetCard asset={topCard} isBottom={false} revealed={true} />
            <AssetCard asset={bottomCard} isBottom={true} revealed={isRevealed} isCorrect={isCorrect} />
          </motion.div>
        </AnimatePresence>
        
        {/* Divider stays fixed in the center of the screen during push transitions */}
        <Divider isCorrect={isCorrect} isRevealed={isRevealed} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex bg-black border-t border-[var(--color-border)] z-20">
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
