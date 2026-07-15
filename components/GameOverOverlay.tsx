"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { percentile } from "@/data/percentile";
import { useRouter } from "next/navigation";

export default function GameOverOverlay({ score, onPlayAgain }: { score: number, onPlayAgain: () => void }) {
  const pct = percentile[score] || 0;
  const router = useRouter();
  
  const [showLogin, setShowLogin] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleMockLogin = () => {
    setIsSaving(true);
    setTimeout(() => {
      router.push(`/results?score=${score}`);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[var(--color-overlay)]/95 z-50 flex items-center justify-center p-6"
    >
      <AnimatePresence mode="wait">
        {!showLogin ? (
          <motion.div 
            key="gameover"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center text-white w-full max-w-sm"
          >
            <h1 className="text-4xl font-bold mb-4">Game over</h1>
            <p className="text-xl mb-8">You scored {score}</p>
            
            {score > 0 && (
              <div className="mb-8 bg-white/10 rounded-xl p-4 border border-white/20">
                 <p className="text-[var(--color-green)] font-bold text-lg">
                   Better than {pct}% of today&apos;s players
                 </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowLogin(true)}
                className="w-full bg-[var(--color-green)] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-green-600 transition-colors flex flex-col items-center justify-center leading-tight"
              >
                <span>Log in to save your score</span>
                <span className="text-sm opacity-90">and get prizes</span>
              </button>
              <button 
                onClick={onPlayAgain}
                className="w-full bg-white/20 text-white font-bold text-lg py-4 rounded-xl hover:bg-white/30 transition-colors"
              >
                Play again
              </button>
              <button 
                onClick={() => router.push(`/results?score=${score}`)}
                className="w-full bg-transparent text-[var(--color-text-muted)] font-bold text-lg py-2 rounded-xl hover:text-white transition-colors"
              >
                Skip & See Leaderboard
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full max-w-sm text-white"
          >
            <h2 className="text-3xl font-bold mb-2 text-center">Log in</h2>
            <p className="text-center text-[var(--color-text-muted)] mb-8">Sign in to save your score and get prizes.</p>
            
            {isSaving ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-10 h-10 border-4 border-[var(--color-green)] border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-lg font-bold text-[var(--color-green)]">Saving...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleMockLogin}
                  className="w-full bg-black border border-white/20 text-white font-bold text-lg py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors"
                >
                  <span className="text-xl"></span> Continue with Apple
                </button>
                <button 
                  onClick={handleMockLogin}
                  className="w-full bg-white text-black font-bold text-lg py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-serif font-bold text-xl text-blue-600">G</span> Continue with Google
                </button>
                <button 
                  onClick={handleMockLogin}
                  className="w-full bg-[#1877F2] text-white font-bold text-lg py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#166FE5] transition-colors"
                >
                  <span className="font-bold text-xl">f</span> Continue with Facebook
                </button>
                <button 
                  onClick={handleMockLogin}
                  className="w-full bg-[#333333] text-white font-bold text-lg py-3 rounded-xl mt-4 hover:bg-[#444444] transition-colors"
                >
                  Continue with Email
                </button>
                
                <button 
                  onClick={() => setShowLogin(false)}
                  className="w-full bg-transparent text-[var(--color-text-muted)] font-bold text-lg py-4 mt-2 hover:text-white transition-colors"
                >
                  Back
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
