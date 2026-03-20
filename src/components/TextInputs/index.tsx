import type { RefObject, KeyboardEvent } from "react";
import shared from "../../styles/shared.module.css";
import styles from "./TextInputs.module.css";

interface Props {
  topText: string;
  bottomText: string;
  onTopChange: (value: string) => void;
  onBottomChange: (value: string) => void;
  bottomTextRef: RefObject<HTMLInputElement | null>;
  onBottomTextKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function TextInputs({
  topText,
  bottomText,
  onTopChange,
  onBottomChange,
  bottomTextRef,
  onBottomTextKeyDown,
}: Props) {
  return (
    <fieldset className={shared.fieldset}>
      <legend className={shared.legend}>Text</legend>
      <input
        type="text"
        placeholder="Top text"
        value={topText}
        onChange={(e) => onTopChange(e.target.value)}
        className={shared.input}
        dir="auto"
      />
      <input
        ref={bottomTextRef}
        type="text"
        placeholder="Bottom text"
        value={bottomText}
        onChange={(e) => onBottomChange(e.target.value)}
        onKeyDown={onBottomTextKeyDown}
        className={`${shared.input} ${styles.secondInput}`}
        dir="auto"
      />
    </fieldset>
  );
}
