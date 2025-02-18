import React, { useRef, useEffect } from "react";
import { atom, useAtom } from "jotai";
import styles from "./GrafPageRightPanel.module.css";
import GrafPageSelectTime from "./GrafPageSelectTime";
import GrafPageSelectAmount from "./GrafPageSelectAmount";

// Состояния для управления выбором времени и суммы
export const selectTimeVisibleAtom = atom(false);
export const selectedTimeAtom = atom("1мин");

export const selectAmountVisibleAtom = atom(false);
export const selectedAmountAtom = atom("5");

const timeframes = ["1мин", "5мин", "10мин", "15мин", "30мин", "1час"];
const maxAmount = 1000;

const GrafPageRightPanel = () => {
  const [showSelectTime, setShowSelectTime] = useAtom(selectTimeVisibleAtom);
  const [selectedTime, setSelectedTime] = useAtom(selectedTimeAtom);
  const [showSelectAmount, setShowSelectAmount] = useAtom(selectAmountVisibleAtom);
  const [selectedAmount, setSelectedAmount] = useAtom(selectedAmountAtom);

  // Реfs для управления кликами вне элемента
  const rightPanelRef = useRef(null);
  const selectTimeRef = useRef(null);
  const selectAmountRef = useRef(null);
  const timeRef = useRef(null);
  const amountRef = useRef(null);

  // Открытие/закрытие селекторов
  const toggleSelectTime = (e) => {
    e.stopPropagation();
    setShowSelectTime((prev) => !prev);
  };

  const toggleSelectAmount = (e) => {
    e.stopPropagation();
    setShowSelectAmount((prev) => !prev);
  };

  // Изменение времени кнопками +/-
  const incrementTime = (e) => {
    e.stopPropagation();
    const currentIndex = timeframes.indexOf(selectedTime);
    if (currentIndex < timeframes.length - 1) {
      setSelectedTime(timeframes[currentIndex + 1]);
    }
  };

  const decrementTime = (e) => {
    e.stopPropagation();
    const currentIndex = timeframes.indexOf(selectedTime);
    if (currentIndex > 0) {
      setSelectedTime(timeframes[currentIndex - 1]);
    }
  };

  // Изменение суммы кнопками +/-
  const incrementAmount = (e) => {
    e.stopPropagation();
    setSelectedAmount((prev) => Math.min(Number(prev) + 5, maxAmount).toString());
  };

  const decrementAmount = (e) => {
    e.stopPropagation();
    setSelectedAmount((prev) => Math.max(Number(prev) - 5, 5).toString());
  };

  // Обработка ручного ввода суммы
  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/\D/, ""); // Удаляем все нечисловые символы
    if (value !== "") {
      value = Math.min(Number(value), maxAmount).toString(); // Ограничиваем максимум
    }
    setSelectedAmount(value);
  };

  // Закрытие всплывающих окон при клике вне них
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSelectTime &&
        selectTimeRef.current &&
        !selectTimeRef.current.contains(event.target) &&
        timeRef.current &&
        !timeRef.current.contains(event.target)
      ) {
        setShowSelectTime(false);
      }

      if (
        showSelectAmount &&
        selectAmountRef.current &&
        !selectAmountRef.current.contains(event.target) &&
        amountRef.current &&
        !amountRef.current.contains(event.target)
      ) {
        setShowSelectAmount(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSelectTime, showSelectAmount]);

  return (
    <>
      <div className={styles.rightPanel} ref={rightPanelRef}>
        <div className={styles.control}>
          <div className={styles.controlBox} ref={timeRef} onClick={toggleSelectTime}>
            <div className={styles.label}>Время</div>
            <div className={styles.controlButtons}>
              <div className={styles.button} onClick={decrementTime} style={{ opacity: selectedTime === "1мин" ? 0.5 : 1 }}>
                -
              </div>
              <div className={styles.valuetime}>{selectedTime}</div>
              <div className={styles.button} onClick={incrementTime} style={{ opacity: selectedTime === "1час" ? 0.5 : 1 }}>
                +
              </div>
            </div>
          </div>

          <div className={styles.controlBox} ref={amountRef} onClick={toggleSelectAmount}>
            <div className={styles.label}>Сумма</div>
            <div className={styles.controlButtons}>
              <div className={styles.button} onClick={decrementAmount} style={{ opacity: Number(selectedAmount) <= 5 ? 0.5 : 1 }}>
                -
              </div>
              <input className={styles.valueInput} type="text" value={selectedAmount} onChange={handleAmountChange} onClick={(e) => e.stopPropagation()}/>
              <div className={styles.button} onClick={incrementAmount} style={{ opacity: Number(selectedAmount) >= maxAmount ? 0.5 : 1 }}>
                +
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.buy}>Купить</div>
          <div className={styles.sell}>Продать</div>
        </div>
      </div>

      {showSelectTime && <GrafPageSelectTime selectTimeRef={selectTimeRef} rightPanelElement={rightPanelRef.current} />}
      {showSelectAmount && <GrafPageSelectAmount selectAmountRef={selectAmountRef} rightPanelElement={rightPanelRef.current} />}
    </>
  );
};

export default GrafPageRightPanel;
