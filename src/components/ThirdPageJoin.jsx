import React, { useEffect, useState } from "react";
import styles from "./ThirdPageJoin.module.css";
import { useNavigate } from "react-router-dom";

const ThirdPageJoin = () => {
  const navigate = useNavigate();
  const handleDemo = () => navigate("/grafpage");
  
  // Состояние для отслеживания размера окна
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Обновление размеров при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.mainJoin}>
      <div className={styles.backgroundWrapper}>
        <img
          className={styles.joinBeckgraundIcon}
          alt=""
          src="/joinbeckgraund@2x.png"
        />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.div7}>Присоединяйтесь к нам</div>
        <div className={styles.tradingBrokerContainer}>
          <span className={styles.txt}>
            <p className={styles.forex}>
              Карьера трейдера в Trading Broker выводит вас на пик инноваций в
              эпоху цифровых технологий. Работайте с лучшими в
            </p>
            <p className={styles.forex}>
              бизнесе, планируйте и создавайте ваше будущее.
            </p>
          </span>
        </div>
        <div className={styles.joinBtn} onClick={handleDemo}>
          <div className={styles.div6}>Попробовать демо в один клик</div>
        </div>
      </div>
    </div>
  );
};

export default ThirdPageJoin;