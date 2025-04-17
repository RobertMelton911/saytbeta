import PageContainer from "../components/page-container";
import styles from "./login-page.module.css";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.containerWrapper}>
        <PageContainer />
      </div>
    </div>
  );
};

export default LoginPage;