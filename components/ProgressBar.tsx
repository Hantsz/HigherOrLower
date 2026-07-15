export default function ProgressBar({ round, score }: { round: number, score: number }) {
  const progress = (round / 10) * 100;
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="h-2 w-full bg-[var(--color-border)]">
        <div 
          className="h-full bg-[var(--color-green)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between px-4 py-2 text-sm font-bold bg-white/90">
        <span>Round {round} / 10</span>
        <span>Score: {score}</span>
      </div>
    </div>
  );
}
