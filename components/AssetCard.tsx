"use client";
import { useEffect } from "react";
import { Asset } from "@/data/assets";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface AssetCardProps {
  asset: Asset | null;
  isBottom: boolean;
  revealed: boolean;
  isCorrect?: boolean | null;
}

function CountUp({ value }: { value: number }) {
  const progress = useMotionValue(0);
  const display = useTransform(progress, (v) => `${v >= 0 ? "+" : ""}${v.toFixed(1)}%`);

  useEffect(() => {
    const controls = animate(progress, value, { duration: 0.9, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [progress, value]);

  return <motion.span>{display}</motion.span>;
}

export default function AssetCard({ asset, isBottom, revealed, isCorrect }: AssetCardProps) {
  let borderColor = "border-transparent";
  if (revealed && isBottom) {
    if (isCorrect === true) borderColor = "border-[var(--color-correct)]";
    if (isCorrect === false) borderColor = "border-[var(--color-wrong)]";
  }

  return (
    <div className={`w-full flex-1 flex flex-col items-center justify-center p-6 bg-[var(--color-bg-card)] border-b border-[var(--color-border)] ${isBottom ? `border-b-4 ${borderColor} transition-colors duration-300` : ""}`}>
      {asset ? (
        <>
          {asset.logo && (
            <div className="w-16 h-16 rounded-full bg-white border border-[var(--color-border)] mb-4 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/${asset.logo}`} alt={asset.name} className="w-10 h-10 object-contain" />
            </div>
          )}
          <h2 className="text-2xl font-bold mb-1 text-center">{asset.name}</h2>
          <div className="h-16 flex items-center justify-center">
            {(!isBottom || revealed) ? (
              <motion.div
                initial={isBottom ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                className={`text-5xl font-bold ${asset.return >= 0 ? "text-[var(--color-correct)]" : "text-[var(--color-wrong)]"}`}
              >
                {isBottom ? (
                  <CountUp value={asset.return} />
                ) : (
                  <>{asset.return >= 0 ? "+" : ""}{asset.return.toFixed(1)}%</>
                )}
              </motion.div>
            ) : (
              <div className="text-6xl font-bold text-[#CECECE]">?</div>
            )}
          </div>
          
          <div className="h-8 mt-4 flex items-center justify-center">
             {revealed && (
               <motion.p 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 transition={{ delay: 0.3 }}
                 className="text-sm text-[var(--color-text-muted)] text-center max-w-xs"
               >
                 {asset.funFact}
               </motion.p>
             )}
          </div>
        </>
      ) : (
         <div className="text-[var(--color-text-muted)] font-bold">...</div>
      )}
    </div>
  );
}
