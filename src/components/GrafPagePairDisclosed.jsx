import React, { useEffect, useRef } from "react";
import styles from "./GrafPagePairDisclosed.module.css";
import { useAtom } from "jotai";
import { currencyPairsAtom } from "./GrafPagePairNumber";

// Данные о валютных парах
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

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.pairNumberDisclosed} ref={componentRef}>
      {/* Заголовки, которые не скролятся */}
      <div className={styles.pairAsset}>
        <a className={styles.a}>Актив</a>
        <a className={styles.a1}>Выплота</a>
      </div>

      {/* Секция с валютными парами, которая скролится */}
      <section className={styles.pairOpenParent}>
        {currencyPairs.map((item, index) => (
          <div
            key={index}
            className={`${styles.pairOpen} ${index >= 4 ? styles.pairOpen5 : ""}`}
            onClick={() => {
              setCurrency(item);
              onClose();
            }}
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