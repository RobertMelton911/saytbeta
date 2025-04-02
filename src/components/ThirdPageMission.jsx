import React from "react";
import styles from "./ThirdPageMission.module.css";
import { useNavigate } from "react-router-dom";

const ThirdPageMission = () => {
  const navigate = useNavigate();
  const handleGoHome = () => navigate("/");
  return (
    <div className={styles.mainmission}>
      <div className={styles.missionGradient}>
        {/* Заменяем img на div с background-image */}
        <div className={styles.backgroundContainer}></div>
        <div className={styles.gradient} />
        <div className={styles.gradient1} />
      </div>

      <div className={styles.missionText}>
        <div className={styles.tradePrincipal}>
          <div className={styles.principalLeft}>
            <div className={styles.div29} onClick={handleGoHome}>Главная</div>
          </div>
          <div className={styles.div28}>/ О нас</div>
        </div>

        <div className={styles.div27}>
          <div className={styles.txt}>
            <p className={styles.forex}>Наша миссия заключается в</p>
            <p className={styles.forex}>предоставлении</p>
            <p className={styles.forex}>инновационного торгового</p>
            <p className={styles.forex}>опыта</p>
          </div>
        </div>

        <div className={styles.tradingBroker3}>
          Trading Broker был разработан командой талантливых IT и FinTech специалистов, которые хотели доказать, что людям
        </div>
        <div className={styles.div26}>
          не нужно идти на компромисс, чтобы зарабатывать на финансовых
          рынках, что торговля должна быть доступной,
        </div>
        <div className={styles.div25}>удобной и увлекательной.</div>
        <div className={styles.div24}>
          На сегодняшний день мы продолжаем развивать, улучшать и постоянно
          совершенствовать процесс торговли. Мы искренне
        </div>
        <div className={styles.div23}>
          верим, что торговля должна быть доступна каждому в мире.
        </div>
      </div>
    </div>
  );
};

export default ThirdPageMission;