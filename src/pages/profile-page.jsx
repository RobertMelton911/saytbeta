import React from "react";
import styles from "./profile-page.module.css";
import HeaderMain from "../components/HeaderMain";
import ProfPageNavLink from "../components/ProfPageNavLink";
import ProfPageInformation from "../components/ProfPageInformation";
import ProfPageStatus from "../components/ProfPageStatus";
import ProfPageSocietal from "../components/ProfPageSocietal";
import ProfPageTrade from "../components/ProfPageTrade";
import MainDelete from "../components/MainDelete";

const ProfilePage = () => {
  return (
    <div className={styles.mainContent}>
      {/* HeaderMain */}
      <HeaderMain />

      <div className={styles.navLinkWrapper}>
        <ProfPageNavLink />
      </div>

      {/* Основной контент */}
      <div className={styles.contentWrapper}>
        {/* Левый блок */}
        <div className={styles.leftContent}>
          <ProfPageInformation />
          <ProfPageStatus />
          <ProfPageSocietal />
        </div>

        {/* Правый блок */}
        <div className={styles.rightContent}>
          <ProfPageTrade />
        </div>
      </div>

      <div className={styles.deleteWrapper}>
        <MainDelete />
      </div>

    </div>
  );
};

export default ProfilePage;