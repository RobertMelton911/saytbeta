import React, { useState, useEffect } from "react";
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
  // Отслеживание изменения размера экрана
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    
    // Инициализация при загрузке
    handleResize();
    
    // Добавление слушателя событий
    window.addEventListener('resize', handleResize);
    
    // Удаление слушателя при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.thirdPage}>
      <HeaderRegis />
      <Registration />
      <ThirdPageMission />
      <div className={styles.mainContainer}>
        {/* Добавляем обертку для контента без изменения компонентов */}
        <div className={styles.contentWrapper}>
          <ThirdPageClients />
          <ThirdPageDocuments />
          <ThirdPagePrinciples />
        </div>
      </div>
      <ThirdPageJoin />
      <Footer />
    </div>
  );
};

export default ThirdPage;