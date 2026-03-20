import { COLOR_PALETTE } from "../../constants";
import shared from "../../styles/shared.module.css";
import styles from "./ColorPicker.module.css";

interface Props {
  bgColor: string;
  isCustom: boolean;
  customColor: string;
  gradientEnabled: boolean;
  gradientColor2: string;
  onPaletteClick: (color: string) => void;
  onCustomClick: () => void;
  onCustomColorChange: (color: string) => void;
  onGradientToggle: () => void;
  onGradientColor2Change: (color: string) => void;
}

export default function ColorPicker({
  bgColor,
  isCustom,
  customColor,
  gradientEnabled,
  gradientColor2,
  onPaletteClick,
  onCustomClick,
  onCustomColorChange,
  onGradientToggle,
  onGradientColor2Change,
}: Props) {
  return (
    <fieldset className={shared.fieldset}>
      <legend className={shared.legend}>Background</legend>
      <div className={styles.swatchGrid}>
        {COLOR_PALETTE.map((c) => (
          <button
            key={c.color}
            title={c.name}
            onClick={() => onPaletteClick(c.color)}
            className={`${styles.swatch} ${!isCustom && bgColor === c.color ? styles.selected : ""}`}
            style={{ background: c.color }}
          />
        ))}

        <div className={styles.customWrapper}>
          <button
            onClick={onCustomClick}
            title="Custom color"
            className={styles.customSwatch}
            style={{
              border: isCustom ? "2.5px solid #fff" : "2.5px solid rgba(255,255,255,0.2)",
              background: isCustom
                ? customColor
                : "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
              transform: isCustom ? "scale(1.15)" : "scale(1)",
            }}
          />
          {isCustom && (
            <input
              type="color"
              value={customColor}
              onChange={(e) => onCustomColorChange(e.target.value)}
              className={styles.colorInput}
            />
          )}
        </div>
      </div>

      <div className={styles.gradientRow}>
        <button
          onClick={onGradientToggle}
          className={`${styles.gradientToggle} ${gradientEnabled ? styles.active : ""}`}
        >
          Gradient
        </button>
        {gradientEnabled && (
          <>
            <span className={styles.gradientArrow}>→</span>
            <input
              type="color"
              value={gradientColor2}
              onChange={(e) => onGradientColor2Change(e.target.value)}
              className={styles.gradientColorInput}
              title="Gradient end color"
            />
          </>
        )}
      </div>
    </fieldset>
  );
}
