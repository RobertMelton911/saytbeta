// src/components/FirstPageChoice.jsx
import React from "react";
import styles from "./FirstPageChoice.module.css";
import { useNavigate } from "react-router-dom";

const FirstPageChoice = () => {
    const navigate = useNavigate();
    const handleDemo = () => navigate("/grafpage");
  return (
    <div className={styles.mainChoice}>
      <div className={styles.choiceContainer}>
        <div className={styles.choiceBottom}>
          <div className={styles.bottomBtn} onClick={handleDemo}>
            <b className={styles.b1}>Начать торговлю</b>
          </div>
          <b className={styles.b2}>Торговля в один клик</b>
        </div>
        <div className={styles.choiceList}>
          <div className={styles.listSix}>
            <b className={styles.b3}>Всестороннее обучение</b>
            <b className={styles.b4}>
              Наш раздел "помощь" содержит учебные пособия, руководства и
              различные торговые стратегии.
            </b>
            <img
              className={styles.vectorIcon1}
              alt=""
              src="/vector11.svg"
            />
          </div>
          <div className={styles.listFive}>
            <b className={styles.b5}>Индикаторы и сигналы</b>
            <b className={styles.b6}>
              Все, самое необходимое для торговли на высшем уровне, включая
              популярные индикаторы и сигналы.
            </b>
            <img
              className={styles.vectorIcon2}
              alt=""
              src="/vector12.svg"
            />
          </div>
          <div className={styles.listFour}>
            <b className={styles.b7}>Удобное пополнение и вывод средств</b>
            <b className={styles.b8}>
              Используйте наиболее удобный для вас метод пополнения и снятия
              средств.
            </b>
            <img
              className={styles.vectorIcon3}
              alt=""
              src="/vector13.svg"
            />
          </div>
          <div className={styles.listThree}>
            <b className={styles.b9}>Демо-счет</b>
            <b className={styles.b10}>
              Попробуйте все преимущества платформы на Демо-счете, используя
              виртуальные деньги. Никаких вложений и рисков.
            </b>
            <img
              className={styles.vectorIcon4}
              alt=""
              src="/vector14.svg"
            />
          </div>
          <div className={styles.listTwo}>
            <b className={styles.b11}>Разнообразные торговые инструменты</b>
            <b className={styles.b12}>
              Активы для любого трейдера: валюты, сырьевые товары, акции.
            </b>
            <img
              className={styles.vectorIcon5}
              alt=""
              src="/vector15.svg"
            />
          </div>
          <div className={styles.listOne}>
            <img
              className={styles.vectorIcon6}
              alt=""
              src="/vector16.svg"
            />
            <b className={styles.b13}>Гибкая торговля</b>
            <b className={styles.mt5Container}>
              <span className={styles.txt}>
                <p className={styles.forex}>
                  Современные тенденции: цифровая и быстрая торговля,
                  экспресс-ордера, mt5 форекс, отложенные ордера.
                </p>
                <p className={styles.forex}>Выплаты до 200%.</p>
              </span>
            </b>
          </div>
        </div>
        <div className={styles.div6}>Почему стоит выбрать нас?</div>
      </div>
    </div>
  );
};

export default FirstPageChoice;
