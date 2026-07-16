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
  return (
    <div className={`relative overflow-hidden w-full flex-1 flex flex-col items-center justify-center p-4 md:p-6 bg-[var(--color-bg-card)]`}>
      {asset?.background && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(/backgrounds/${asset.background})` }}
          />
          {/* light veil + slight blur: keeps text readable without washing out the photo */}
          <div className="absolute inset-0 bg-[var(--color-bg-card)]/40 backdrop-blur-[2px]" />
        </>
      )}
      <div className="relative z-10 w-full flex flex-col items-center">
      {asset ? (
        <>
          {asset.logo && (
            <div className="w-16 h-16 rounded-full bg-white border border-[var(--color-border)] mb-4 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={asset.logo.startsWith("http") ? asset.logo : `/logos/${asset.logo}`} 
                alt={asset.name} 
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  const target = e.currentTarget;
                  // If it's a clearbit logo that failed, fallback to google favicon
                  if (target.src.includes('logo.clearbit.com')) {
                    const domainMatch = target.src.match(/clearbit\.com\/([^\?]+)/);
                    if (domainMatch && domainMatch[1]) {
                      target.src = `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${domainMatch[1]}&size=128`;
                    }
                  } else if (target.src.includes('cryptologos.cc')) {
                    // Fallback for crypto if needed, though they are usually reliable
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-10 h-10 flex items-center justify-center font-bold text-gray-400 border border-gray-200 rounded-full bg-gray-50">' + asset.name.charAt(0) + '</div>';
                  }
                }}
              />
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
             <motion.p 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               transition={{ delay: 0.3 }}
               className="text-sm text-[var(--color-text-muted)] text-center max-w-xs"
             >
               {asset.funFact}
             </motion.p>
          </div>
        </>
      ) : (
         <div className="text-[var(--color-text-muted)] font-bold">...</div>
      )}
      </div>
    </div>
  );
}
