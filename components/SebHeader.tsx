import Image from "next/image";

export default function SebHeader() {
  return (
    <header className="w-full bg-[var(--color-green)] h-16 flex items-center px-4">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 relative overflow-hidden rounded-sm">
          <Image 
            src="/seb-logo.svg" 
            alt="SEB Logo" 
            width={56} 
            height={56} 
            className="object-cover w-full h-full"
          />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">Higher or Lower</span>
      </div>
    </header>
  );
}
