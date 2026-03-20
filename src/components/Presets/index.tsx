import shared from "../../styles/shared.module.css";
import styles from "./Presets.module.css";

interface Preset {
  top: string;
  bottom: string;
}

const PRESETS: Preset[] = [
  { top: "תודה", bottom: "רבה" },
  { top: "כל", bottom: "הכבוד" },
  { top: "מזל", bottom: "טוב" },
  { top: "בהצלחה", bottom: "!" },
  { top: "אחלה", bottom: "עבודה" },
  { top: "שבת", bottom: "שלום" },
  { top: "חג", bottom: "שמח" },
  { top: "WFH", bottom: "mode" },
  { top: "OOO", bottom: "today" },
  { top: "LGTM", bottom: "✓" },
];

interface Props {
  onSelect: (top: string, bottom: string) => void;
}

export default function Presets({ onSelect }: Props) {
  return (
    <fieldset className={shared.fieldset}>
      <legend className={shared.legend}>Presets</legend>
      <div className={styles.grid}>
        {PRESETS.map((p) => (
          <button
            key={`${p.top}-${p.bottom}`}
            onClick={() => onSelect(p.top, p.bottom)}
            className={styles.presetBtn}
          >
            {p.top} {p.bottom}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
