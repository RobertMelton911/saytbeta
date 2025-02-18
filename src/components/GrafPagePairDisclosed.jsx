// GrafPagePairDisclosed.jsx
import React, { useEffect, useRef } from "react";
import styles from "./GrafPagePairDisclosed.module.css";
import { useAtom } from "jotai";
import { currencyPairsAtom } from "./GrafPagePairNumber";

const currencyPairs = [
  { pair: "AUD/CAD", value: "92%" },
  { pair: "AUD/USD", value: "92%" },
  { pair: "EUR/USD", value: "90%" },
  { pair: "GBP/USD", value: "87%" },
  { pair: "AUD/NZD", value: "82%" },
  { pair: "GBP/JPY", value: "82%" },
  { pair: "CAD/CHF", value: "79%" },
  { pair: "USD/CAD", value: "71%" },
];

const GrafPagePairDisclosed = ({ onClose }) => {
  const [, setCurrency] = useAtom(currencyPairsAtom);
  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (componentRef.current && !componentRef.current.contains(e.target)) {
        // Проверяем, что клик не был по родительскому компоненту
        const parentElement = document.querySelector('[class*="pairNumberWrap"]');
        if (!parentElement?.contains(e.target)) {
          onClose();
        }
      }
    };

    // Используем setTimeout, чтобы избежать немедленной обработки события
    setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handlePairClick = (item) => {
    setCurrency(item);
    onClose();
  };

  return (
    <div className={styles.pairNumberDisclosed} ref={componentRef}>
      <div className={styles.pairAsset}>
        <a className={styles.a}>Актив</a>
        <a className={styles.a1}>Выплота</a>
      </div>

      <section className={styles.pairOpenParent}>
        {currencyPairs.map((item, index) => (
          <div
            key={index}
            className={`${styles.pairOpen} ${index >= 4 ? styles.pairOpen5 : ""}`}
            onClick={() => handlePairClick(item)}
          >
            <div className={styles.audcadOtc}>{item.pair} OTC</div>
            <div className={styles.separators}>{item.value}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default GrafPagePairDisclosed;