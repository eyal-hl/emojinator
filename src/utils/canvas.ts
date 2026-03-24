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

function getLines(text: string): string[] {
  const raw = text.split("\n");
  // Trim leading and trailing empty lines
  let start = 0;
  let end = raw.length - 1;
  while (start <= end && !raw[start].trim()) start++;
  while (end >= start && !raw[end].trim()) end--;
  return raw.slice(start, end + 1);
}

export function drawEmoji(
  canvas: HTMLCanvasElement,
  { bgColor, fontColor, text, size, fontFamily, fontWeight, gradientEnabled, gradientColor2 }: DrawEmojiParams
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

  const lines = getLines(text);
  if (lines.length === 0) return;

  const padding = size * 0.04;
  const maxWidth = size - padding * 2;
  const lineGap = size * 0.03;
  const availableHeight = size - padding * 2 - lineGap * (lines.length - 1);
  const maxFontSize = Math.min(availableHeight / lines.length, size * 0.44);

  ctx.fillStyle = fontColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  // Each line gets its own font size; blank lines use maxFontSize as spacer height
  const sizes = lines.map((line) =>
    line.trim()
      ? fitText(ctx, line, maxWidth, maxFontSize, fontFamily, fontWeight)
      : maxFontSize
  );

  const totalHeight = sizes.reduce((sum, s) => sum + s, 0) + lineGap * (lines.length - 1);
  let y = (size - totalHeight) / 2;

  lines.forEach((line, i) => {
    if (line.trim()) {
      ctx.font = `${fontWeight} ${sizes[i]}px "${fontFamily}", sans-serif`;
      ctx.fillText(line, size / 2, y);
    }
    y += sizes[i] + lineGap;
  });
}
