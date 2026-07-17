"use client";

import Link from "next/link";
import SebHeader from "@/components/SebHeader";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    localStorage.setItem("hasSeenIntro", "true");
  }, []);

  return (
    <main className="min-h-[100dvh] flex flex-col bg-white">
      <SebHeader />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-[var(--color-text-primary)] tracking-tight">
          Your investing era starts here.
        </h1>
        
        <p className="text-lg text-[var(--color-text-muted)] mb-12">
          Guess which asset has grown more in a year. Reach a score of 15 to get 20€ into any SEB fund and no roboinvestor fees for the first year! (Log in to save your score).
        </p>
        
        <Link 
          href="/game"
          className="w-full block bg-[var(--color-green)] text-white font-bold text-xl py-4 rounded-xl mb-4 transition-colors shadow-sm"
        >
          Play
        </Link>
        
        <p className="text-sm text-[var(--color-text-muted)]">
          No account needed to play
        </p>
      </div>
    </main>
  );
}
