import React from "react";
import styles from "./ThirdPageJoin.module.css";
import { useNavigate } from "react-router-dom";

const ThirdPageJoin = () => {
  const navigate = useNavigate();
  const handleDemo = () => navigate("/grafpage");
  return (
  <div className={styles.mainJoin}>
    <img
      className={styles.joinBeckgraundIcon}
      alt=""
      src="/joinbeckgraund@2x.png"
    />
    <div className={styles.joinBtn} onClick={handleDemo}>
      <div className={styles.div6}>Попробовать демо в один клик</div>
    </div>
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
    <div className={styles.div7}>Присоединяйтесь к нам</div>
  </div>
  );
};

export default ThirdPageJoin;
