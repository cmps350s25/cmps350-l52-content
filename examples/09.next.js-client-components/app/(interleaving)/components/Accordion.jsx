"use client";
import { useState } from "react";
import styles from "./styles.module.css";

export default function Accordion({ title, children, startOpen = false }) {
  const [isOpen, setIsOpen] = useState(startOpen);

  return (
    <div className={styles.accordion}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.accordionButton}
      >
        {isOpen ? "\u25bc" : "\u25ba"} {title}
      </button>
      {isOpen && <div className={styles.accordionContent}>{children}</div>}
    </div>
  );
}
