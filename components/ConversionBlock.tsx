export default function ConversionBlock() {
  return (
    <div className="w-full max-w-md mx-auto mt-12 bg-[var(--color-bg-card)] border-l-4 border-[var(--color-green)] p-6 rounded-r-xl border-y border-r border-y-[var(--color-border)] border-r-[var(--color-border)]">
      <h3 className="text-xl font-bold mb-2">Ready to do this for real?</h3>
      <p className="text-[var(--color-text-muted)] mb-6">
        Open an investing account with SEB and make your first move.
      </p>
      <a 
        href="https://seb.ee" 
        target="_blank" 
        rel="noreferrer"
        className="block w-full text-center bg-[var(--color-green)] text-white font-bold py-4 rounded-xl"
      >
        Start with SEB
      </a>
    </div>
  );
}
