"use client";
import { motion } from "framer-motion";
import { percentile } from "@/data/percentile";
import { useRouter } from "next/navigation";

export default function GameOverOverlay({ score, onPlayAgain }: { score: number, onPlayAgain: () => void }) {
  const isWin = score === 10;
  const pct = percentile[score] || 0;
  const router = useRouter();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[var(--color-overlay)]/95 z-50 flex items-center justify-center p-6"
    >
      <div className="text-center text-white w-full max-w-sm">
        <h1 className="text-4xl font-bold mb-4">{isWin ? "You called it." : "Game over"}</h1>
        <p className="text-xl mb-8">You scored {score} / 10</p>
        
        {score > 0 && (
          <div className="mb-10 bg-white/10 rounded-xl p-4 border border-white/20">
             <p className="text-[var(--color-green)] font-bold text-lg">
               Better than {pct}% of today&apos;s players
             </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button 
            onClick={onPlayAgain}
            className="w-full bg-[var(--color-green)] text-white font-bold text-lg py-4 rounded-xl"
          >
            Play again
          </button>
          <button 
            onClick={() => router.push(`/results?score=${score}`)}
            className="w-full bg-white/10 text-white font-bold text-lg py-4 rounded-xl"
          >
            See Leaderboard
          </button>
        </div>
      </div>
    </motion.div>
  );
}
