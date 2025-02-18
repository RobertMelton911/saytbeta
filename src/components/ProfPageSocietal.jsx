import React, { useState } from "react";
import styles from "./ProfPageSocietal.module.css";

const ProfPageSocietal = () => {
  const [isProfileHidden, setIsProfileHidden] = useState(false);
  const [avatar, setAvatar] = useState("/profile-11@2x.png"); // Состояние для аватарки
  const [isCustomAvatar, setIsCustomAvatar] = useState(false); // Состояние для отслеживания выбора аватарки

  const toggleProfileVisibility = () => {
    setIsProfileHidden(!isProfileHidden);
  };

  // Обработчик выбора аватарки
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Устанавливаем новую аватарку
        setIsCustomAvatar(true); // Указываем, что аватарка выбрана пользователем
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.societal}>
      <div className={styles.societalTop}>
        <div className={styles.societalTitle}>Социальная торговля</div>
      </div>

      <div className={styles.societalBodyContainer}>
        <div className={styles.societalBody}>
          <div className={styles.avatarLabel}>Аватарка</div>
          <div className={styles.avatarImg1}>
            <img className={`${styles.profile1Icon1} ${isCustomAvatar ? styles.fullCircle : ""}`} alt="Аватарка" src={avatar}/>
          </div>
        </div>

        <label className={styles.avatarBtn}>
          <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange}/>
          <div className={styles.avatarText}>
            Кликните или перенесите изображение
          </div>
        </label>
      </div>

      <div className={styles.bodyNickname}>
        <div className={styles.nicknameLabel}>Никнейм</div>
        <div className={styles.nicknameValue}>User</div>
      </div>

      <div className={styles.bodyHide}>
        <div className={styles.hideLabel}>Скрыть мой профиль</div>
        <div className={styles.toggleSwitch} onClick={toggleProfileVisibility}>
          <div className={`${styles.toggleSlider} ${isProfileHidden ? styles.toggled : ""}`}></div>
        </div>
      </div>
    </div>
  );
};

export default ProfPageSocietal;