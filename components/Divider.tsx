export default function Divider() {
  return (
    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-10 pointer-events-none">
      <div className="w-full h-[1px] bg-[var(--color-border)] absolute" />
      <div className="bg-[var(--color-bg-white)] border border-[var(--color-border)] rounded-full px-4 py-2 text-sm font-bold text-[var(--color-text-primary)] z-10">
        Higher or Lower?
      </div>
    </div>
  );
}
