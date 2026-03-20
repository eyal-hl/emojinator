import { GOOGLE_FONTS } from "../../constants";
import shared from "../../styles/shared.module.css";
import styles from "./FontPicker.module.css";

interface Props {
  fontIndex: number;
  onFontChange: (index: number) => void;
}

export default function FontPicker({ fontIndex, onFontChange }: Props) {
  return (
    <fieldset className={shared.fieldset}>
      <legend className={shared.legend}>Font</legend>
      <div className={styles.grid}>
        {GOOGLE_FONTS.map((f, i) => (
          <button
            key={f.name}
            onClick={() => onFontChange(i)}
            className={`${styles.fontBtn} ${i === fontIndex ? styles.active : ""}`}
            style={{ fontFamily: `'${f.name}', sans-serif`, fontWeight: f.weight }}
          >
            {f.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
