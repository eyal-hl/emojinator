export interface Font {
  name: string;
  weight: string;
  label: string;
}

export interface ColorOption {
  color: string;
  name: string;
}

export interface SizeOption {
  value: number;
  label: string;
}

export type TextAlign = "left" | "center" | "right";

export interface DrawEmojiParams {
  bgColor: string;
  fontColor: string;
  topText: string;
  bottomText: string;
  size: number;
  fontFamily: string;
  fontWeight: string;
  textAlign: TextAlign;
  strokeEnabled: boolean;
  strokeColor: string;
  gradientEnabled: boolean;
  gradientColor2: string;
}
