"use client";
import { useState } from "react";
import { leaderboardDaily, leaderboardMonthly, leaderboardAllTime, LeaderboardEntry } from "@/data/leaderboard";

export default function Leaderboard() {
  const [tab, setTab] = useState<"daily" | "monthly" | "allTime">("daily");
  const [country, setCountry] = useState<"all" | "EE" | "LV" | "LT">("all");

  let data: LeaderboardEntry[] = [];
  if (tab === "daily") data = leaderboardDaily;
  if (tab === "monthly") data = leaderboardMonthly;
  if (tab === "allTime") data = leaderboardAllTime;

  if (country === "EE") data = data.filter(d => d.country === "🇪🇪");
  if (country === "LV") data = data.filter(d => d.country === "🇱🇻");
  if (country === "LT") data = data.filter(d => d.country === "🇱🇹");

  data = data.map((d, i) => ({ ...d, rank: i + 1 }));

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
        {["daily", "monthly", "allTime"].map(t => (
          <button
            key={t}
            onClick={() => setTab(t as "daily" | "monthly" | "allTime")}
            className={`flex-1 py-2 text-sm font-bold rounded-md capitalize ${tab === t ? "bg-white shadow-sm text-black" : "text-gray-500"}`}
          >
            {t === "allTime" ? "All Time" : t}
          </button>
        ))}
      </div>
      
      <div className="flex gap-4 justify-center mb-6 text-2xl">
        <button onClick={() => setCountry("all")} className={`grayscale transition ${country === "all" ? "grayscale-0 scale-110" : "opacity-50"}`}>🌍</button>
        <button onClick={() => setCountry("EE")} className={`grayscale transition ${country === "EE" ? "grayscale-0 scale-110" : "opacity-50"}`}>🇪🇪</button>
        <button onClick={() => setCountry("LV")} className={`grayscale transition ${country === "LV" ? "grayscale-0 scale-110" : "opacity-50"}`}>🇱🇻</button>
        <button onClick={() => setCountry("LT")} className={`grayscale transition ${country === "LT" ? "grayscale-0 scale-110" : "opacity-50"}`}>🇱🇹</button>
      </div>

      <div className="space-y-2">
        {data.slice(0, 10).map((entry, index) => (
          <div key={`${entry.username}-${index}`} className="flex items-center justify-between p-4 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center gap-4">
              <span className="font-bold text-gray-400 w-4">{entry.rank}</span>
              <span className="text-xl">{entry.country}</span>
              <span className="font-bold">{entry.username}</span>
            </div>
            <span className="font-bold text-[var(--color-green)]">{entry.score}</span>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center text-gray-500 py-4">No entries found.</div>
        )}
      </div>
    </div>
  );
}
