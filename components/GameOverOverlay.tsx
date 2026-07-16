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
              {score >= 15 && (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="w-full bg-white text-black font-bold text-lg py-4 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-gray-100 transition-colors flex flex-col items-center justify-center leading-tight border-2 border-[var(--color-green)]"
                >
                  <span className="text-[var(--color-green)]">🎉 Claim your surprise!</span>
                  <span className="text-sm text-[var(--color-text-muted)] mt-1 font-normal">You reached 15 correct answers!</span>
                </button>
              )}
              
              {score < 15 && (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="w-full bg-[var(--color-green)] text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-green-600 transition-colors flex flex-col items-center justify-center leading-tight"
                >
                  <span>Log in to save your score</span>
                  <span className="text-sm opacity-90">and get prizes</span>
                </button>
              )}

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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-5 h-5 fill-current">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                  </svg>
                  Continue with Apple
                </button>
                <button 
                  onClick={handleMockLogin}
                  className="w-full bg-white text-black font-bold text-lg py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Continue with Google
                </button>
                <button 
                  onClick={handleMockLogin}
                  className="w-full bg-[#1877F2] text-white font-bold text-lg py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#166FE5] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-5 h-5 fill-current">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                  Continue with Facebook
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
