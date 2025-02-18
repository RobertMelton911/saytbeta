import React, { useState, useRef } from "react";
import GrafPagePairDisclosed from "./GrafPagePairDisclosed";
import styles from "./GrafPagePairNumber.module.css";
import { useAtom, atom } from "jotai";

export const currencyPairsAtom = atom({ pair: "AUD/CAD", value: "92%" });

const ArrowTriangle = ({ isRotated }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    className={isRotated ? styles.rotatedArrow : styles.arrow}
  >
    <path
      d="M2 4L6 8L10 4"
      stroke="#d1d4dc"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const GrafPagePairNumber = () => {
  const [currency, setCurrency] = useAtom(currencyPairsAtom);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.pairContainer}>
      <div className={styles.pairNumberWrap} onClick={handleClick}>
        <div className={styles.currencyContainer}>
          <span className={styles.currencyPair}>{currency.pair}</span>
          <span className={styles.currencyValue}>{currency.value}</span>
        </div>
        <div className={styles.otcWrapper}>
          <span className={styles.otc}>OTC</span>
        </div>
        <div className={styles.arrowWrapper}>
          <ArrowTriangle isRotated={isVisible} />
        </div>
      </div>

      <div className={`${styles.dropdown} ${isVisible ? styles.dropdownVisible : styles.dropdownHidden}`}>
        <GrafPagePairDisclosed
          onClose={() => setIsVisible(false)}
          parentRef={componentRef}
        />
      </div>
    </div>
  );
};

export default GrafPagePairNumber;