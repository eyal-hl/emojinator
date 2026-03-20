import { COLOR_PALETTE } from "../../constants";
import shared from "../../styles/shared.module.css";
import styles from "./ColorPicker.module.css";

interface Props {
  bgColor: string;
  isCustom: boolean;
  customColor: string;
  onPaletteClick: (color: string) => void;
  onCustomClick: () => void;
  onCustomColorChange: (color: string) => void;
}

export default function ColorPicker({
  bgColor,
  isCustom,
  customColor,
  onPaletteClick,
  onCustomClick,
  onCustomColorChange,
}: Props) {
  return (
    <fieldset className={shared.fieldset}>
      <legend className={shared.legend}>Color</legend>
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
    </fieldset>
  );
}
