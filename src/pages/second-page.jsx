import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./second-page.module.css";
import HeaderRegis from "../components/HeaderRegis";
import Registration from "../components/Registration";
import Footer from "../components/Footer";
import SecondPageSlaid from "../components/SecondPageSlaid";
import SecondPageBegin from "../components/SecondPageBegin";
import SecondPageSteps from "../components/SecondPageSteps";

const SecondPage = () => {
  return (
    <div className={styles.secondPage}>
      <HeaderRegis />
      <Registration />

      <SecondPageSlaid />
      <SecondPageBegin />

      <SecondPageSteps />
      <Footer />
      
      {/* <div className={styles.bottomSteps}>
        <div className={styles.stepsSix}>
          <div className={styles.sixText}>
            <b className={styles.b1}>
              В зависимости от выбранного метода может потребоваться некоторое
              время, чтобы перевод отразился на вашем счете.
            </b>
            <b className={styles.b2}>
              Вы можете вывести баланс вашего торгового счета в любое время без
              каких-либо ограничений по сумме. Разместите запрос на снятие
              средств с помощью методов, ранее использовавшихся для внесения
              депозита, и дождитесь его обработки и отправки.
            </b>
            <b className={styles.b3}>ВЫВОД СРЕДСТВ</b>
            <b className={styles.b4}>6</b>
          </div>
          <div className={styles.sixSvg}>
            <img
              className={styles.withdrawIcon}
              alt=""
              src="/withdraw@2x.png"
            />
          </div>
        </div>
        <div className={styles.stepsFive}>
          <div className={styles.fiveSvg}>
            <img className={styles.graphIcon} alt="" src="/graph@2x.png" />
          </div>
          <div className={styles.fiveText}>
            <b className={styles.b5}>
              Каждый правильный прогноз приносит прибыль — изначально сумма
              инвестиции торгового ордера и полученная прибыль автоматически
              добавляются к балансу вашего счета.
            </b>
            <b className={styles.b6}>
              Каждый правильный прогноз приносит прибыль. Сумма инвестиции плюс
              полученная прибыль автоматически добавляются к балансу вашего
              торгового счета. Грамотно управляйте вашим доходом, инвестируйте
              дальше или снимайте прибыль.
            </b>
            <b className={styles.b7}>ПРИБЫЛЬ</b>
            <b className={styles.b8}>5</b>
          </div>
        </div>
        <div className={styles.stepsFour}>
          <div className={styles.fourText}>
            <b className={styles.tradingBroker1}>
              Торговля на Trading Broker очень проста. Вам понадобится всего
              несколько вещей, чтобы легко ориентироваться в торговом
              интерфейсе. Начните выбор с предпочтительного торгового актива и
              установите тип графика.
            </b>
            <b className={styles.pocketOption}>
              Торговать на Pocket Option легко! Выберите торговый актив,
              настройте предпочтительный тип графика и включите индикаторы для
              лучшего анализа рынка. Установите сумму сделки, время покупки и
              разместите заказ на понижение или повышение цены.
            </b>
            <b className={styles.b9}>ТОРГОВЛЯ</b>
            <b className={styles.b10}>4</b>
          </div>
          <div className={styles.fourSvg}>
            <img
              className={styles.stockMarketIcon}
              alt=""
              src="/stockmarket@2x.png"
            />
          </div>
        </div>
      </div> */}
      
      {/* <div className={styles.topSteps}>
        <div className={styles.stepsThree}>
          <div className={styles.threeSvg}>
            <img
              className={styles.donationIcon}
              alt=""
              src="/donation@2x.png"
            />
          </div>
          <div className={styles.threeText}>
            <b className={styles.b11}>
              Как только ваша учетная запись будет полностью проверена, вам
              станут доступны все предлагаемые методы пополнения счета. Выберите
              наиболее удобный для вас вариант. В зависимости от выбранного
              метода может потребоваться некоторое время, чтобы перевод
              отразился на вашем торговом счете
            </b>
            <b className={styles.b12}>
              Пополняйте баланс вашего торгового счета наиболее удобным
              способом. Время обработки зависит от использованного метода.
            </b>
            <b className={styles.b13}>ПОПОЛНИТЬ</b>
            <b className={styles.b8}>3</b>
          </div>
        </div>
        <div className={styles.stepsTwo}>
          <div className={styles.twoText}>
            <b className={styles.aml}>
              Верификация — это обязательная процедура, необходимая для защиты
              вашей учетной записи и средств от несанкционированного доступа, а
              также для соблюдения всех финансовых положений и требований AML.
            </b>
            <b className={styles.b15}>
              Сделайте вашу учетную запись персонализированной. Укажите личную
              информацию в профиль и загрузите документ, удостоверяющий личность
              и адрес.
            </b>
            <b className={styles.b16}>ВЕРИФИКАЦИЯ</b>
            <b className={styles.b17}>2</b>
          </div>
          <div className={styles.twoSvg}>
            <img
              className={styles.verificationIcon}
              alt=""
              src="/verification@2x.png"
            />
          </div>
        </div>
        <div className={styles.stepsOne}>
          <div className={styles.oneSvg}>
            <img
              className={styles.onlineRegistrationIcon}
              alt=""
              src="/onlineregistration@2x.png"
            />
          </div>
          <div className={styles.oneText}>
            <b className={styles.google}>
              Регистрация — довольно простой процесс. Вы можете выбрать один из
              способов регистрации: зарегистрироваться с адресом электронной
              почты, использовать свою учетную запись google.
            </b>
            <b className={styles.google1}>
              Создайте бесплатный торговый счет, используя адрес электронной
              почты или просто авторизуйтесь через учетную запись Google.
            </b>
            <b className={styles.b18}>РЕГИСТРАЦИЯ</b>
            <b className={styles.b19}>1</b>
          </div>
        </div>
      </div> */}

    </div>
  );
};

export default SecondPage;
