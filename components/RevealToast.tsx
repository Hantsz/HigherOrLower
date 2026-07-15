"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function RevealToast({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 bg-[var(--color-correct)] text-white px-8 py-3 rounded-full font-bold shadow-lg z-50 pointer-events-none text-lg"
        >
          Correct!
        </motion.div>
      )}
    </AnimatePresence>
  );
}
