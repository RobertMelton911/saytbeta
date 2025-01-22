import React from "react";
import styles from "./Registration.module.css";

const Registration = () => {
  return (
      <div className={styles.registration}>
        <div className={styles.registrationContainer}>
          <div className={styles.regisGoogle}>
            <img className={styles.googlevecIcon} alt="" src="/googlevec.svg" />
            <b className={styles.google}>Google</b>
          </div>
          <div className={styles.div16}>Или зарегистрируйтесь через</div>
          <div className={styles.regisLogging}>
            <b className={styles.b29}>РЕГИСТРАЦИЯ</b>
          </div>
          <div className={styles.regisContract}>
            <div className={styles.div17}>
              <div className={styles.txt}>
                <p className={styles.forex}>Я прочитал и принял соглашение:</p>
                <p className={styles.forex}>Договор о предоставлении услуг</p>
              </div>
            </div>
          </div>
          <input className={styles.checkbox} type="checkbox" />
          <div className={styles.regisPassword}>
            <div className={styles.div18}>
              <div className={styles.txt}>
                <span>{`Пароль `}</span>
                <span className={styles.span}>*</span>
              </div>
            </div>
          </div>
          <div className={styles.regisEmail}>
            <div className={styles.email}>
              <div className={styles.txt}>
                <span>{`Email `}</span>
                <span className={styles.span}>*</span>
              </div>
            </div>
          </div>
          <div className={styles.tabsBtn}>
            <div className={styles.tabsBtnRight}>
              <b className={styles.b30}>ВОЙТИ</b>
            </div>
            <div className={styles.tabsBtnLeft}>
              <b className={styles.b31}>РЕГИСТРАЦИЯ</b>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Registration;
