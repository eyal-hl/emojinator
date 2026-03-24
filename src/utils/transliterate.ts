const HEBREW_MAP: Record<string, string> = {
  "א": "a", "ב": "b", "ג": "g", "ד": "d", "ה": "h", "ו": "v",
  "ז": "z", "ח": "ch", "ט": "t", "י": "y", "כ": "k", "ך": "k",
  "ל": "l", "מ": "m", "ם": "m", "נ": "n", "ן": "n", "ס": "s",
  "ע": "a", "פ": "p", "ף": "f", "צ": "ts", "ץ": "ts", "ק": "k",
  "ר": "r", "ש": "sh", "ת": "t",
};

export function transliterate(text: string): string {
  return text
    .split("")
    .map((c) => HEBREW_MAP[c] ?? c)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateFilename(text: string): string {
  const firstLine = text.split("\n").find((l) => l.trim()) ?? "";
  const firstWord = firstLine.trim().split(/\s+/)[0] ?? "";
  return transliterate(firstWord) || "emoji";
}
