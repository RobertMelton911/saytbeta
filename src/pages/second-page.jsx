import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./second-page.module.css";
import HeaderRegis from "../components/HeaderRegis";
import Registration from "../components/Registration";
import Footer from "../components/Footer";

const SecondPage = () => {
  const navigate = useNavigate(); // Инициализация навигации

  // Функция для обработки клика на кнопку "Быстрый старт"
  const handleQuickStart = () => {
    navigate("/secondpage"); // Перенаправление на страницу second-page
  };

  const handleDemo = () => {
    navigate("/grafpage");
  };
  
  const handleAbout = () => {
    navigate("/thirdpage");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.secondPage}>
      <HeaderRegis />
      <Registration />
      <Footer />

      {/* <div className={styles.footer}>
        <div className={styles.footerLogo} onClick={handleGoHome}>
          <img className={styles.vectorIcon} alt="" src="/vector.svg" />
          <div className={styles.tradingBroker}>Trading Broker</div>
        </div>
        <div className={styles.footerLink}>
          <div className={styles.div}>Регуляторная политика</div>
        </div>
        <div className={styles.footerLink1}>
          <div className={styles.div1}>Политика платежей</div>
        </div>
        <div className={styles.footerLink2}>
          <div className={styles.div2}>Политика конфиденциальности</div>
        </div>
        <div className={styles.footerLink3}>
          <div className={styles.amlKyc}>Политика AML и KYC</div>
        </div>
        <div className={styles.footerLink4}>
          <div className={styles.div3}>Условия предоставления сервиса</div>
        </div>
        <div className={styles.footerLink5}>
          <div className={styles.div4}>Контакты</div>
        </div>
        <div className={styles.footerRisks}>
          <div className={styles.div5}>Предупреждение о рисках</div>
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
        <div className={styles.footerWarning}>
          <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
          <b className={styles.b}>Предупреждение о рисках:</b>
        </div>
      </div> */}

      
      <div className={styles.bottomSteps}>
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
      </div>
      
      <div className={styles.topSteps}>
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
      </div>

      <div className={styles.mainBegin}>
        <div className={styles.mainBeginText}>Начните с нескольких простых шагов.</div>
      </div>

      {/* первый слайд  */}
      <div className={styles.mainSlaid}> 
        <img
          className={styles.slaidBeckgraundIcon}
          alt=""
          src="/slaidbeckgraund@2x.png"
        />
        <div className={styles.slaidTrade}>
          <div className={styles.tradeStart}>
            <div className={styles.startClick}>
              <div className={styles.div7} onClick={handleDemo}>Начать торговлю в один клик</div>
            </div>
            <div className={styles.div8}>или</div>
            <div className={styles.startEnter}>
              <div className={styles.div7}>Войти</div>
            </div>
          </div>
          <div className={styles.tradeRegistering}>
            <b className={styles.b20}>РЕГИСТРАЦИЯ</b>
          </div>
          <div className={styles.tradingBroker2}>с Trading Broker</div>
          <div className={styles.tradeFinancial}>
            <div className={styles.div10}>
              <div className={styles.txt}>
                <p className={styles.forex}>Как торговать на</p>
                <p className={styles.forex}>финансовых рынках</p>
              </div>
            </div>
          </div>
          <div className={styles.tradePrincipal}>
            <div className={styles.principalLeft}>
              <div className={styles.div12} onClick={handleGoHome}>Главная</div>
            </div>
            <div className={styles.div11}>/ Быстрый старт</div>
          </div>
        </div>
      </div>


      {/* <div className={styles.header}>
        <div className={styles.headerLanguage}>
          <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
          <div className={styles.div13}>Русский</div>
          <img className={styles.vectorIcon3} alt="" src="/vector3.svg" />
        </div>
        <div className={styles.headerList}>
          <div className={styles.div16} onClick={handleQuickStart}>Быстрый старт</div>
          <div className={styles.div15} onClick={handleDemo}>Бесплатное демо</div>
          <div className={styles.div14} onClick={handleAbout}>О Компании</div>
        </div>
        <img className={styles.headerLogoIcon} onClick={handleGoHome} alt="" src="/headerlogo.svg" />
      </div> */}
      

      {/* <div className={styles.registration}>
        <div className={styles.registrationContainer}>
          <div className={styles.regisGoogle}>
            <img className={styles.googlevecIcon} alt="" src="/googlevec.svg" />
            <b className={styles.google2}>Google</b>
          </div>
          <div className={styles.div17}>Или зарегистрируйтесь через</div>
          <div className={styles.regisLogging}>
            <b className={styles.b21}>РЕГИСТРАЦИЯ</b>
          </div>
          <div className={styles.regisContract}>
            <div className={styles.div18}>
              <div className={styles.txt}>
                <p className={styles.forex}>Я прочитал и принял соглашение:</p>
                <p className={styles.forex}>Договор о предоставлении услуг</p>
              </div>
            </div>
          </div>
          <input className={styles.checkbox} type="checkbox" />
          <div className={styles.regisPassword}>
            <div className={styles.div19}>
              <span className={styles.txt}>
                <span>{`Пароль `}</span>
                <span className={styles.span}>*</span>
              </span>
            </div>
          </div>
          <div className={styles.regisEmail}>
            <div className={styles.email}>
              <span className={styles.txt}>
                <span>{`Email `}</span>
                <span className={styles.span}>*</span>
              </span>
            </div>
          </div>
          <div className={styles.tabsBtn}>
            <div className={styles.tabsBtnRight}>
              <b className={styles.b22}>ВОЙТИ</b>
            </div>
            <div className={styles.tabsBtnLeft}>
              <b className={styles.b23}>РЕГИСТРАЦИЯ</b>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SecondPage;
