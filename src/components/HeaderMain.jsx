import React, {useEffect, useState} from "react";
import styles from "./HeaderMain.module.css";
import { useNavigate } from "react-router-dom";

const HeaderMain = () => {
  const navigate = useNavigate();
  const [demoBalance, setDemoBalance] = useState(1000);
  const handleNavigation = (path) => navigate(path);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
         if (!response.ok) {
           throw new Error("Could not find token");
         }

         const data = await response.json();
         setDemoBalance(data.balance)
         console.log("Response", data);
      }
      catch (error) {
        console.log(error);
      }
    }
  })
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <img className={styles.logo} onClick={() => handleNavigation("/")} alt="Home" src="/vector5.svg" />

        <div className={styles.rightSection}>
          {/* Секция аккаунта */}
          <div className={styles.account} onClick={() => handleNavigation("/grafpage")} >
            <span className={styles.demoText}>Demo account</span>
            <b className={styles.balance}>${demoBalance}</b>
          </div>

          {/* Кнопка депозита */}
          <button className={styles.depositButton}>
            <div className={styles.depositText}>Deposit</div>
          </button>

          {/* Профиль */}
          <div className={styles.profile} onClick={() => handleNavigation("/profilepage")} >
            <img className={styles.profileImage} alt="Profile" src="/profile-12@2x.png" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;


