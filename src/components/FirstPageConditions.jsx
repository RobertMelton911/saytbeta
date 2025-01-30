import React, { useEffect, useRef, useState } from "react";
import styles from "./FirstPageConditions.module.css";

const FirstPageConditions = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    b14: 0,
    b16: 0,
    b20: 0,
    b22: 0,
    b24: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
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

    const duration = 4000;
    const frameRate = 16;
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

  return (
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
  );
};

export default FirstPageConditions;
