import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./graf-page.module.css";

const GrafPage = () => {
  const navigate = useNavigate();

  const handleGoProfile = () => {
    navigate("/profilepage");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.grafPage}>

      <div className={styles.rightpanel}>
        <div className={styles.rightpanelContainer}>
          <div className={styles.rightpanelButtons}>
            <div className={styles.rightpanelBottonSell}>
              <div className={styles.container}>
                <b className={styles.b}>Продать</b>
              </div>
            </div>
            <div className={styles.rightpanelBottonBuy}>
              <div className={styles.container}>
                <b className={styles.b}>Купить</b>
              </div>
            </div>
          </div>
          <div className={styles.majorityOpinion}>
            <div className={styles.majorityOpinion1}>Majority opinion</div>
            <div className={styles.background}>
              <div className={styles.background1} />
            </div>
            <div className={styles.div}>64%</div>
            <div className={styles.div1}>36%</div>
          </div>
          <div className={styles.rightpanelPay}>
            <b className={styles.b2}>+92</b>
            <b className={styles.b3}>%</b>
            <div className={styles.div2}>$19.2</div>
            <div className={styles.div3}>Выплата</div>
            <div className={styles.div4}>+$9.2</div>
            <div className={styles.div5}>Прибыль</div>
          </div>
          <div className={styles.rightpanelMoney}>
            <div className={styles.div6}>$</div>
            <div className={styles.container2}>
              <div className={styles.div7}>Сумма</div>
            </div>
            <div className={styles.vuiInputNumber}>
              <img
                className={styles.containerIcon}
                alt=""
                src="/container1.svg"
              />
              <img
                className={styles.containerIcon1}
                alt=""
                src="/container2.svg"
              />
              <div className={styles.input}>
                <div className={styles.div8}>10</div>
              </div>
            </div>
          </div>
          <div className={styles.rightpanelTime}>
            <div className={styles.container3}>
              <div className={styles.div9}>Время</div>
            </div>
            <div className={styles.vuiInputNumber1}>
              <img
                className={styles.containerIcon2}
                alt=""
                src="/container3.svg"
              />
              <img
                className={styles.containerIcon3}
                alt=""
                src="/container4.svg"
              />
              <div className={styles.input}>
                <div className={styles.div10}>16:43</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.leftpanel}>
        <div className={styles.leftpanelBottomlist}>
          <div className={styles.item}>
            <div className={styles.div11}>Помощь</div>
            <img className={styles.vectorIcon} alt="" src="/icon.svg" />
          </div>
          <div className={styles.item1}>
            <div className={styles.div12}>Войти</div>
            <img className={styles.vectorIcon1} alt="" src="/icon2.svg" />
          </div>
          <div className={styles.item2}>
            <div className={styles.div13}>Регистрация</div>
            <img className={styles.vectorIcon2} alt="" src="/icon1.svg" />
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.item3}>
            <div className={styles.wrapper}>
              <div className={styles.div14}>1м</div>
            </div>
          </div>
          <div className={styles.item4}>
            <div className={styles.wrapper}>
              <img className={styles.vectorIcon3} alt="" src="/vector6.svg" />
            </div>
          </div>
          <div className={styles.item5}>
            <div className={styles.vectorParent}>
              <img className={styles.vectorIcon4} alt="" src="/vector7.svg" />
              <img className={styles.vectorIcon5} alt="" src="/vector8.svg" />
            </div>
          </div>
          <div className={styles.item6}>
            <div className={styles.wrapper}>
              <img className={styles.vectorIcon6} alt="" src="/vector9.svg" />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.header}>
        <img className={styles.containerIcon4} onClick={handleGoProfile} alt="" src="/container.svg" />
        <div className={styles.link}>
          <div className={styles.container4}>
            <div className={styles.demoAccount}>Demo account</div>
          </div>
          <img className={styles.vuiIconSvg} alt="" src="/accsvg.svg" />
          <div className={styles.container5}>
            <b className={styles.b4}>$1,000.00</b>
          </div>
        </div>
        <div className={styles.depositWrapper}>
          <b className={styles.deposit}>Deposit</b>
        </div>
        <img className={styles.vectorIcon7} onClick={handleGoHome} alt="" src="/vector5.svg" />
      </div>

    </div>
  );
};

export default GrafPage;
