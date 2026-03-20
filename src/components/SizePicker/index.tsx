import { SIZES } from "../../constants";
import shared from "../../styles/shared.module.css";
import styles from "./SizePicker.module.css";

interface Props {
  size: number;
  onSizeChange: (size: number) => void;
}

export default function SizePicker({ size, onSizeChange }: Props) {
  return (
    <fieldset className={shared.fieldset}>
      <legend className={shared.legend}>Size</legend>
      <div className={styles.row}>
        {SIZES.map((s) => (
          <button
            key={s.value}
            onClick={() => onSizeChange(s.value)}
            className={`${styles.sizeBtn} ${size === s.value ? styles.active : ""}`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
