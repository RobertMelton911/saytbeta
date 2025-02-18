import React, { useState } from "react";
import styles from "./ProfPageNavLink.module.css";

const ProfPageNavLink = () => {
  // Массив с данными о ссылках
  const links = [
    { id: "profile", text: "Профиль", width: 89, offset: 1 },
    { id: "trading", text: "История торговли", width: 152, offset: 94 },
    { id: "safety", text: "Безопасность", width: 122, offset: 250 },
    { id: "replenish", text: "Пополнить", width: 105, offset: 377 },
    { id: "withdrawal", text: "Вывод средств", width: 125, offset: 487 },
    { id: "history", text: "История", width: 85, offset: 617 },
  ];

  // Состояния
  const [activeLink, setActiveLink] = useState("profile"); // Для закрепления после клика
  const [hoverLink, setHoverLink] = useState("profile");   // Для перемещения фона при наведении

  // Обработчик клика
  const handleClick = (linkId) => {
    setActiveLink(linkId); // Закрепляем активную ссылку
    setHoverLink(linkId);  // Устанавливаем hoverLink, чтобы фон не "прыгал" после клика
  };

  // Обработчик наведения
  const handleMouseEnter = (linkId) => {
    setHoverLink(linkId); // Перемещаем фон при наведении
  };

  // Обработчик ухода курсора
  const handleMouseLeave = () => {
    setHoverLink(activeLink); // Возвращаем фон к активной ссылке
  };

  // Вычисляем стили для sliding background
  const hoverLinkData = links.find((link) => link.id === hoverLink);
  const slidingBackgroundStyle = {
    width: `${hoverLinkData.width}px`,
    transform: `translateX(${hoverLinkData.offset}px)`,
  };

  return (
    <div className={styles.navLink}>
      <div className={styles.navLinkContainer}>
        {/* Sliding background */}
        <div
          className={styles.slidingBackground}
          style={slidingBackgroundStyle}
        />

        {/* Ссылки */}
        {links.map((link) => (
          <div key={link.id} className={`${styles.link} ${ activeLink === link.id ? styles.linkActive : "" }`}
            onClick={() => handleClick(link.id)}
            onMouseEnter={() => handleMouseEnter(link.id)}
            onMouseLeave={handleMouseLeave}>
            <div className={styles.linkText}>{link.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfPageNavLink;