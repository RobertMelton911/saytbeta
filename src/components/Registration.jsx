import React, { useState } from "react";
import styles from "./Registration.module.css";

const Registration = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleAgreementClick = () => {
    setIsChecked(!isChecked);
  };

  const handleAgreementLinkClick = (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    // Здесь будет перенаправление на страницу с договором
    console.log("Переход на страницу с договором");
  };

  return (
      <div className={styles.registration}>

        <div className={styles.registrationContainer}>

          {/* Секция с табами (РЕГИСТРАЦИЯ/ВОЙТИ) */}
          <div className={styles.tabsBtn}>
            <div className={styles.tabsBtnLeft}>
              <b className={styles.b31}>РЕГИСТРАЦИЯ</b>
            </div>
            <div className={styles.tabsBtnRight}>
              <b className={styles.b30}>ВОЙТИ</b>
            </div>
          </div>

          {/* Поле ввода Email */}
          <div className={styles.regisEmail}>
            <input className={styles.input} type="email" placeholder="Email *" />
          </div>

          {/* Поле ввода Пароль */}
          <div className={styles.regisPassword}>
            <input className={styles.input} type="password" placeholder="Пароль *" />
          </div>

          {/* Секция с чекбоксом и соглашением */}
          <div className={styles.checkboxContainer} onClick={handleAgreementClick}>
            <div className={styles.customCheckbox}>
              {isChecked && <div className={styles.checkmark}></div>}
            </div>
            <div className={styles.agreementTextContainer}>
              <span className={styles.agreementText}>Я прочитал и принял соглашение:</span>
              <span 
                className={styles.agreementLink} 
                onClick={handleAgreementLinkClick}
              >
                Договор о предоставлении услуг
              </span>
            </div>
          </div>

          {/* Кнопка РЕГИСТРАЦИЯ */}
          <div className={styles.regisLogging}>
            <b className={styles.b29}>РЕГИСТРАЦИЯ</b>
          </div>
          
          {/* Текст альтернативного входа */}
          <div className={styles.div16}>Или зарегистрируйтесь через</div>

          {/* Кнопка Google */}
          <div className={styles.regisGoogle}>
            <img className={styles.googlevecIcon} alt="" src="/googlevec.svg" />
            <b className={styles.google}>Google</b>
          </div>          
          
        </div>

      </div>
  );
};

export default Registration;