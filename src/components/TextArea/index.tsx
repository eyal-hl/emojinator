import type { RefObject, KeyboardEvent } from "react";
import shared from "../../styles/shared.module.css";
import styles from "./TextArea.module.css";

interface Props {
  text: string;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ text, textareaRef, onChange, onKeyDown }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <fieldset className={shared.fieldset}>
      <legend className={shared.legend}>Text</legend>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        rows={5}
        className={styles.textarea}
        dir="auto"
        placeholder={"Line 1\nLine 2\n..."}
      />
    </fieldset>
  );
}
