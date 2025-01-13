import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import styles from "./first-page.module.css";

const FirstPage = () => {
  const navigate = useNavigate(); // Инициализация навигации
  const [counts, setCounts] = useState({
    b14: 0,
    b16: 0,
    b20: 0,
    b22: 0,
    b24: 0,
  });

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Срабатывает, когда 50% секции видимо
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targetNumbers = {
      b14: 5,
      b16: 50000,
      b20: 1,
      b22: 10,
      b24: 25,
    };

    const duration = 4000; // Время анимации в миллисекундах
    const frameRate = 16; // Частота кадров (около 60 FPS)
    const increments = {
      b14: targetNumbers.b14 / (duration / frameRate),
      b16: targetNumbers.b16 / (duration / frameRate),
      b20: targetNumbers.b20 / (duration / frameRate),
      b22: targetNumbers.b22 / (duration / frameRate),
      b24: targetNumbers.b24 / (duration / frameRate),
    };

    let start = { ...counts };

    const animate = () => {
      let isAnimationComplete = true;

      for (const key in targetNumbers) {
        start[key] = Math.min(start[key] + increments[key], targetNumbers[key]);
        if (start[key] < targetNumbers[key]) {
          isAnimationComplete = false;
        }
      }

      setCounts({
        b14: Math.floor(start.b14),
        b16: Math.floor(start.b16),
        b20: Math.floor(start.b20),
        b22: Math.floor(start.b22),
        b24: Math.floor(start.b24),
      });

      if (!isAnimationComplete) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isVisible]);

  // Функции для навигации
  const handleQuickStart = () => {
    navigate("/secondpage");
  };

  const handleDemo = () => {
    navigate("/grafpage");
  };

  const handleAbout = () => {
    navigate("/thirdpage");
  };
  return (
    <div className={styles.firstPage}>


      <div className={styles.footer}>
        <img className={styles.footerLogoIcon} alt="" src="/footerlogo.svg" />
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
          <img className={styles.vectorIcon} alt="" src="/vector1.svg" />
          <b className={styles.b}>Предупреждение о рисках:</b>
        </div>
      </div>

      
      <div className={styles.main}>


        <div className={styles.mainChoice}>
          <div className={styles.choiceContainer}>
            <div className={styles.choiceBottom}>
              <div className={styles.bottomBtn}>
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


        <div className={styles.mainConditions} ref={sectionRef}>
          <div className={styles.conditionsContainer}>
            <div className={styles.conditionsList}>
              <b className={styles.b14}>${counts.b14}*</b>
              <b className={styles.b15}>Минимальная сумма инвестиции</b>
              <b className={styles.b16}>${counts.b16}</b>
              <b className={styles.b17}>Виртуальных средств на вашем счете</b>
              <b className={styles.b18}>$0</b>
              <b className={styles.b19}>Нет комиссий на пополнения и выводы</b>
              <b className={styles.b20}>${counts.b20}</b>
              <b className={styles.b21}>Минимальная сумма сделки</b>
              <b className={styles.b22}>{counts.b22}+</b>
              <b className={styles.b23}>Платежных методов</b>
              <b className={styles.b24}>{counts.b24}+</b>
              <b className={styles.b25}>Торговых активов</b>
            </div>
            <div className={styles.div7}>
              <span className={styles.txt}>
                <p className={styles.forex}>Размещайте торговые</p>
                <p className={styles.forex}>сделки на лучших</p>
                <p className={styles.forex}>условиях</p>
              </span>
            </div>
          </div>
        </div>


        <div className={styles.mainSlider}>
          <img
            className={styles.fonovoefoto1Icon}
            alt=""
            src="/fonovoefoto-1@2x.png"
          />
          <div className={styles.sliderContainer}>
            <div className={styles.btnContainer}>
              <div className={styles.btnText}>
                <div className={styles.div10}>Войти</div>
                <div className={styles.div8} onClick={handleDemo}>Начать торговлю в один клик</div>
                <div className={styles.Textor}>или</div>
              </div>
              <div className={styles.btnRight}>
                <b className={styles.b26}>ВОЙТИ</b>
              </div>
              <div className={styles.btnLeft}>
                <b className={styles.b27}>РЕГИСТРАЦИЯ</b>
              </div>
              <b className={styles.b28}>Самый удобный интерфейс</b>
            </div>
            <div className={styles.div11}>
              <div className={styles.txt}>
                <p className={styles.forex}>
                  ПРАВИЛЬНЫЙ ВЫБОР
                  ДЛЯ ОНЛАЙН-
                  ТОРГОВЛИ НА
                  ФИНАНСОВЫХ РЫНКАХ
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.header}>
        <div className={styles.headerLanguage}>
          <img className={styles.vectorIcon7} alt="" src="/vector2.svg" />
          <div className={styles.div12}>Русский</div>
          <img className={styles.vectorIcon8} alt="" src="/vector3.svg" />
        </div>
        <div className={styles.headerList}>
          <div className={styles.div15} onClick={handleQuickStart}>Быстрый старт</div>
          <div className={styles.div14} onClick={handleDemo}>Бесплатное демо</div>
          <div className={styles.div13} onClick={handleAbout}>О Компании</div>
        </div>
        <img className={styles.headerLogoIcon} alt="" src="/headerlogo.svg" />
      </div>


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
          {/* <img className={styles.vectorIcon9} alt="" src="/vector4.svg" /> */}
          <div className={styles.regisPassword}>
            <div className={styles.div18}>
              <span className={styles.txt}>
                <span>{`Пароль `}</span>
                <span className={styles.span}>*</span>
              </span>
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
    </div>
  );
};

export default FirstPage;
