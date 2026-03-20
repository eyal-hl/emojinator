import type { RefObject, KeyboardEvent } from "react";
import styles from "./DownloadSection.module.css";

interface Props {
  filenameRef: RefObject<HTMLInputElement | null>;
  customFilename: string;
  autoFilename: string;
  onFilenameChange: (value: string) => void;
  onFilenameKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onDownload: () => void;
}

export default function DownloadSection({
  filenameRef,
  customFilename,
  autoFilename,
  onFilenameChange,
  onFilenameKeyDown,
  onDownload,
}: Props) {
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

      <button onClick={onDownload} className={styles.downloadBtn}>
        ↓ Download
      </button>
    </>
  );
}
