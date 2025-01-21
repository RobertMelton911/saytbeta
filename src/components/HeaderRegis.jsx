import React from "react";
import styles from "./HeaderRegis.module.css";
import { useNavigate } from "react-router-dom";

const HeaderRegis = () => {
  const navigate = useNavigate();

  const handleQuickStart = () => navigate("/secondpage");
  const handleDemo = () => navigate("/grafpage");
  const handleAbout = () => navigate("/thirdpage");

  return (
    <div className={styles.header}>
      <div className={styles.headerLanguage}>
        <img className={styles.vectorIcon} alt="" src="/vector2.svg" />
        <div className={styles.div}>Русский</div>
        <img className={styles.vectorIcon} alt="" src="/vector3.svg" />
      </div>
      <div className={styles.headerList}>
        <div className={styles.div} onClick={handleQuickStart}>Быстрый старт</div>
        <div className={styles.div} onClick={handleDemo}>Бесплатное демо</div>
        <div className={styles.div} onClick={handleAbout}>О Компании</div>
      </div>
      <img className={styles.headerLogoIcon} alt="" src="/headerlogo.svg" />
    </div>
  );
};

export default HeaderRegis;