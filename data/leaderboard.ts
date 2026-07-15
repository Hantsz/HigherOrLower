export type LeaderboardEntry = {
  rank: number;
  username: string;
  country: string;
  score: number;
};

export const leaderboardDaily: LeaderboardEntry[] = [
  { rank: 1, username: "kalle_ee", country: "🇪🇪", score: 10 },
  { rank: 2, username: "invest_lv", country: "🇱🇻", score: 9 },
  { rank: 3, username: "turgus99", country: "🇱🇹", score: 9 },
  { rank: 4, username: "martins_l", country: "🇱🇻", score: 8 },
  { rank: 5, username: "anna_123", country: "🇪🇪", score: 8 },
  { rank: 6, username: "seb_fan", country: "🇱🇹", score: 7 },
  { rank: 7, username: "tallinn_boy", country: "🇪🇪", score: 7 },
  { rank: 8, username: "riga_trader", country: "🇱🇻", score: 6 },
  { rank: 9, username: "vilnius_pro", country: "🇱🇹", score: 6 },
  { rank: 10, username: "newbie1", country: "🇪🇪", score: 5 },
];

export const leaderboardMonthly: LeaderboardEntry[] = [
  { rank: 1, username: "tallinn_boss", country: "🇪🇪", score: 10 },
  { rank: 2, username: "kalle_ee", country: "🇪🇪", score: 10 },
  { rank: 3, username: "invest_lv", country: "🇱🇻", score: 10 },
  { rank: 4, username: "turgus99", country: "🇱🇹", score: 9 },
  { rank: 5, username: "martins_l", country: "🇱🇻", score: 9 },
  { rank: 6, username: "liis_x", country: "🇪🇪", score: 8 },
  { rank: 7, username: "seb_fan", country: "🇱🇹", score: 8 },
  { rank: 8, username: "riga_trader", country: "🇱🇻", score: 7 },
  { rank: 9, username: "anna_123", country: "🇪🇪", score: 7 },
  { rank: 10, username: "vilnius_pro", country: "🇱🇹", score: 6 },
];

export const leaderboardAllTime: LeaderboardEntry[] = [
  { rank: 1, username: "god_trader", country: "🇱🇹", score: 10 },
  { rank: 2, username: "tallinn_boss", country: "🇪🇪", score: 10 },
  { rank: 3, username: "kalle_ee", country: "🇪🇪", score: 10 },
  { rank: 4, username: "invest_lv", country: "🇱🇻", score: 10 },
  { rank: 5, username: "riga_whale", country: "🇱🇻", score: 10 },
  { rank: 6, username: "turgus99", country: "🇱🇹", score: 9 },
  { rank: 7, username: "martins_l", country: "🇱🇻", score: 9 },
  { rank: 8, username: "liis_x", country: "🇪🇪", score: 9 },
  { rank: 9, username: "seb_fan", country: "🇱🇹", score: 8 },
  { rank: 10, username: "anna_123", country: "🇪🇪", score: 8 },
];
