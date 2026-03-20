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

export interface DrawEmojiParams {
  bgColor: string;
  fontColor: string;
  topText: string;
  bottomText: string;
  size: number;
  fontFamily: string;
  fontWeight: string;
  gradientEnabled: boolean;
  gradientColor2: string;
}
