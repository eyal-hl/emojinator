// Weighted names: { name: weight }. Higher weight = more likely to appear.
const NAMES: Record<string, number> = {
  "אייל": 9,
  "איתי": 1,
};

export function pickRandomName(): string {
  const entries = Object.entries(NAMES);
  const total = entries.reduce((sum, [, w]) => sum + w, 0);
  let roll = Math.random() * total;
  for (const [name, weight] of entries) {
    roll -= weight;
    if (roll <= 0) return name;
  }
  return entries[0][0];
}
