import React, { useState, useEffect, useRef } from "react";
import GrafPagePairDisclosed from "./GrafPagePairDisclosed";
import styles from "./GrafPagePairNumber.module.css";
import { useAtom } from "jotai";
import { currencyPairsAtom } from "./GrafPagePairDisclosed.jsx";

const GrafPagePairNumber = () => {
  const [currency, setCurrency] = useAtom(currencyPairsAtom);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  // Переключение видимости
  const toggleComponent = () => {
    setIsVisible(true);
  };

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div className={styles.wrapper} ref={componentRef}>
      <div className={styles.pairNumberWrap} onClick={toggleComponent}>
        <div className={styles.audcadWrapper}>
          <div className={styles.audcad}>{currency.pair}</div>
        </div>
        <div className={styles.separatorParent}>
          <div className={styles.audcad}>{currency.value}</div>
        </div>
        <div className={styles.pairNumberWrapInner}>
          <div className={styles.otcWrapper}>
            <div className={styles.otc}>OTC</div>
          </div>
        </div>
        <div className={styles.borderWrapper}>
          <div className={styles.border} />
        </div>
      </div>

      {/* Показываем GrafPagePairDisclosed, если isVisible === true */}
      {isVisible && <GrafPagePairDisclosed />}
    </div>
  );
};

export default GrafPagePairNumber;
