"use client";
import { useState, useEffect } from "react";
import { leaderboardDaily, leaderboardMonthly, leaderboardAllTime, LeaderboardEntry } from "@/data/leaderboard";

interface LeaderboardProps {
  playerScore?: number;
}

export default function Leaderboard({ playerScore }: LeaderboardProps) {
  const [tab, setTab] = useState<"daily" | "monthly" | "allTime">("daily");
  const [displayScore, setDisplayScore] = useState<number | undefined>(playerScore);

  useEffect(() => {
    const stored = localStorage.getItem("highScore");
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (parsed > (playerScore || 0)) {
        setDisplayScore(parsed);
      }
    }
  }, [playerScore]);

  let data: LeaderboardEntry[] = [];
  if (tab === "daily") data = leaderboardDaily;
  if (tab === "monthly") data = leaderboardMonthly;
  if (tab === "allTime") data = leaderboardAllTime;

  data = data.map((d, i) => ({ ...d, rank: i + 1 }));

  const topScore = data[0]?.score || 0;
  let playerRank = 0;
  if (displayScore !== undefined) {
    // Check if player beats anyone in the top 10
    const beatIndex = data.findIndex(entry => displayScore >= entry.score);
    
    if (beatIndex !== -1) {
      playerRank = data[beatIndex].rank;
      
      // Insert the player into the top 10 list
      data.splice(beatIndex, 0, { rank: playerRank, username: "You", score: displayScore });
      data.pop(); // Keep the list strictly at 10 players
      
      // Re-assign ranks for the players pushed down
      for (let i = beatIndex + 1; i < data.length; i++) {
        data[i].rank = i + 1;
      }
    } else {
      // If score is worse than the top 10, calculate a rank between 11 and 90
      const lowestTop10Score = data[data.length - 1]?.score || 1;
      const totalPlayers = 90;
      const ratio = Math.max(0, Math.min(1, displayScore / lowestTop10Score));
      playerRank = 11 + Math.floor(Math.pow(1 - ratio, 3) * (totalPlayers - 11));
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
        {["daily", "monthly", "allTime"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t as "daily" | "monthly" | "allTime")}
            className={`flex-1 py-2 text-sm font-bold rounded-md capitalize transition-all ${tab === t ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-gray-700"}`}
          >
            {t === "allTime" ? "All Time" : t}
          </button>
        ))}
      </div>
      
      {displayScore !== undefined && (
        <div className="mb-6">
          <div className="flex items-center justify-between p-4 bg-[var(--color-green)]/10 border-2 border-[var(--color-green)]/30 rounded-xl">
            <div className="flex items-center gap-4">
              <span className="font-bold text-[var(--color-green)] w-8 text-center">{playerRank.toLocaleString()}</span>
              <span className="font-bold text-gray-900">You</span>
            </div>
            <span className="font-bold text-[var(--color-green)] text-lg">{displayScore}</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {data.slice(0, 10).map((entry, index) => {
          const isPlayer = entry.username === "You";
          return (
            <div 
              key={`${entry.username}-${index}`} 
              className={`flex items-center justify-between p-4 rounded-xl border ${isPlayer ? "bg-[var(--color-green)]/10 border-[var(--color-green)]/30" : "bg-[var(--color-bg-card)] border-[var(--color-border)]"}`}
            >
              <div className="flex items-center gap-4">
                <span className={`font-bold w-8 text-center ${isPlayer ? "text-[var(--color-green)]" : "text-gray-400"}`}>{entry.rank}</span>
                <span className={`font-bold ${isPlayer ? "text-gray-900" : "text-gray-800"}`}>{entry.username}</span>
              </div>
              <span className="font-bold text-[var(--color-green)] text-lg">{entry.score}</span>
            </div>
          );
        })}
        {data.length === 0 && (
          <div className="text-center text-gray-500 py-4">No entries found.</div>
        )}
      </div>
    </div>
  );
}
