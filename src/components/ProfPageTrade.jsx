import React, { useState } from "react";
import styles from "./ProfPageTrade.module.css";

const ProfPageTrade = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('allTime');

  const handlePeriodClick = (period) => {
    setSelectedPeriod(period);
  };

  return (
    <div className={styles.trade}>
      <div className={styles.tradeTopWrapper}>
        <div className={styles.tradeTop}>
          <div className={styles.tradeTitle}>Торговый профиль</div>
        </div>
      </div>
      <section className={styles.tradeBody}>
        <div className={styles.tradeBodyInner}>
          <div className={styles.frameParent}>
            <div className={styles.frameWrapper}>
              <div className={styles.avatarImgParent}>
                <div className={styles.avatarImg}>
                  <img className={styles.profile1Icon} loading="lazy" alt="" src="/profile-1@2x.png" />
                </div>
                <div className={styles.bodyTitleWrapper}>
                  <div className={styles.bodyTitle}>
                    <div className={styles.user}>User</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.balanceInfoParent}>
              <div className={styles.balanceInfo}>
                <div className={styles.div1}>Уникальный идентификатор:</div>
                <a className={styles.a}>Баланс:</a>
              </div>
              <div className={styles.idValueParent}>
                <div className={styles.idValue}>43175980</div>
                <div className={styles.balanceValueWrapper}>
                  <div className={styles.balanceValue}>$0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bodyAccount}>
          <div className={styles.div2}>Статистика реального счета</div>
        </div>
          
        <div className={styles.bodyAccountParent}>
          <div className={styles.tableYesterdayParent}>
            <div className={`${styles.buttonGroup} ${styles[selectedPeriod]}`}>
              <div className={`${styles.timeButton} ${selectedPeriod === 'yesterday' ? styles.timeButtonSelected : ''}`}
                onClick={() => handlePeriodClick('yesterday')}>
                <div className={styles.div3}>Вчера</div>
              </div>
              
              <div className={`${styles.timeButton} ${selectedPeriod === 'today' ? styles.timeButtonSelected : ''}`}
                onClick={() => handlePeriodClick('today')}>
                <div className={styles.div3}>Сегодня</div>
              </div>
              
              <div className={`${styles.timeButton} ${selectedPeriod === 'allTime' ? styles.timeButtonSelected : ''}`}
                onClick={() => handlePeriodClick('allTime')}>
                <div className={styles.div3}>
                  <p className={styles.p}>За всё</p>
                  <p className={styles.p}>время</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dealsOneParent}>
          <div className={styles.dealsOne}>
            <div className={styles.div6}>
              <ul className={styles.ul}>
                <li>Сделки: 0</li>
              </ul>
            </div>
          </div>
          <div className={styles.dealsTwo}>
            <div className={styles.div7}>
              <ul className={styles.ul}>
                <li>Прибыльных сделок: 0%</li>
              </ul>
            </div>
          </div>
          <div className={styles.dealsOne}>
            <div className={styles.div7}>
              <ul className={styles.ul}>
                <li>Торговый оборот: $0</li>
              </ul>
            </div>
          </div>
          <div className={styles.dealsFour}>
            <div className={styles.div9}>
              <span className={styles.txt}>
                <ul className={styles.ul}>
                  <li>Торговая прибыль: $0</li>
                </ul>
              </span>
            </div>
          </div>
          <div className={styles.dealsOne}>
            <div className={styles.div7}>
              <ul className={styles.ul}>
                <li>Макс. сделка: $0</li>
              </ul>
            </div>
          </div>
          <div className={styles.dealsOne}>
            <div className={styles.div11}>
              <span className={styles.txt}>
                <ul className={styles.ul}>
                  <li>Мин. сделка: $0</li>
                </ul>
              </span>
            </div>
          </div>
          <div className={styles.dealsOne}>
            <div className={styles.div12}>
              <ul className={styles.ul}>
                <li>Макс. прибыль: $0</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfPageTrade;