import React from "react";
import styles from "./ThirdPageDocuments.module.css";

const ThirdPageDocuments = () => {
  return (
    <div className={styles.mainContainerDocuments}>
      <div className={styles.linkFive}>
        <b className={styles.b8}>Политика платежей</b>
      </div>
      <div className={styles.linkFour}>
        <b className={styles.amlKyc1}>Политика AML и KYC</b>
      </div>
      <div className={styles.linkThree}>
        <b className={styles.b7}>Политика</b>
        <b className={styles.b9}>конфиденциальности</b>
      </div>
      <div className={styles.linkTwo}>
        <b className={styles.b7}>Раскрытие информации</b>
      </div>
      <div className={styles.linkOne}>
        <b className={styles.b11}>Условия предоставления</b>
        <b className={styles.b6}>сервиса</b>
      </div>
      <div className={styles.div15}>Документы</div>
      <div className={styles.documentationFoto}>
        <img className={styles.documentationIcon} alt="" src="/documentation@2x.png"/>
      </div>
    </div>
  );
};

export default ThirdPageDocuments;