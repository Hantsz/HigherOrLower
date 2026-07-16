"use client";

import SebHeader from "@/components/SebHeader";
import Leaderboard from "@/components/Leaderboard";
import ConversionBlock from "@/components/ConversionBlock";
import { getPercentile } from "@/data/percentile";
import Link from "next/link";
import { useEffect, useState, use } from "react";

export default function ResultsPage({ searchParams }: { searchParams: Promise<{ score?: string }> }) {
  const resolvedParams = use(searchParams);
  const sessionScore = parseInt(resolvedParams.score || "0", 10);
  
  const [highScore, setHighScore] = useState(sessionScore);
  
  useEffect(() => {
    const stored = localStorage.getItem("highScore");
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (parsed > sessionScore) {
        setHighScore(parsed);
      } else if (sessionScore > parsed) {
        setHighScore(sessionScore);
        localStorage.setItem("highScore", sessionScore.toString());
      }
    } else {
      setHighScore(sessionScore);
      localStorage.setItem("highScore", sessionScore.toString());
    }
  }, [sessionScore]);

  const pct = getPercentile(highScore);

  return (
    <main className="min-h-screen bg-white text-[var(--color-text-primary)]">
      <SebHeader />
      
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-1">{highScore}</h1>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">High Score</p>
          {highScore > 0 && (
             <p className="text-[var(--color-correct)] font-bold text-lg">
               Better than {pct}% of today&apos;s players
             </p>
          )}
        </div>

        <Leaderboard playerScore={sessionScore} />
        <ConversionBlock />
        
        <div className="mt-8 mb-8 pb-8">
          <Link 
            href="/game"
            className="block w-full text-center bg-gray-200 text-gray-800 font-bold py-4 rounded-xl transition-colors"
          >
            Play Again
          </Link>
        </div>
      </div>
    </main>
  );
}
