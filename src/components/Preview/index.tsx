import type { RefObject } from "react";
import styles from "./Preview.module.css";

interface Props {
  previewRef: RefObject<HTMLCanvasElement | null>;
  actualRef: RefObject<HTMLCanvasElement | null>;
  size: number;
}

export default function Preview({ previewRef, actualRef, size }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Preview</div>

      <div className={styles.largeCanvasWrapper}>
        <canvas
          ref={previewRef}
          width={280}
          height={280}
          style={{ display: "block", width: 280, height: 280 }}
        />
      </div>

      <div className={styles.actualSizeRow}>
        <span className={styles.actualSizeLabel}>Actual size →</span>
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
    </div>
  );
}
