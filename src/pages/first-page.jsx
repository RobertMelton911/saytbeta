import styles from "./first-page.module.css";
import HeaderRegis from "../components/HeaderRegis";
import Registration from "../components/Registration";
import Footer from "../components/Footer";
import FirstPageSlider from "../components/FirstPageSlider";
import FirstPageConditions from "../components/FirstPageConditions";
import FirstPageChoice from "../components/FirstPageChoice";

const FirstPage = () => {
  return (
    <div className={styles.firstPage}>
      <HeaderRegis />
      <Registration />
      
      <div className={styles.main}>
        <FirstPageSlider />
        <FirstPageConditions />
        <FirstPageChoice />
      </div>
      
      <Footer />
    </div>
  );
};

export default FirstPage;
