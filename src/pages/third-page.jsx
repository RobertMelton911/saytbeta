import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./third-page.module.css";
import HeaderRegis from "../components/HeaderRegis";
import Registration from "../components/Registration";
import Footer from "../components/Footer";
import ThirdPageMission from "../components/ThirdPageMission";
import ThirdPageClients from "../components/ThirdPageClients";
import ThirdPageDocuments from "../components/ThirdPageDocuments";
import ThirdPagePrinciples from "../components/ThirdPagePrinciples";
import ThirdPageJoin from "../components/ThirdPageJoin";

const ThirdPage = () => {
  return (
    <div className={styles.thirdPage}>
      <HeaderRegis />
      <Registration />

      <ThirdPageMission />

      <div className={styles.mainContainer}>
        <ThirdPageClients />
        <ThirdPageDocuments />
        <ThirdPagePrinciples />
      </div>

      <ThirdPageJoin />
      <Footer />

    </div>
  );
};

export default ThirdPage;
