"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

interface DividerProps {
  isCorrect?: boolean | null;
  isRevealed?: boolean;
}

export default function Divider({ isCorrect = null, isRevealed = false }: DividerProps) {
  const showResult = isRevealed && isCorrect !== null;

  return (
    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 md:inset-y-auto md:left-0 md:right-0 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 flex items-center justify-center z-20 pointer-events-none">
      <div className="h-full w-[1px] md:w-full md:h-[1px] bg-[var(--color-border)] absolute" />

      <AnimatePresence mode="wait">
        {showResult ? (
          <motion.div
            key={isCorrect ? "correct" : "wrong"}
            initial={{ scale: 0, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="relative flex items-center justify-center z-10"
          >
            {/* Outer expanding ring pulse effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`absolute inset-0 rounded-full ${
                isCorrect ? "bg-[#60CD18]" : "bg-[#F03529]"
              }`}
            />

            {/* Main Circle Icon Container */}
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative ${
                isCorrect
                  ? "bg-[#60CD18] text-white shadow-emerald-500/30"
                  : "bg-[#F03529] text-white shadow-red-500/30"
              }`}
            >
              {isCorrect ? (
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.05, type: "spring", stiffness: 500 }}
                >
                  <Check className="w-8 h-8 stroke-[3.5]" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.05, type: "spring", stiffness: 500 }}
                >
                  <X className="w-8 h-8 stroke-[3.5]" />
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="pill"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-full px-4 py-2 text-sm font-bold text-[var(--color-text-primary)] z-10 shadow-sm"
          >
            Higher or Lower?
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


