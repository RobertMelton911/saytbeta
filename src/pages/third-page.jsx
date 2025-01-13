import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./third-page.module.css";

const typingText = `Качество обслуживания клиентов остается нашим главным приоритетом с момента основания.
Мы стараемся не только обеспечивать безупречную поддержку, но и внимательно прислушиваться к отзывам пользователей.
Множество замечательных идей были вдохновлены именно нашими клиентами.
От трейдеров и для трейдеров!

Руководитель отдела по работе с клиентами Trading Broker`;

const highlightTextStart = typingText.indexOf("Руководитель отдела по работе с клиентами Trading Broker");

const ThirdPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState(""); // Текст до выделенного
  const [highlightText, setHighlightText] = useState(""); // Выделенный текст
  const clientsRightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    if (clientsRightRef.current) {
      observer.observe(clientsRightRef.current);
    }

    return () => {
      if (clientsRightRef.current) observer.unobserve(clientsRightRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let index = 0;
      const normalSpeed = 22; // Скорость для обычного текста
      const slowSpeed = 60; // Скорость для выделенного текста
      const interval = setInterval(() => {
        const nextChar = typingText[index];

        if (index < highlightTextStart) {
          setTypedText((prev) => prev + nextChar);
        } else {
          setHighlightText((prev) => prev + nextChar);
        }

        index++;
        if (index >= typingText.length) {
          clearInterval(interval);
        } else if (index === highlightTextStart) {
          clearInterval(interval);
          const slowInterval = setInterval(() => {
            const nextChar = typingText[index];
            setHighlightText((prev) => prev + nextChar);
            index++;
            if (index >= typingText.length) {
              clearInterval(slowInterval);
            }
          }, slowSpeed);
        }
      }, normalSpeed);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleQuickStart = () => navigate("/secondpage");
  const handleDemo = () => navigate("/grafpage");
  const handleAbout = () => navigate("/thirdpage");
  const handleGoHome = () => navigate("/");


  return (
    <div className={styles.thirdPage}>

      <div className={styles.footer}>
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
          <span className={styles.txt}>
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
          </span>
        </div>
        <div className={styles.footerWarning}>
          <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
          <b className={styles.b}>Предупреждение о рисках:</b>
        </div>
      </div>

      <div className={styles.mainJoin}>
        <img
          className={styles.joinBeckgraundIcon}
          alt=""
          src="/joinbeckgraund@2x.png"
        />
        <div className={styles.joinBtn} onClick={handleDemo}>
          <div className={styles.div6}>Попробовать демо в один клик</div>
        </div>
        <div className={styles.tradingBrokerContainer}>
          <span className={styles.txt}>
            <p className={styles.forex}>
              Карьера трейдера в Trading Broker выводит вас на пик инноваций в
              эпоху цифровых технологий. Работайте с лучшими в
            </p>
            <p className={styles.forex}>
              бизнесе, планируйте и создавайте ваше будущее.
            </p>
          </span>
        </div>
        <div className={styles.div7}>Присоединяйтесь к нам</div>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.mainContainerPrinciples}>
          <div className={styles.principlesContent}>
            <div className={styles.contentSix}>
              <div className={styles.div8}>
                <span className={styles.txt}>
                  <p className={styles.forex}>
                    Наша задача — предоставлять клиентам по всему
                  </p>
                  <p className={styles.forex}>
                    миру простую и доступную торговлю, которая
                  </p>
                  <p className={styles.forex}>
                    позволяет зарабатывать на финансовых рынках в
                  </p>
                  <p className={styles.forex}>любое время и в любом месте.</p>
                </span>
              </div>
              <b className={styles.b1}>Общий успех</b>
              <img className={styles.risingIcon} alt="" src="/rising@2x.png" />
            </div>
            <div className={styles.contentFive}>
              <div className={styles.div9}>
                <span className={styles.txt}>
                  <p className={styles.forex}>
                    Ответственность и соблюдение правовых норм
                  </p>
                  <p className={styles.forex}>
                    имеют важное значение для нашей деятельности
                  </p>
                  <p className={styles.forex}>
                    как глобального предприятия. Мы привержены
                  </p>
                  <p className={styles.forex}>
                    международной практике, которая приносит пользу
                  </p>
                  <p className={styles.forex}>нашей компании и клиентам.</p>
                </span>
              </div>
              <b className={styles.b2}>Целостность</b>
              <img
                className={styles.risingIcon}
                alt=""
                src="/integration@2x.png"
              />
            </div>
            <div className={styles.contentFour}>
              <div className={styles.div10}>
                <span className={styles.txt}>
                  <p className={styles.forex}>
                    Привлечение, развитие и удержание лучших
                  </p>
                  <p className={styles.forex}>
                    талантов для нашего проекта, создание сложных
                  </p>
                  <p className={styles.forex}>
                    задач для наших сотрудников, поощрение
                  </p>
                  <p className={styles.forex}>
                    инициативы и создание атмосферы сотрудничества
                  </p>
                  <p className={styles.forex}>и поддержки.</p>
                </span>
              </div>
              <b className={styles.b3}>Развитие</b>
              <img className={styles.risingIcon} alt="" src="/stat@2x.png" />
            </div>
            <div className={styles.contentThree}>
              <div className={styles.div11}>
                <span className={styles.txt}>
                  <p className={styles.forex}>
                    Мы высоко ценим наше сообщество. Полноценная
                  </p>
                  <p className={styles.forex}>
                    социальная платформа для взаимодействия между
                  </p>
                  <p className={styles.forex}>
                    нашими клиентами — это наше достояние и основа
                  </p>
                  <p className={styles.forex}>для развития компании.</p>
                </span>
              </div>
              <b className={styles.b4}>Дружное сообщество</b>
              <img
                className={styles.risingIcon}
                alt=""
                src="/commuinity@2x.png"
              />
            </div>
            <div className={styles.contentTwo}>
              <div className={styles.div12}>
                <span className={styles.txt}>
                  <p className={styles.forex}>
                    Доступная каждому возможность стать
                  </p>
                  <p className={styles.forex}>
                    профессиональным трейдером. Установление
                  </p>
                  <p className={styles.forex}>
                    долгосрочных отношений за счет отзывчивости и
                  </p>
                  <p className={styles.forex}>
                    регулярного оказания первоклассных услуг.
                  </p>
                </span>
              </div>
              <b className={styles.b5}>Лояльность клиентов</b>
              <img
                className={styles.risingIcon}
                alt=""
                src="/collaboration@2x.png"
              />
            </div>
            <div className={styles.contentOne}>
              <div className={styles.div13}>
                <span className={styles.txt}>
                  <p className={styles.forex}>
                    Мы не стоим на месте и находимся в постоянном
                  </p>
                  <p className={styles.forex}>
                    стремлении к совершенству. Внедрение передовых
                  </p>
                  <p className={styles.forex}>
                    решений и установление новых тенденций делает
                  </p>
                  <p className={styles.forex}>нас лидерами отрасли.</p>
                </span>
              </div>
              <b className={styles.b6}>Ведущие инновации</b>
              <img
                className={styles.risingIcon}
                alt=""
                src="/modernization@2x.png"
              />
            </div>
          </div>

          <div className={styles.principlesValues}>
            <div className={styles.div14}>
              Наши ключевые ценности и принципы
            </div>
          </div>
        </div>

        <div className={styles.mainContainerDocuments}>
          <div className={styles.linkFive}>
            <b className={styles.b7}>Политика платежей</b>
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
            <b className={styles.b9}>сервиса</b>
          </div>
          <div className={styles.div15}>Документы</div>
          <img
            className={styles.documentationIcon}
            alt=""
            src="/documentation@2x.png"
          />
        </div>

        <div className={styles.mainContainerClients}>
          <div className={styles.clientsRight} ref={clientsRightRef}>
            <p className={styles.typingEffect}>{typedText}
            <span className={styles.highlight}>{highlightText}</span>
            </p>
          </div>
            <img
              className={styles.rightQuotesIcon}
              alt=""
              src="/rightquotes.svg"
            />
          <div className={styles.clientsLeft}>
            <div className={styles.div22}>
              <span className={styles.txt}>
                <p className={styles.forex}>Как мы работаем</p>
                <p className={styles.forex}>с нашими</p>
                <p className={styles.forex}>клиентами?</p>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainmission}>
        <div className={styles.missionGradient}>
          <img className={styles.image2Icon} alt="" src="/image-2@2x.png" />
          <div className={styles.gradient} />
          <div className={styles.gradient1} />
        </div>
        <div className={styles.missionText}>
          <div className={styles.div23}>
            верим, что торговля должна быть доступна каждому в мире.
          </div>
          <div className={styles.div24}>
            На сегодняшний день мы продолжаем развивать, улучшать и постоянно
            совершенствовать процесс торговли. Мы искренне
          </div>
          <div className={styles.div25}>удобной и увлекательной.</div>
          <div className={styles.div26}>
            не нужно идти на компромисс, чтобы зарабатывать на финансовых
            рынках, что торговля должна быть доступной,
          </div>
          <div
            className={styles.tradingBroker3}
          >{`Trading Broker был разработан командой талантливых IT и FinTech специалистов, которые хотели доказать, что людям `}</div>
          <div className={styles.div27}>
            <span className={styles.txt}>
              <p className={styles.forex}>Наша миссия заключается в</p>
              <p className={styles.forex}>предоставлении</p>
              <p className={styles.forex}>инновационного торгового</p>
              <p className={styles.forex}>опыта</p>
            </span>
          </div>
          <div className={styles.tradePrincipal}>
            <div className={styles.div28}>/ О нас</div>
            <div className={styles.principalLeft}>
              <div className={styles.div29} onClick={handleGoHome}>Главная</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.header}>
        <div className={styles.headerLanguage}>
          <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
          <div className={styles.div30}>Русский</div>
          <img className={styles.vectorIcon3} alt="" src="/vector3.svg" />
        </div>
        <div className={styles.headerList}>
          <div className={styles.div33} onClick={handleQuickStart}>Быстрый старт</div>
          <div className={styles.div32} onClick={handleDemo}>Бесплатное демо</div>
          <div className={styles.div31} onClick={handleAbout}>О Компании</div>
        </div>
        <img className={styles.headerLogoIcon} onClick={handleGoHome} alt="" src="/headerlogo.svg" />
      </div>

      <div className={styles.registration}>
        <div className={styles.registrationContainer}>
          <div className={styles.regisGoogle}>
            <img className={styles.googlevecIcon} alt="" src="/googlevec.svg" />
            <b className={styles.google}>Google</b>
          </div>
          <div className={styles.div34}>Или зарегистрируйтесь через</div>
          <div className={styles.regisLogging}>
            <b className={styles.b13}>РЕГИСТРАЦИЯ</b>
          </div>
          <div className={styles.regisContract}>
            <div className={styles.div35}>
              <span className={styles.txt}>
                <p className={styles.forex}>Я прочитал и принял соглашение:</p>
                <p className={styles.forex}>Договор о предоставлении услуг</p>
              </span>
            </div>
          </div>
          <input className={styles.checkbox} type="checkbox" />
          {/* <img className={styles.vectorIcon4} alt="" src="/vector4.svg" /> */}
          <div className={styles.regisPassword}>
            <div className={styles.div36}>
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
              <b className={styles.b14}>ВОЙТИ</b>
            </div>
            <div className={styles.tabsBtnLeft}>
              <b className={styles.b15}>РЕГИСТРАЦИЯ</b>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ThirdPage;
