import { useState, useRef, useEffect, useCallback } from "react";
import { pickRandomName } from "./names";
import { GOOGLE_FONTS } from "./constants";
import { generateFilename } from "./utils/transliterate";
import { drawEmoji } from "./utils/canvas";
import ColorPicker from "./components/ColorPicker";
import FontColorPicker from "./components/FontColorPicker";
import TextInputs from "./components/TextInputs";
import FontPicker from "./components/FontPicker";
import SizePicker from "./components/SizePicker";
import Preview from "./components/Preview";
import DownloadSection from "./components/DownloadSection";
import styles from "./Emojinator.module.css";

export default function Emojinator() {
  // Background color
  const [bgColor, setBgColor] = useState("#F0C020");
  const [customColor, setCustomColor] = useState("#F0C020");
  const [isCustomBg, setIsCustomBg] = useState(false);
  const [gradientEnabled, setGradientEnabled] = useState(false);
  const [gradientColor2, setGradientColor2] = useState("#FF6B35");

  // Font color
  const [fontColor, setFontColor] = useState("#000000");
  const [customFontColor, setCustomFontColor] = useState("#000000");
  const [isCustomFont, setIsCustomFont] = useState(false);

  // Text
  const [topText, setTopText] = useState("תודה");
  const [bottomText, setBottomText] = useState(pickRandomName);

  // Other
  const [size, setSize] = useState(128);
  const [fontIndex, setFontIndex] = useState(0);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [customFilename, setCustomFilename] = useState("");

  const exportRef = useRef<HTMLCanvasElement>(null);
  const actualRef = useRef<HTMLCanvasElement>(null);
  const filenameRef = useRef<HTMLInputElement>(null);
  const bottomTextRef = useRef<HTMLInputElement>(null);

  // Load Google Fonts
  useEffect(() => {
    const families = GOOGLE_FONTS.map(
      (f) => `family=${f.name.replace(/ /g, "+")}:wght@${f.weight}`
    ).join("&");
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const timeout = setTimeout(() => setFontsLoaded(true), 1500);
    document.fonts.ready.then(() => {
      clearTimeout(timeout);
      setFontsLoaded(true);
    });
    return () => clearTimeout(timeout);
  }, []);

  const currentFont = GOOGLE_FONTS[fontIndex];
  const activeBgColor = isCustomBg ? customColor : bgColor;
  const activeFontColor = isCustomFont ? customFontColor : fontColor;

  const redraw = useCallback(() => {
    const params = {
      bgColor: activeBgColor,
      fontColor: activeFontColor,
      topText,
      bottomText,
      fontFamily: currentFont.name,
      fontWeight: currentFont.weight,
      gradientEnabled,
      gradientColor2,
    };
    if (exportRef.current) drawEmoji(exportRef.current, { ...params, size });
    if (actualRef.current) drawEmoji(actualRef.current, { ...params, size });
  }, [activeBgColor, activeFontColor, topText, bottomText, size, currentFont, gradientEnabled, gradientColor2, fontsLoaded]);

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

  const handleBottomTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      filenameRef.current?.focus();
    }
  };

  const handleFilenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();
      bottomTextRef.current?.focus();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Emojinator</h1>
        <p className={styles.subtitle}>Slack emoji generator — Hebrew & English</p>
      </div>

      <div className={styles.layout}>
        <div className={styles.controls}>
          <ColorPicker
            bgColor={bgColor}
            isCustom={isCustomBg}
            customColor={customColor}
            gradientEnabled={gradientEnabled}
            gradientColor2={gradientColor2}
            onPaletteClick={(color) => { setIsCustomBg(false); setBgColor(color); }}
            onCustomClick={() => setIsCustomBg(true)}
            onCustomColorChange={setCustomColor}
            onGradientToggle={() => setGradientEnabled((v) => !v)}
            onGradientColor2Change={setGradientColor2}
          />

          <FontColorPicker
            fontColor={fontColor}
            isCustom={isCustomFont}
            customFontColor={customFontColor}
            onPaletteClick={(color) => { setIsCustomFont(false); setFontColor(color); }}
            onCustomClick={() => setIsCustomFont(true)}
            onCustomColorChange={setCustomFontColor}
          />

          <TextInputs
            topText={topText}
            bottomText={bottomText}
            onTopChange={setTopText}
            onBottomChange={setBottomText}
            bottomTextRef={bottomTextRef}
            onBottomTextKeyDown={handleBottomTextKeyDown}
          />

          <FontPicker fontIndex={fontIndex} onFontChange={setFontIndex} />

          <SizePicker size={size} onSizeChange={setSize} />
        </div>

        <div className={styles.previewColumn}>
          <Preview actualRef={actualRef} size={size} />

          <DownloadSection
            filenameRef={filenameRef}
            exportRef={exportRef}
            customFilename={customFilename}
            autoFilename={autoFilename}
            onFilenameChange={setCustomFilename}
            onFilenameKeyDown={handleFilenameKeyDown}
            onDownload={handleDownload}
          />
        </div>
      </div>

      <canvas ref={exportRef} style={{ display: "none" }} />

      <div className={styles.footer}>Emojinator — Made for Slack emoji addicts</div>
    </div>
  );
}
