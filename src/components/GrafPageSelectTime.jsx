import React from "react";
import { useAtom } from "jotai";
import styles from "./GrafPageSelectTime.module.css";
import { selectTimeVisibleAtom, selectedTimeAtom } from "./GrafPageRightPanel";

const timeframes = ["1мин", "5мин", "10мин", "15мин", "30мин", "1час"];

const GrafPageSelectTime = ({ selectTimeRef, rightPanelElement }) => {
  const [, setShowSelectTime] = useAtom(selectTimeVisibleAtom);
  const [, setSelectedTime] = useAtom(selectedTimeAtom);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowSelectTime(false);
  };

  if (!rightPanelElement) return null;
  
  const rect = rightPanelElement.getBoundingClientRect();
  const style = {
    top: rect.top + "px",
    left: (rect.left - 185) + "px" // 170px ширина + 15px отступ
  };

  return (
    <div
      className={styles.selecttime}
      ref={selectTimeRef}
      style={style}
    >
      <div className={styles.timeGrid}>
        {timeframes.map((time, index) => (
          <div key={index} className={styles.timeList} onClick={() => handleTimeSelect(time)}>
            {time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrafPageSelectTime;
