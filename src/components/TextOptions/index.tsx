import { useState } from "react";
import type { TextAlign } from "../../types";
import shared from "../../styles/shared.module.css";
import styles from "./TextOptions.module.css";

interface Props {
  textAlign: TextAlign;
  strokeEnabled: boolean;
  strokeColor: string;
  onAlignChange: (align: TextAlign) => void;
  onStrokeToggle: () => void;
  onStrokeColorChange: (color: string) => void;
}

const ALIGN_OPTIONS: { value: TextAlign; label: string }[] = [
  { value: "left", label: "←" },
  { value: "center", label: "↔" },
  { value: "right", label: "→" },
];

export default function TextOptions({
  textAlign,
  strokeEnabled,
  strokeColor,
  onAlignChange,
  onStrokeToggle,
  onStrokeColorChange,
}: Props) {
  const [showStrokeColor, setShowStrokeColor] = useState(false);

  return (
    <fieldset className={shared.fieldset}>
      <legend className={shared.legend}>Text Options</legend>
      <div className={styles.row}>
        <div className={styles.group}>
          <span className={styles.groupLabel}>Align</span>
          <div className={styles.btnRow}>
            {ALIGN_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onAlignChange(opt.value)}
                className={`${styles.btn} ${textAlign === opt.value ? styles.active : ""}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.groupLabel}>Outline</span>
          <div className={styles.strokeRow}>
            <button
              onClick={onStrokeToggle}
              className={`${styles.btn} ${strokeEnabled ? styles.active : ""}`}
            >
              {strokeEnabled ? "On" : "Off"}
            </button>
            {strokeEnabled && (
              <div style={{ position: "relative" }}>
                <button
                  className={styles.colorDot}
                  style={{ background: strokeColor }}
                  onClick={() => setShowStrokeColor((v) => !v)}
                  title="Outline color"
                />
                {showStrokeColor && (
                  <input
                    type="color"
                    value={strokeColor}
                    onChange={(e) => onStrokeColorChange(e.target.value)}
                    className={styles.colorInput}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </fieldset>
  );
}
