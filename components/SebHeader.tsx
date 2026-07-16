import Image from "next/image";

export default function SebHeader() {
  return (
    <header className="w-full bg-black h-14 flex items-center px-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 relative overflow-hidden rounded-sm">
          <Image 
            src="/seb-logo.png" 
            alt="SEB Logo" 
            width={32} 
            height={32} 
            className="object-cover w-full h-full"
          />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">Higher or Lower</span>
      </div>
    </header>
  );
}
