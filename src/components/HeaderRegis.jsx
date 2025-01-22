import React from "react";
import styles from "./HeaderRegis.module.css";
import { useNavigate } from "react-router-dom";

const HeaderRegis = () => {
  const navigate = useNavigate();

  const handleQuickStart = () => navigate("/secondpage");
  const handleDemo = () => navigate("/grafpage");
  const handleAbout = () => navigate("/thirdpage");
  const handleGoHome = () => {navigate("/");};

  return (
      <div className={styles.header}>
        <div className={styles.headerLanguage}>
          <img className={styles.vectorIcon7} alt="" src="/vector2.svg" />
          <div className={styles.div12}>Русский</div>
          <img className={styles.vectorIcon8} alt="" src="/vector3.svg" />
        </div>
        <div className={styles.headerList}>
          <div className={styles.div15} onClick={handleQuickStart}>Быстрый старт</div>
          <div className={styles.div14} onClick={handleDemo}>Бесплатное демо</div>
          <div className={styles.div13} onClick={handleAbout}>О Компании</div>
        </div>
        <img className={styles.headerLogoIcon} onClick={handleGoHome}  alt="" src="/headerlogo.svg" />
      </div>
  );
};

export default HeaderRegis;