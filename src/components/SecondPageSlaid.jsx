import React from "react";
import styles from "./SecondPageSlaid.module.css";
import { useNavigate } from "react-router-dom";

const SecondPageSlaid = () => {
  const navigate = useNavigate(); 
  const handleDemo = () => navigate("/grafpage");
  const handleGoHome = () => navigate("/");
  const handleRegister = () => navigate("/login?mode=register");
  const handleLogin = () => navigate("/login?mode=login");
  return (
  <div className={styles.mainSlaid}> 
    {/* <img className={styles.slaidBeckgraundIcon} alt="" src="/slaidbeckgraund@2x.png" /> */}
    <div className={styles.backgroundContainer}></div>
    <div className={styles.gradient1} />
    <div className={styles.slaidTrade}>
      <div className={styles.tradeStart}>
        <div className={styles.startClick}>
          <div className={styles.div7} onClick={handleDemo}>Начать торговлю в один клик</div>
        </div>
        <div className={styles.div8}>или</div>
        <div className={styles.startEnter} onClick={handleLogin}>
          <div className={styles.div7}>Войти</div>
        </div>
      </div>
      <div className={styles.tradeRegistering} onClick={handleRegister}>
        <b className={styles.b20}>РЕГИСТРАЦИЯ</b>
      </div>
      <div className={styles.tradingBroker2}>с Trading Broker</div>
      <div className={styles.tradeFinancial}>
        <div className={styles.div10}>
          <div className={styles.txt}>
            <p className={styles.forex}>Как торговать на</p>
            <p className={styles.forex}>финансовых рынках</p>
          </div>
        </div>
      </div>
      <div className={styles.tradePrincipal}>
        <div className={styles.principalLeft}>
          <div className={styles.div12} onClick={handleGoHome}>Главная</div>
        </div>
        <div className={styles.div11}>/  Быстрый старт</div>
      </div>
    </div>
  </div>
  );
};

export default SecondPageSlaid;
