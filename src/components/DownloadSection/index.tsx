import { useState } from "react";
import type { RefObject, KeyboardEvent } from "react";
import styles from "./DownloadSection.module.css";

interface Props {
  filenameRef: RefObject<HTMLInputElement | null>;
  exportRef: RefObject<HTMLCanvasElement | null>;
  customFilename: string;
  autoFilename: string;
  onFilenameChange: (value: string) => void;
  onFilenameKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onDownload: () => void;
}

export default function DownloadSection({
  filenameRef,
  exportRef,
  customFilename,
  autoFilename,
  onFilenameChange,
  onFilenameKeyDown,
  onDownload,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!exportRef.current) return;
    exportRef.current.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard API not available — silently ignore
      }
    });
  };

  return (
    <>
      <div className={styles.filenameRow}>
        <input
          ref={filenameRef}
          type="text"
          value={customFilename}
          onChange={(e) => onFilenameChange(e.target.value)}
          onKeyDown={onFilenameKeyDown}
          placeholder={autoFilename}
          className={styles.filenameInput}
          dir="ltr"
        />
        <span className={styles.extension}>.png</span>
      </div>

      <div className={styles.btnRow}>
        <button onClick={onDownload} className={styles.downloadBtn}>
          ↓ Download
        </button>
        <button
          onClick={handleCopy}
          className={`${styles.copyBtn} ${copied ? styles.copied : ""}`}
          title="Copy image to clipboard"
        >
          {copied ? "✓" : "⎘"}
        </button>
      </div>
    </>
  );
}
