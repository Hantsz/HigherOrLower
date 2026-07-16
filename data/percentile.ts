export function getPercentile(score: number): number {
  if (score <= 0) return 0;
  
  // A realistic distribution curve where most players fail early.
  // score: index
  const distribution = [
    0,   // 0
    12,  // 1
    28,  // 2
    41,  // 3
    52,  // 4
    62,  // 5
    71,  // 6
    78,  // 7
    84,  // 8
    88,  // 9
    91,  // 10
    94,  // 11
    96,  // 12
    97,  // 13
    98,  // 14
    99   // 15
  ];
  
  if (score < distribution.length) return distribution[score];
  return 99;
}
