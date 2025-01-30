import React from "react";
import styles from "./GrafPageRightPanel.module.css";

const GrafPageRightPanel = () => {
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
        <div className={styles.div6}>$</div>
        <div className={styles.container2}>
          <div className={styles.div7}>Сумма</div>
        </div>
        <div className={styles.vuiInputNumber}>
          <img className={styles.containerIcon} alt="" src="/container1.svg" />
          <img className={styles.containerIcon1} alt="" src="/container2.svg"  />
          <div className={styles.input}>
            <div className={styles.div8}>10</div>
          </div>
        </div>
      </div>
      
      <div className={styles.rightpanelTime}>

        <div className={styles.container3}>
          <div className={styles.div9}>Время</div>
        </div>

        <div className={styles.vuiInputNumber1}>
          <img className={styles.containerIcon2} alt="" src="/container3.svg" />
          <img className={styles.containerIcon3} alt="" src="/container4.svg" />
          <div className={styles.input}>
            <div className={styles.div10}>16:43</div>
          </div>
        </div>

      </div>

    </div>
  </div>
  );
};

export default GrafPageRightPanel;