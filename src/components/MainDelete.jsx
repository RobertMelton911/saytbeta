import React from "react";
import styles from "./MainDelete.module.css";

const MainDelete = () => {
  // Обработчик клика
  const handleClick = () => {
    alert("Счет будет удален. Вы уверены?");
    // Здесь можно добавить логику для удаления счета
  };

  return (
    <div className={styles.delete} onClick={handleClick}>
      <div className={styles.div}>Удалить счет</div>
    </div>
  );
};

export default MainDelete;