import type { DrawEmojiParams, TextAlign } from "../types";

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

function getTextX(align: TextAlign, size: number, padding: number): number {
  if (align === "left") return padding;
  if (align === "right") return size - padding;
  return size / 2;
}

function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  strokeEnabled: boolean,
  strokeColor: string
): void {
  if (strokeEnabled) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(1, fontSize * 0.1);
    ctx.lineJoin = "round";
    ctx.strokeText(text, x, y);
  }
  ctx.fillText(text, x, y);
}

export function drawEmoji(
  canvas: HTMLCanvasElement,
  {
    bgColor, fontColor, topText, bottomText, size, fontFamily, fontWeight,
    textAlign, strokeEnabled, strokeColor, gradientEnabled, gradientColor2,
  }: DrawEmojiParams
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = size;
  canvas.height = size;

  // Background (solid or gradient)
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
  const x = getTextX(textAlign, size, padding);

  ctx.fillStyle = fontColor;
  ctx.textAlign = textAlign;
  ctx.textBaseline = "middle";

  if (topText && bottomText) {
    const topSize = fitText(ctx, topText, maxWidth, maxFontSize, fontFamily, fontWeight);
    const bottomSize = fitText(ctx, bottomText, maxWidth, maxFontSize, fontFamily, fontWeight);
    const totalHeight = topSize + bottomSize + lineGap;
    const startY = (size - totalHeight) / 2 + topSize / 2;

    ctx.font = `${fontWeight} ${topSize}px "${fontFamily}", sans-serif`;
    drawText(ctx, topText, x, startY, topSize, strokeEnabled, strokeColor);

    ctx.font = `${fontWeight} ${bottomSize}px "${fontFamily}", sans-serif`;
    drawText(ctx, bottomText, x, startY + topSize / 2 + lineGap + bottomSize / 2, bottomSize, strokeEnabled, strokeColor);
  } else {
    const text = topText || bottomText;
    const fontSize = fitText(ctx, text, maxWidth, size * 0.5, fontFamily, fontWeight);
    ctx.font = `${fontWeight} ${fontSize}px "${fontFamily}", sans-serif`;
    drawText(ctx, text, x, size / 2, fontSize, strokeEnabled, strokeColor);
  }
}
