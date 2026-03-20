import type { DrawEmojiParams } from "../types";

function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxFontSize: number,
  fontFamily: string,
  fontWeight: string
): number {
  let size = maxFontSize;
  ctx.font = `${fontWeight} ${size}px "${fontFamily}", sans-serif`;
  while (ctx.measureText(text).width > maxWidth && size > 6) {
    size -= 1;
    ctx.font = `${fontWeight} ${size}px "${fontFamily}", sans-serif`;
  }
  return size;
}

export function drawEmoji(
  canvas: HTMLCanvasElement,
  { bgColor, fontColor, topText, bottomText, size, fontFamily, fontWeight, gradientEnabled, gradientColor2 }: DrawEmojiParams
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = size;
  canvas.height = size;

  if (gradientEnabled) {
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, bgColor);
    gradient.addColorStop(1, gradientColor2);
    ctx.fillStyle = gradient;
  } else {
    ctx.fillStyle = bgColor;
  }
  ctx.fillRect(0, 0, size, size);

  if (!topText && !bottomText) return;

  const padding = size * 0.08;
  const maxWidth = size - padding * 2;
  const maxFontSize = size * 0.38;
  const lineGap = size * 0.04;

  ctx.fillStyle = fontColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (topText && bottomText) {
    const topSize = fitText(ctx, topText, maxWidth, maxFontSize, fontFamily, fontWeight);
    const bottomSize = fitText(ctx, bottomText, maxWidth, maxFontSize, fontFamily, fontWeight);
    const totalHeight = topSize + bottomSize + lineGap;
    const startY = (size - totalHeight) / 2 + topSize / 2;

    ctx.font = `${fontWeight} ${topSize}px "${fontFamily}", sans-serif`;
    ctx.fillText(topText, size / 2, startY);

    ctx.font = `${fontWeight} ${bottomSize}px "${fontFamily}", sans-serif`;
    ctx.fillText(bottomText, size / 2, startY + topSize / 2 + lineGap + bottomSize / 2);
  } else {
    const text = topText || bottomText;
    const fontSize = fitText(ctx, text, maxWidth, size * 0.5, fontFamily, fontWeight);
    ctx.font = `${fontWeight} ${fontSize}px "${fontFamily}", sans-serif`;
    ctx.fillText(text, size / 2, size / 2);
  }
}
