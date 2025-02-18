import React from "react";
import styles from "./HeaderMain.module.css";
import { useNavigate } from "react-router-dom";

const HeaderMain = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => navigate(path);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <img className={styles.logo} onClick={() => handleNavigation("/")} alt="Home" src="/vector5.svg" />

        <div className={styles.rightSection}>
          {/* Секция аккаунта */}
          <div className={styles.account} onClick={() => handleNavigation("/grafpage")} >
            <span className={styles.demoText}>Demo account</span>
            <b className={styles.balance}>$1,000.00</b>
          </div>

          {/* Кнопка депозита */}
          <button className={styles.depositButton}>
            <div className={styles.depositText}>Deposit</div>
          </button>

          {/* Профиль */}
          <div className={styles.profile} onClick={() => handleNavigation("/profilepage")} >
            <img className={styles.profileImage} alt="Profile" src="/profile-12@2x.png" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;


