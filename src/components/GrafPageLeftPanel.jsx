import React from "react";
import styles from "./GrafPageLeftPanel.module.css";

const GrafPageLeftPanel = () => {
  return (
  <div className={styles.leftpanel}>

    <div className={styles.Toplist}>
        
      <div className={styles.item3}>
        <div className={styles.wrapper}>
          <div className={styles.div14}>1м</div>
        </div>
      </div>

      <div className={styles.item4}>
        <div className={styles.wrapper}>
          <img className={styles.vectorIcon3} alt="" src="/vector6.svg" />
        </div>
      </div>

      <div className={styles.item5}>
        <div className={styles.vectorParent}>
          <img className={styles.vectorIcon4} alt="" src="/vector7.svg" />
          <img className={styles.vectorIcon5} alt="" src="/vector8.svg" />
        </div>
      </div>

      <div className={styles.item6}>
        <div className={styles.wrapper}>
          <img className={styles.vectorIcon6} alt="" src="/vector9.svg" />
        </div>
      </div>
      
    </div>

    <div className={styles.Bottomlist}>

      <div className={styles.item}>
        <div className={styles.div11}>Помощь</div>
        <img className={styles.vectorIcon} alt="" src="/icon.svg" />
      </div>

      <div className={styles.item1}>
        <div className={styles.div12}>Войти</div>
        <img className={styles.vectorIcon1} alt="" src="/icon2.svg" />
      </div>

      <div className={styles.item2}>
        <div className={styles.div13}>Регистрация</div>
        <img className={styles.vectorIcon2} alt="" src="/icon1.svg" />
      </div>

    </div>
    
  </div>
  );
};

export default GrafPageLeftPanel;