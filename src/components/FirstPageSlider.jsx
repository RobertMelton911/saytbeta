import React from "react";
import styles from "./FirstPageSlider.module.css";
import { useNavigate } from "react-router-dom";

const FirstPageSlider = () => {
  const navigate = useNavigate();
  const handleDemo = () => navigate("/grafpage");
  
  // Измененные обработчики
  const handleRegister = () => navigate("/login?mode=register");
  const handleLogin = () => navigate("/login?mode=login");

  return (
    <div className={styles.mainSlider}>
      <div className={styles.sliderBeckgraund}>
        <img className={styles.sliderBeckgraundIcon} alt="" src="/fonovoefoto-1@2x.png"/>
        <div className={styles.gradient1} />
      </div>
      <div className={styles.sliderContainer}>
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
        <div className={styles.btnContainer}>
          <b className={styles.b28}>Самый удобный интерфейс</b>
          <div className={styles.buttonGroup}>
            <div className={styles.btnLeft} onClick={handleRegister}>
              <b className={styles.b27}>РЕГИСТРАЦИЯ</b>
            </div>
            <div className={styles.btnRight} onClick={handleLogin}>
              <b className={styles.b26}>ВОЙТИ</b>
            </div>
          </div>
          <div className={styles.btnText}>
            <div className={styles.div10} onClick={handleLogin}>Войти</div>
            <div className={styles.Textor}>или</div>
            <div className={styles.div8} onClick={handleDemo}>Начать торговлю в один клик</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPageSlider;