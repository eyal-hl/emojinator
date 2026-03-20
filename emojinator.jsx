import { useState, useRef, useEffect, useCallback } from "react";

const GOOGLE_FONTS = [
  { name: "Heebo", weight: "900", label: "Heebo Black" },
  { name: "Rubik", weight: "700", label: "Rubik Bold" },
  { name: "Assistant", weight: "800", label: "Assistant ExtraBold" },
  { name: "Noto Sans Hebrew", weight: "900", label: "Noto Sans Black" },
  { name: "Open Sans", weight: "800", label: "Open Sans ExtraBold" },
  { name: "Secular One", weight: "400", label: "Secular One" },
  { name: "Varela Round", weight: "400", label: "Varela Round" },
  { name: "Suez One", weight: "400", label: "Suez One (Serif)" },
];

const COLOR_PALETTE = [
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

const SIZES = [
  { value: 64, label: "64×64" },
  { value: 128, label: "128×128" },
  { value: 256, label: "256×256" },
  { value: 512, label: "512×512" },
];

function transliterate(text) {
  const map = {
    "א": "a", "ב": "b", "ג": "g", "ד": "d", "ה": "h", "ו": "v",
    "ז": "z", "ח": "ch", "ט": "t", "י": "y", "כ": "k", "ך": "k",
    "ל": "l", "מ": "m", "ם": "m", "נ": "n", "ן": "n", "ס": "s",
    "ע": "a", "פ": "p", "ף": "f", "צ": "ts", "ץ": "ts", "ק": "k",
    "ר": "r", "ש": "sh", "ת": "t",
  };
  return text
    .split("")
    .map((c) => map[c] || c)
    .join("")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function generateFilename(topText, bottomText) {
  const top = transliterate(topText.trim());
  const bottom = transliterate(bottomText.trim());
  if (top && bottom) return `${top}-${bottom}`;
  if (top) return top;
  if (bottom) return bottom;
  return "emoji";
}

function fitText(ctx, text, maxWidth, maxFontSize, fontFamily, fontWeight) {
  let size = maxFontSize;
  ctx.font = `${fontWeight} ${size}px "${fontFamily}", sans-serif`;
  while (ctx.measureText(text).width > maxWidth && size > 6) {
    size -= 1;
    ctx.font = `${fontWeight} ${size}px "${fontFamily}", sans-serif`;
  }
  return size;
}

function drawEmoji(canvas, { bgColor, topText, bottomText, size, fontFamily, fontWeight }) {
  const ctx = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = size;

  // Background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  if (!topText && !bottomText) return;

  const padding = size * 0.08;
  const maxWidth = size - padding * 2;
  const maxFontSize = size * 0.38;
  const lineGap = size * 0.04;

  ctx.fillStyle = "#000000";
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

export default function Emojinator() {
  const [bgColor, setBgColor] = useState("#E8A230");
  const [customColor, setCustomColor] = useState("#E8A230");
  const [isCustom, setIsCustom] = useState(false);
  const [topText, setTopText] = useState("תודה");
  const [bottomText, setBottomText] = useState("אורן");
  const [size, setSize] = useState(128);
  const [fontIndex, setFontIndex] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [customFilename, setCustomFilename] = useState("");

  const exportRef = useRef(null);
  const previewRef = useRef(null);
  const actualRef = useRef(null);

  // Load Google Fonts
  useEffect(() => {
    const families = GOOGLE_FONTS.map(
      (f) => `family=${f.name.replace(/ /g, "+")}:wght@${f.weight}`
    ).join("&");
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Wait for fonts to load
    const timeout = setTimeout(() => setFontsLoaded(true), 1500);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        clearTimeout(timeout);
        setFontsLoaded(true);
      });
    }
    return () => clearTimeout(timeout);
  }, []);

  const currentFont = GOOGLE_FONTS[fontIndex];
  const activeColor = isCustom ? customColor : bgColor;

  const redraw = useCallback(() => {
    const params = {
      bgColor: activeColor,
      topText,
      bottomText,
      fontFamily: currentFont.name,
      fontWeight: currentFont.weight,
    };

    // Export canvas (actual size)
    if (exportRef.current) {
      drawEmoji(exportRef.current, { ...params, size });
    }
    // Actual size display
    if (actualRef.current) {
      drawEmoji(actualRef.current, { ...params, size });
    }
    // Large preview
    if (previewRef.current) {
      drawEmoji(previewRef.current, { ...params, size: 280 });
    }
  }, [activeColor, topText, bottomText, size, currentFont, fontsLoaded]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const autoFilename = generateFilename(topText, bottomText);
  const finalFilename = customFilename.trim()
    ? customFilename.trim().replace(/\.png$/i, "")
    : autoFilename;

  const handleDownload = () => {
    if (!exportRef.current) return;
    const link = document.createElement("a");
    link.download = `${finalFilename}.png`;
    link.href = exportRef.current.toDataURL("image/png");
    link.click();
  };

  const handlePaletteClick = (color) => {
    setIsCustom(false);
    setBgColor(color);
  };

  const handleCustomClick = () => {
    setIsCustom(true);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg, #0D0D0D)",
      color: "var(--text, #F0EDE6)",
      fontFamily: "'Heebo', 'Segoe UI', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          margin: 0,
          background: "linear-gradient(135deg, #E8A230, #FF6B35, #E91E63)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Emojinator
        </h1>
        <p style={{
          fontSize: 14,
          opacity: 0.5,
          marginTop: 6,
          fontWeight: 400,
        }}>
          Slack emoji generator — Hebrew & English
        </p>
      </div>

      <div style={{
        display: "flex",
        gap: 48,
        width: "100%",
        maxWidth: 820,
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {/* Controls */}
        <div style={{
          flex: "1 1 320px",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
          {/* Color */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Color</legend>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}>
              {COLOR_PALETTE.map((c) => (
                <button
                  key={c.color}
                  title={c.name}
                  onClick={() => handlePaletteClick(c.color)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    border: (!isCustom && bgColor === c.color)
                      ? "2.5px solid #fff"
                      : "2.5px solid transparent",
                    background: c.color,
                    cursor: "pointer",
                    transition: "transform 0.15s, border-color 0.15s",
                    transform: (!isCustom && bgColor === c.color) ? "scale(1.15)" : "scale(1)",
                    outline: "none",
                  }}
                />
              ))}
              {/* Custom color */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={handleCustomClick}
                  title="Custom color"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    border: isCustom ? "2.5px solid #fff" : "2.5px solid rgba(255,255,255,0.2)",
                    background: isCustom
                      ? customColor
                      : "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                    cursor: "pointer",
                    transform: isCustom ? "scale(1.15)" : "scale(1)",
                    transition: "transform 0.15s, border-color 0.15s",
                    outline: "none",
                  }}
                />
                {isCustom && (
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    style={{
                      position: "absolute",
                      top: 38,
                      left: -4,
                      width: 40,
                      height: 30,
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  />
                )}
              </div>
            </div>
          </fieldset>

          {/* Text inputs */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Text</legend>
            <input
              type="text"
              placeholder="Top text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              style={inputStyle}
              dir="auto"
            />
            <input
              type="text"
              placeholder="Bottom text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              style={{ ...inputStyle, marginTop: 8 }}
              dir="auto"
            />
          </fieldset>

          {/* Font picker */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Font</legend>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
            }}>
              {GOOGLE_FONTS.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setFontIndex(i)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "none",
                    background: i === fontIndex ? "rgba(232,162,48,0.25)" : "rgba(255,255,255,0.06)",
                    color: i === fontIndex ? "#E8A230" : "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    fontFamily: `'${f.name}', sans-serif`,
                    fontWeight: f.weight,
                    fontSize: 13,
                    transition: "all 0.15s",
                    outline: i === fontIndex ? "1px solid rgba(232,162,48,0.4)" : "none",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Size */}
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>Size</legend>
            <div style={{ display: "flex", gap: 6 }}>
              {SIZES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSize(s.value)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    border: "none",
                    background: size === s.value ? "rgba(232,162,48,0.25)" : "rgba(255,255,255,0.06)",
                    color: size === s.value ? "#E8A230" : "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                    transition: "all 0.15s",
                    outline: size === s.value ? "1px solid rgba(232,162,48,0.4)" : "none",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Preview + Download */}
        <div style={{
          flex: "0 0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}>
          <div style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            opacity: 0.4,
            fontWeight: 600,
          }}>
            Preview
          </div>

          {/* Large preview */}
          <div style={{
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}>
            <canvas
              ref={previewRef}
              width={280}
              height={280}
              style={{ display: "block", width: 280, height: 280 }}
            />
          </div>

          {/* Actual size preview */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: 0.6,
          }}>
            <span style={{ fontSize: 11 }}>Actual size →</span>
            <canvas
              ref={actualRef}
              width={size}
              height={size}
              style={{
                display: "block",
                width: size,
                height: size,
                borderRadius: 4,
                imageRendering: size <= 64 ? "pixelated" : "auto",
              }}
            />
          </div>

          {/* Filename */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontFamily: "monospace",
            fontSize: 13,
          }}>
            <input
              type="text"
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
              placeholder={autoFilename}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 6,
                color: "#F0EDE6",
                fontFamily: "monospace",
                fontSize: 13,
                padding: "6px 10px",
                width: 160,
                outline: "none",
                boxSizing: "border-box",
              }}
              dir="ltr"
            />
            <span style={{ opacity: 0.35 }}>.png</span>
          </div>

          {/* Download */}
          <button
            onClick={handleDownload}
            style={{
              padding: "12px 36px",
              borderRadius: 8,
              border: "none",
              background: "linear-gradient(135deg, #E8A230, #FF6B35)",
              color: "#000",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
              boxShadow: "0 4px 20px rgba(232,162,48,0.3)",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 28px rgba(232,162,48,0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 20px rgba(232,162,48,0.3)";
            }}
          >
            ↓ Download
          </button>
        </div>
      </div>

      {/* Hidden canvas for actual export */}
      <canvas
        ref={exportRef}
        style={{ display: "none" }}
      />

      <div style={{
        marginTop: 60,
        fontSize: 11,
        opacity: 0.2,
      }}>
        Emojinator — Made for Slack emoji addicts
      </div>
    </div>
  );
}

const fieldsetStyle = {
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10,
  padding: "14px 16px",
  margin: 0,
  background: "rgba(255,255,255,0.02)",
};

const legendStyle = {
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  opacity: 0.45,
  fontWeight: 600,
  padding: "0 6px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.05)",
  color: "#F0EDE6",
  fontSize: 16,
  fontFamily: "'Heebo', sans-serif",
  outline: "none",
  boxSizing: "border-box",
  direction: "auto",
};
