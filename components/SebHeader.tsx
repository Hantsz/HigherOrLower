interface SebHeaderProps {
  score?: number;
  highScore?: number;
}

export default function SebHeader({ score, highScore }: SebHeaderProps) {
  if (score === undefined || highScore === undefined) return null;

  const progress = Math.min(100, (score / 15) * 100);

  return (
    <header className="w-full bg-[var(--color-bg-card)] h-10 flex items-center justify-between px-6 border-b border-[var(--color-border)] relative z-20 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-widest font-bold">Score</span>
        <span className="text-[var(--color-text-primary)] font-bold text-base leading-none">{score}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[var(--color-text-muted)] text-[10px] uppercase tracking-widest font-bold">High Score</span>
        <span className="text-[var(--color-green)] font-bold text-base leading-none">{highScore}</span>
      </div>
      
      {/* Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-[var(--color-green)] transition-all duration-500 ease-out" 
        style={{ width: `${progress}%` }} 
      />
    </header>
  );
}
