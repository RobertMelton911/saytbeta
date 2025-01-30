import React from "react";
import styles from "./HeaderMain.module.css";
import { useNavigate } from "react-router-dom";

const HeaderRegis = () => {
  const navigate = useNavigate();

  const handleGoProfile = () => {navigate("/profilepage");};
  const handleDemoAccount = () => {navigate("/grafpage");};
  const handleGoHome = () => {navigate("/");};

  return (
  <div className={styles.header}>

    <img className={styles.vectorIcon} onClick={handleGoHome} alt="" src="/vector5.svg" />
    
    <div className={styles.headerAcc} onClick={handleDemoAccount}>
      <b className={styles.b}>$1,000.00</b>
      <img className={styles.accSvgIcon} alt="" src="/accsvg.svg" />
      <div className={styles.demoAccount}>Demo account</div>
    </div>

    <div className={styles.headerDeposit}>
      <b className={styles.deposit}>Deposit</b>
    </div>

    <div className={styles.headerProfile} onClick={handleGoProfile}>
      <img className={styles.profile1Icon2} alt="" src="/profile-12@2x.png" />
    </div>

  </div>
  );
};

export default HeaderRegis;