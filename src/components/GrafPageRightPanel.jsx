import React, { useState } from "react";
import styles from "./GrafPageRightPanel.module.css";

const GrafPageRightPanel = () => {
  // Начальное состояние для времени: 00:01 (0 часов, 1 минута)
  const [time, setTime] = useState({ hours: 0, minutes: 1 });

  // Начальное состояние для суммы: $5
  const [amount, setAmount] = useState(5);

  // Форматирование времени (чч:мм)
  const formatTime = () => {
    return `${String(time.hours).padStart(2, "0")}:${String(time.minutes).padStart(2, "0")}`;
  };

  // Добавить 1 минуту
  const addMinute = () => {
    setTime((prev) => {
      let newMinutes = prev.minutes + 1;
      let newHours = prev.hours;

      if (newMinutes >= 60) {
        newMinutes = 0;
        newHours += 1;
      }

      return { hours: newHours, minutes: newMinutes };
    });
  };

  // Уменьшить 1 минуту (не меньше 00:01)
  const subtractMinute = () => {
    setTime((prev) => {
      let newMinutes = prev.minutes - 1;
      let newHours = prev.hours;

      if (newMinutes < 0) {
        if (newHours > 0) {
          newMinutes = 59;
          newHours -= 1;
        } else {
          return prev; // Не даем уйти ниже 00:01
        }
      }

      return { hours: newHours, minutes: newMinutes };
    });
  };

  // Добавить $1
  const addDollar = () => {
    setAmount((prev) => prev + 1);
  };

  // Уменьшить $1 (не меньше $1)
  const subtractDollar = () => {
    setAmount((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
  <div className={styles.rightpanel}>
    <div className={styles.rightpanelContainer}>

      <div className={styles.rightpanelButtons}>
        <div className={styles.rightpanelBottonSell}>
          <div className={styles.container}>
            <b className={styles.b}>Продать</b>
          </div>
        </div>
        <div className={styles.rightpanelBottonBuy}>
          <div className={styles.container}>
            <b className={styles.b}>Купить</b>
          </div>
        </div>
      </div>

      <div className={styles.majorityOpinion}>
        <div className={styles.majorityOpinion1}>Majority opinion</div>
        <div className={styles.background}>
          <div className={styles.background1} />
        </div>
        <div className={styles.div}>64%</div>
        <div className={styles.div1}>36%</div>
      </div>

      <div className={styles.rightpanelPay}>
        <b className={styles.b2}>+92</b>
        <b className={styles.b3}>%</b>
        <div className={styles.div2}>$19.2</div>
        <div className={styles.div3}>Выплата</div>
        <div className={styles.div4}>+$9.2</div>
        <div className={styles.div5}>Прибыль</div>
      </div>

      <div className={styles.rightpanelMoney}>
        {/* <div className={styles.div6}>$</div> */}
        <div className={styles.container2}>
          <div className={styles.div7}>Сумма</div>
        </div>
        <div className={styles.vuiInputNumber}>
          <img className={styles.containerIcon} onClick={addDollar} alt="" src="/container1.svg" />
          <img className={styles.containerIcon1} onClick={subtractDollar} alt="" src="/container2.svg"  />
          <div className={styles.input}>
            <span>${amount}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.rightpanelTime}>

        <div className={styles.container3}>
          <div className={styles.div9}>Время</div>
        </div>

        <div className={styles.vuiInputNumber1}>
          <img className={styles.containerIcon2} onClick={addMinute} alt="" src="/container3.svg" />
          <img className={styles.containerIcon3} onClick={subtractMinute} alt="" src="/container4.svg" />
          <div className={styles.input}>
            <span>{formatTime()}</span>
          </div>
        </div>

      </div>

    </div>
  </div>
  );
};

export default GrafPageRightPanel;