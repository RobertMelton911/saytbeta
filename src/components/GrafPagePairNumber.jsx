import React, { useState, useEffect, useRef } from "react";
import GrafPagePairDisclosed from "./GrafPagePairDisclosed";
import styles from "./GrafPagePairNumber.module.css";
import { useAtom, atom } from "jotai";

// Атом для хранения выбранной валютной пары
export const currencyPairsAtom = atom({ pair: "AUD/CAD", value: "92%" });

const GrafPagePairNumber = () => {
  const [currency, setCurrency] = useAtom(currencyPairsAtom);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  const [clickedInside, setClickedInside] = useState(false); // Состояние для отслеживания клика внутри

  // Переключение видимости
  const toggleComponent = (event) => {
    event.stopPropagation(); // Останавливаем всплывание события
    setClickedInside(true); // Устанавливаем флаг, что клик был внутри
    setIsVisible((prev) => !prev); // Переключаем значение isVisible
  };

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Если клик был внутри, сбрасываем флаг и не закрываем компонент
      if (clickedInside) {
        setClickedInside(false);
        return;
      }

      // Если клик был вне компонента, закрываем его
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
  }, [isVisible, clickedInside]);

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
      {isVisible && <GrafPagePairDisclosed onClose={() => setIsVisible(false)} />}
    </div>
  );
};

export default GrafPagePairNumber;