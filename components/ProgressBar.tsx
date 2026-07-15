export default function ProgressBar({ score }: { score: number }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="h-1.5 w-full bg-[var(--color-border)]">
        <div 
          className="h-full bg-[var(--color-green)] transition-all duration-300"
          style={{ width: `${Math.min((score / 10) * 100, 100)}%` }}
        />
      </div>
      <div className="flex justify-between px-4 py-2 text-sm font-bold bg-white/90">
        <span>Streak: {score}</span>
        <span>Score: {score}</span>
      </div>
    </div>
  );
}
