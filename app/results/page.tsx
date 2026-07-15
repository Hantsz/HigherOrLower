import SebHeader from "@/components/SebHeader";
import Leaderboard from "@/components/Leaderboard";
import ConversionBlock from "@/components/ConversionBlock";
import { percentile } from "@/data/percentile";
import Link from "next/link";

export default async function ResultsPage({ searchParams }: { searchParams: Promise<{ score?: string }> }) {
  const resolvedParams = await searchParams;
  const score = parseInt(resolvedParams.score || "0", 10);
  const pct = percentile[score] || 0;

  return (
    <main className="min-h-screen bg-white text-[var(--color-text-primary)]">
      <SebHeader />
      
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-1">{score}</h1>
          <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Final Score</p>
          {score > 0 && (
             <p className="text-[var(--color-green)] font-bold text-lg">
               Better than {pct}% of today&apos;s players
             </p>
          )}
        </div>

        <Leaderboard />
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
