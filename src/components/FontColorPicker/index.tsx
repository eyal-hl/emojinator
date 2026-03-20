import shared from "../../styles/shared.module.css";
import styles from "./FontColorPicker.module.css";

const FONT_COLOR_PALETTE = [
  { color: "#000000", name: "Black" },
  { color: "#FFFFFF", name: "White" },
  { color: "#E8A230", name: "Yellow" },
  { color: "#E74C3C", name: "Red" },
  { color: "#3498DB", name: "Blue" },
  { color: "#2ECC71", name: "Green" },
  { color: "#E91E63", name: "Pink" },
  { color: "#9B59B6", name: "Purple" },
];

interface Props {
  fontColor: string;
  isCustom: boolean;
  customFontColor: string;
  onPaletteClick: (color: string) => void;
  onCustomClick: () => void;
  onCustomColorChange: (color: string) => void;
}

export default function FontColorPicker({
  fontColor,
  isCustom,
  customFontColor,
  onPaletteClick,
  onCustomClick,
  onCustomColorChange,
}: Props) {
  return (
    <fieldset className={shared.fieldset}>
      <legend className={shared.legend}>Text Color</legend>
      <div className={styles.swatchGrid}>
        {FONT_COLOR_PALETTE.map((c) => (
          <button
            key={c.color}
            title={c.name}
            onClick={() => onPaletteClick(c.color)}
            className={`${styles.swatch} ${!isCustom && fontColor === c.color ? styles.selected : ""}`}
            style={{
              background: c.color,
              boxShadow: c.color === "#FFFFFF" ? "inset 0 0 0 1px rgba(255,255,255,0.2)" : undefined,
            }}
          />
        ))}

        <div className={styles.customWrapper}>
          <button
            onClick={onCustomClick}
            title="Custom text color"
            className={styles.customSwatch}
            style={{
              border: isCustom ? "2.5px solid #fff" : "2.5px solid rgba(255,255,255,0.2)",
              background: isCustom
                ? customFontColor
                : "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
              transform: isCustom ? "scale(1.15)" : "scale(1)",
            }}
          />
          {isCustom && (
            <input
              type="color"
              value={customFontColor}
              onChange={(e) => onCustomColorChange(e.target.value)}
              className={styles.colorInput}
            />
          )}
        </div>
      </div>
    </fieldset>
  );
}
