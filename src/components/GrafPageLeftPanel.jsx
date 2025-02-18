import React from "react";
import styles from "./GrafPageLeftPanel.module.css";

const GrafPageLeftPanel = () => {
  return (
    <aside className={styles.leftPanel}>
      {/* Верхний список */}
      <div className={styles.topList}>
        <div className={styles.toplistitem}>
          <div className={styles.wrapper}>
            <span className={styles.wrappertext}>1м</span>
          </div>
        </div>
        <div className={styles.toplistitem}>
          <div className={styles.wrapper}>
            <img className={styles.icon} alt="Icon" src="/vector6.svg" />
          </div>
        </div>
      </div>

      {/* Нижний список */}
      <div className={styles.bottomList}>

        <div className={styles.item}>
          <img className={styles.icon} alt="Register Icon" src="/icon1.svg" />
          <span className={styles.text}>Регистрация</span>
        </div>

        <div className={styles.item}>
          <img className={styles.icon} alt="Login Icon" src="/icon2.svg" />
          <span className={styles.text}>Войти</span>
        </div>

        <div className={styles.item}>
          <img className={styles.icon} alt="Help Icon" src="/icon.svg" />
          <span className={styles.text}>Помощь</span>
        </div>

      </div>
    </aside>
  );
};

export default GrafPageLeftPanel;
