import type { Font, ColorOption, SizeOption } from "./types";

export const GOOGLE_FONTS: Font[] = [
  { name: "Heebo", weight: "900", label: "Heebo Black" },
  { name: "Rubik", weight: "700", label: "Rubik Bold" },
  { name: "Assistant", weight: "800", label: "Assistant ExtraBold" },
  { name: "Noto Sans Hebrew", weight: "900", label: "Noto Sans Black" },
  { name: "Open Sans", weight: "800", label: "Open Sans ExtraBold" },
  { name: "Secular One", weight: "400", label: "Secular One" },
  { name: "Varela Round", weight: "400", label: "Varela Round" },
  { name: "Suez One", weight: "400", label: "Suez One (Serif)" },
];

export const COLOR_PALETTE: ColorOption[] = [
  { color: "#E8A230", name: "Slack Yellow" },
  { color: "#E74C3C", name: "Red" },
  { color: "#E91E63", name: "Pink" },
  { color: "#FF6B35", name: "Orange" },
  { color: "#2ECC71", name: "Green" },
  { color: "#00897B", name: "Teal" },
  { color: "#3498DB", name: "Blue" },
  { color: "#1A237E", name: "Navy" },
  { color: "#9B59B6", name: "Purple" },
  { color: "#795548", name: "Brown" },
  { color: "#34495E", name: "Charcoal" },
  { color: "#000000", name: "Black" },
];

export const SIZES: SizeOption[] = [
  { value: 64, label: "64×64" },
  { value: 128, label: "128×128" },
  { value: 256, label: "256×256" },
  { value: 512, label: "512×512" },
];
