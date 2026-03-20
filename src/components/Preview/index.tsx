import type { RefObject } from "react";
import styles from "./Preview.module.css";

interface Props {
  actualRef: RefObject<HTMLCanvasElement | null>;
  size: number;
}

export default function Preview({ actualRef, size }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>Preview</div>
      <canvas
        ref={actualRef}
        width={size}
        height={size}
        style={{
          display: "block",
          width: size,
          height: size,
          borderRadius: 8,
          imageRendering: size <= 64 ? "pixelated" : "auto",
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
}
