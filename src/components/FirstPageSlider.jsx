import React from "react";
import styles from "./FirstPageSlider.module.css";
import { useNavigate } from "react-router-dom";

const FirstPageSlider = () => {
    const navigate = useNavigate();
    const handleDemo = () => navigate("/grafpage");

  return (
    <div className={styles.mainSlider}>
      <img
        className={styles.fonovoefoto1Icon}
        alt=""
        src="/fonovoefoto-1@2x.png"
      />
      <div className={styles.sliderContainer}>
        <div className={styles.btnContainer}>
          <div className={styles.btnText}>
            <div className={styles.div10}>Войти</div>
            <div className={styles.div8} onClick={handleDemo}>Начать торговлю в один клик</div>
            <div className={styles.Textor}>или</div>
          </div>
          <div className={styles.btnRight}>
            <b className={styles.b26}>ВОЙТИ</b>
          </div>
          <div className={styles.btnLeft}>
            <b className={styles.b27}>РЕГИСТРАЦИЯ</b>
          </div>
          <b className={styles.b28}>Самый удобный интерфейс</b>
        </div>
        <div className={styles.div11}>
          <div className={styles.txt}>
            <p className={styles.forex}>
              ПРАВИЛЬНЫЙ ВЫБОР
              ДЛЯ ОНЛАЙН-
              ТОРГОВЛИ НА
              ФИНАНСОВЫХ РЫНКАХ
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPageSlider;
