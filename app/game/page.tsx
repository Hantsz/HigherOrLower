"use client";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { assets, Asset } from "@/data/assets";
import AssetCard from "@/components/AssetCard";
import Divider from "@/components/Divider";
import GameOverOverlay from "@/components/GameOverOverlay";
import ScoreHeader from "@/components/ScoreHeader";
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
  const router = useRouter();
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean | null>(null);

  // Start empty and render nothing until the client-side shuffle runs —
  // otherwise the unshuffled deck flashes through before the real cards land.
  const [deck, setDeck] = useState<Asset[]>([]);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showSurpriseBanner, setShowSurpriseBanner] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [animating, setAnimating] = useState(false);
  // Desktop lays the cards out side by side, so cards push left instead of up.
  // Initialized from matchMedia on the client so the very first render already
  // uses the correct axis (SSR renders false; no styles depend on it at mount).
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const seen = localStorage.getItem("hasSeenIntro");
    if (!seen) {
      router.replace("/");
      return;
    }
    setHasSeenIntro(true);

    setDeck(shuffleArray(playingDeck));
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    
    // Load high score
    const storedHigh = localStorage.getItem("highScore");
    if (storedHigh) {
      setHighScore(parseInt(storedHigh, 10));
    }

    return () => mq.removeEventListener("change", update);
  }, [router]);

  const initGame = useCallback(() => {
    setDeck(shuffleArray(playingDeck));
    setRound(1);
    setScore(0);
    setIsRevealed(false);
    setIsCorrect(null);
    setGameOver(false);
    setAnimating(false);
  }, []);

  if (!hasSeenIntro || deck.length < 2) return null;

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
        setScore(prev => {
          const newScore = prev + 1;
          
          if (newScore === 15) {
            setShowSurpriseBanner(true);
            setTimeout(() => setShowSurpriseBanner(false), 4000);
          }
          
          setHighScore(current => {
            if (newScore > current) {
              localStorage.setItem("highScore", newScore.toString());
              return newScore;
            }
            return current;
          });
          return newScore;
        });
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
    <main className="h-[100dvh] bg-black overflow-hidden flex flex-col font-sans relative">
      <ScoreHeader score={score} highScore={highScore} />
      
      <AnimatePresence>
        {showSurpriseBanner && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="absolute top-12 left-0 right-0 z-30 mx-4 mt-2 p-3 bg-white text-black rounded-xl shadow-lg border border-[var(--color-border)] flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--color-green)] flex-shrink-0 flex items-center justify-center text-white font-bold">!</div>
            <div>
              <p className="font-bold text-sm leading-tight text-[var(--color-text-primary)]">Achievement Unlocked!</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">You've reached 15. Claim your 20€ SEB fund and no roboinvestor fees for the first year at the end of the game.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={round}
            initial={isMobile ? { y: "50%", x: 0, opacity: 1 } : { x: "50%", y: 0, opacity: 1 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={isMobile ? { y: "-50%", x: 0, opacity: 1 } : { x: "-50%", y: 0, opacity: 1 }}
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
          className="flex-1 py-4 md:py-6 font-bold text-xl text-white bg-[var(--color-correct)] flex items-center justify-center gap-2"
        >
          ▲ Higher
        </button>
        <button 
          onClick={() => handleGuess("lower")}
          className="flex-1 py-4 md:py-6 font-bold text-xl text-white bg-[#222222] flex items-center justify-center gap-2"
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
