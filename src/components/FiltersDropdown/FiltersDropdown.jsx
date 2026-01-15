import { useEffect, useRef, useState } from "react";
import styles from "./FiltersDropdown.module.css";

const OPTIONS = [
  { value: "A_TO_Z", label: "A to Z" },
  { value: "Z_TO_A", label: "Z to A" },
  { value: "PRICE_LT_10", label: "Less than 10$" },
  { value: "PRICE_GT_10", label: "Greater than 10$" },
  { value: "POPULAR", label: "Popular" },
  { value: "NOT_POPULAR", label: "Not popular" },
  { value: "SHOW_ALL", label: "Show all" },
];

export default function FiltersDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapRef = useRef(null);

  const selected = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((p) => !p);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) close();
    };

    const onEsc = (e) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  const handleSelect = (nextValue) => {
    onChange?.(nextValue);
    close();
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <p className={styles.label}>Filters</p>

      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ""}`}
        onClick={toggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.triggerText}>{selected.label}</span>
        <span className={styles.chevron} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className={styles.menu} role="listbox">
          {OPTIONS.map((opt) => {
            const active = opt.value === selected.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={active}
                className={`${styles.item} ${active ? styles.itemActive : ""}`}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
