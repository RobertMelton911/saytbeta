import React from "react";
import styles from "./SecondPageSteps.module.css";

const stepsData = [
  {
    icon: "/onlineregistration@2x.png",
    texts: [
      "Регистрация — довольно простой процесс. Вы можете выбрать один из способов регистрации: зарегистрироваться с адресом электронной почты, использовать свою учетную запись google.",
      "Создайте бесплатный торговый счет, используя адрес электронной почты или просто авторизуйтесь через учетную запись Google.",
    ],
    title: "РЕГИСТРАЦИЯ",
    number: "1",
    reversed: false,
  },
  {
    icon: "/verification@2x.png",
    texts: [
      "Верификация — это обязательная процедура, необходимая для защиты вашей учетной записи и средств от несанкционированного доступа, а также для соблюдения всех финансовых положений и требований AML.",
      "Сделайте вашу учетную запись персонализированной. Укажите личную информацию в профиль и загрузите документ, удостоверяющий личность и адрес.",
    ],
    title: "ВЕРИФИКАЦИЯ",
    number: "2",
    reversed: true,
  },
  {
    icon: "/donation@2x.png",
    texts: [
      "Как только ваша учетная запись будет полностью проверена, вам станут доступны все предлагаемые методы пополнения счета.",
      "Пополняйте баланс вашего торгового счета наиболее удобным способом. Время обработки зависит от использованного метода.",
    ],
    title: "ПОПОЛНИТЬ",
    number: "3",
    reversed: false,
  },
  {
    icon: "/stockmarket@2x.png",
    texts: [
      "Торговля на Trading Broker очень проста. Вам понадобится всего несколько вещей, чтобы легко ориентироваться в торговом интерфейсе.",
      "Торговать на Pocket Option легко! Выберите торговый актив, настройте предпочтительный тип графика и включите индикаторы для лучшего анализа рынка.",
    ],
    title: "ТОРГОВЛЯ",
    number: "4",
    reversed: true,
  },
  {
    icon: "/graph@2x.png",
    texts: [
      "Каждый правильный прогноз приносит прибыль — изначально сумма инвестиции торгового ордера и полученная прибыль автоматически добавляются к балансу вашего счета.",
      "Грамотно управляйте вашим доходом, инвестируйте дальше или снимайте прибыль.",
    ],
    title: "ПРИБЫЛЬ",
    number: "5",
    reversed: false,
  },
  {
    icon: "/withdraw@2x.png",
    texts: [
      "В зависимости от выбранного метода может потребоваться некоторое время, чтобы перевод отразился на вашем счете.",
      "Вы можете вывести баланс вашего торгового счета в любое время без каких-либо ограничений по сумме.",
    ],
    title: "ВЫВОД СРЕДСТВ",
    number: "6",
    reversed: true,
  },
];

const SecondPageSteps = () => {
  return (
    <div className={styles.stepsContainer}>
      {stepsData.map(({ icon, texts, title, number, reversed }, index) => (
        <div
          key={index}
          className={`${styles.step} ${reversed ? styles.reversed : ""}`}
        >
          <div className={styles.iconWrapper}>
            <img src={icon} alt={title} className={styles.icon} />
          </div>
          <div className={styles.contentWrapper}>
            {texts.map((text, i) => (
              <p key={i} className={styles.text}>
                {text}
              </p>
            ))}
            <p className={styles.title}>{title}</p>
            <p className={styles.number}>{number}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SecondPageSteps;
