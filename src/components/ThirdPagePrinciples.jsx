import React from "react";
import styles from "./ThirdPagePrinciples.module.css";

const ThirdPagePrinciples = () => {
  // Данные для блоков
  const principles = [
    {
      icon: "/modernization@2x.png",
      title: "ВЕДУЩИЕ ИННОВАЦИИ",
      text: [
        "Мы не стоим на месте и находимся в постоянном стремлении к совершенству. Внедрение передовых решений и установление новых тенденций делает нас лидерами отрасли.",
      ],
    },
    {
      icon: "/collaboration@2x.png",
      title: "ЛОЯЛЬНОСТЬ КЛИЕНТОВ",
      text: [
        "Доступная каждому возможность стать профессиональным трейдером. Установление долгосрочных отношений за счет отзывчивости и регулярного оказания первоклассных услуг.",
      ],
    },
    {
      icon: "/commuinity@2x.png",
      title: "ДРУЖНОЕ СООБЩЕСТВО",
      text: [
        "Мы высоко ценим наше сообщество. Полноценная социальная платформа для взаимодействия между нашими клиентами — это наше достояние и основа для развития компании.",
      ],
    },
    {
      icon: "/stat@2x.png",
      title: "РАЗВИТИЕ",
      text: [
        "Привлечение, развитие и удержание лучших талантов для нашего проекта, создание сложных задач для наших сотрудников, поощрение инициативы и создание атмосферы сотрудничества и поддержки.",
      ],
    },
    {
      icon: "/integration@2x.png",
      title: "ЦЕЛОСТНОСТЬ",
      text: [
        "Ответственность и соблюдение правовых норм имеют важное значение для нашей деятельности как глобального предприятия. Мы привержены международной практике, которая приносит пользу нашей компании и клиентам.",
      ],
    },
    {
      icon: "/rising@2x.png",
      title: "ОБЩИЙ УСПЕХ",
      text: [
        "Наша задача — предоставлять клиентам по всему миру простую и доступную торговлю, которая позволяет зарабатывать на финансовых рынках в любое время и в любом месте.",
      ],
    },
  ];

  return (
    <div className={styles.mainContainerPrinciples}>
      <div className={styles.principlesContent}>
        {principles.map((item, index) => (
          <div key={index} className={styles[`content${6 - index}`]}>
            <img className={styles.risingIcon} alt="icon" src={item.icon} />
            <b className={styles[`b${6 - index}`]}>{item.title}</b>
            <div className={styles[`div${8 + index}`]}>
              <span className={styles.txt}>
                {item.text.map((line, i) => (
                  <p key={i} className={styles.forex}>{line}</p>
                ))}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.principlesValues}>
        <div className={styles.div14}>Наши ключевые ценности и принципы</div>
      </div>
    </div>
  );
};

export default ThirdPagePrinciples;
