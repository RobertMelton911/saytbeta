import React from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    const handleGoHome = () => {navigate("/");};
    
  return (
      <div className={styles.footer}>
        <img className={styles.footerLogoIcon} onClick={handleGoHome} alt="" src="/footerlogo.svg" />
        
        <div className={styles.footerWarning}>
          <img className={styles.vectorIcon} alt="" src="/vector1.svg" />
          <b className={styles.b}>Предупреждение о рисках:</b>
        </div>
        
        <div className={styles.forexContainer}>
          <div className={styles.txt}>
            <p className={styles.forex}>
              Торговля на финансовых рынках сопряжена с риском. Forex и другие
              финансовые контракты являются сложными финансовыми инструментами,
              используемыми для маржинальной торговли. Торговля имеет высокий
              уровень риска, так как
            </p>
            <p className={styles.forex}>
              кредитное плечо может работать как в вашу пользу, так и против
              вас. Вследствие этого торговля подходит не всем инвесторам из-за
              высокого риска потери инвестированного капитала. Вы не должны
              рисковать большими средствами, чем
            </p>
            <p className={styles.forex}>
              вы готовы потерять. Перед началом торговли вы должны убедиться,
              что вы понимаете все риски и учитываете их в совокупности с
              уровнем вашего опыта при постановке ваших инвестиционных целей.
            </p>
          </div>
        </div>
        
        <div className={styles.footerRisks}>
          <div className={styles.div5}>Предупреждение о рисках</div>
        </div>
        
        <div className={styles["footer-links-container"]}>
          <div className={styles.footerLink5}>
            <div className={styles.div4}>Контакты</div>
          </div>
          
          <div className={styles.footerLink4}>
            <div className={styles.div3}>Условия предоставления сервиса</div>
          </div>
          
          <div className={styles.footerLink3}>
            <div className={styles.amlKyc}>Политика AML и KYC</div>
          </div>
          
          <div className={styles.footerLink2}>
            <div className={styles.div2}>Политика конфиденциальности</div>
          </div>
          
          <div className={styles.footerLink1}>
            <div className={styles.div1}>Политика платежей</div>
          </div>
          
          <div className={styles.footerLink}>
            <div className={styles.div}>Регуляторная политика</div>
          </div>
        </div>
      </div>
  );
};

export default Footer;