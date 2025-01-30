import React, { useEffect, useRef, useState } from "react";
import styles from "./ThirdPageClients.module.css";

const typingText = `Качество обслуживания клиентов остается нашим главным приоритетом с момента основания.
Мы стараемся не только обеспечивать безупречную поддержку, но и внимательно прислушиваться к отзывам пользователей.
Множество замечательных идей были вдохновлены именно нашими клиентами.
От трейдеров и для трейдеров!

Руководитель отдела по работе с клиентами Trading Broker`;

const highlightTextStart = typingText.indexOf("Руководитель отдела по работе с клиентами Trading Broker");

const ThirdPageClients = () => {
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

  return (
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
  );
};

export default ThirdPageClients;
