import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./profile-page.module.css";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleDemoAccount = () => {
    navigate("/grafpage");
  };
  
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div className={styles.profilePage}>

      <div className={styles.delete}>
        <div className={styles.div}>Удалить счет</div>
      </div>

      <div className={styles.inspection}>
        <div className={styles.inspectionBody}>
          <div className={styles.bodyReverse}>
            <div className={styles.cvv}>Скройте код CVV.</div>
            <div className={styles.reverseCard}>
              <div className={styles.div1}>
                <span className={styles.txt}>
                  <p className={styles.p}>
                    Нажмите, чтобы загрузить или перетащите изображение
                  </p>
                  <p className={styles.p}>обратной стороны.</p>
                </span>
              </div>
              <div className={styles.cardPlus}>
                <div className={styles.verticalDivider} />
                <div className={styles.horizontalDivider} />
              </div>
            </div>
          </div>
          <div className={styles.bodyFront}>
            <div className={styles.div2}>Скройте средние цифры.</div>
            <div className={styles.reverseCard}>
              <div className={styles.div1}>
                <span className={styles.txt}>
                  <p className={styles.p}>
                    Нажмите, чтобы загрузить или перетащите изображение
                  </p>
                  <p className={styles.p}>лицевой стороны.</p>
                </span>
              </div>
              <div className={styles.cardPlus}>
                <div className={styles.verticalDivider} />
                <div className={styles.horizontalDivider} />
              </div>
            </div>
          </div>
          <div className={styles.bodyTable}>
            <div className={styles.tableThree}>
              <div className={styles.div4}>{`Верифицирован `}</div>
              <div className={styles.div5}>2024-09-27 14:00</div>
              <div className={styles.div6}>Лицевая сторона</div>
            </div>
            <div className={styles.tableTwo}>
              <div className={styles.div7}>{`Верифицирован `}</div>
              <div className={styles.div8}>2024-09-27 14:00</div>
              <div className={styles.div9}>Обратная сторона</div>
            </div>
            <div className={styles.tableOne}>
              <div className={styles.div10}>Статус</div>
              <div className={styles.div11}>Дата</div>
              <div className={styles.div12}>Тип</div>
            </div>
            <div className={styles.div13}>Загруженные изображения</div>
          </div>
          <div className={styles.bodyCard}>
            <div className={styles.div14}>Верифицирован</div>
            <div className={styles.div15}>Статус</div>
            <div className={styles.div16}> 2024-09-27 13:57</div>
            <div className={styles.div17}>Дата</div>
            <div className={styles.visa}> visa</div>
            <div className={styles.div18}>Тип</div>
            <div className={styles.xxxxXxxxXxxx}> XXXX XXXX XXXX 0101</div>
            <div className={styles.div19}>Карта</div>
          </div>
          <div className={styles.div20}>Список карт</div>
        </div>
        <div className={styles.inspectionTop}>
          <div className={styles.div21}>Информация о личности</div>
        </div>
      </div>

      <div className={styles.trade}>
        <div className={styles.tradeBody}>
          <div className={styles.bodyDeals}>
            <div className={styles.dealsSeven}>
              <div className={styles.div22}>
                <span className={styles.txt}>
                  <ul className={styles.ul}>
                    <li>Макс. прибыль: $7.36</li>
                  </ul>
                </span>
              </div>
            </div>
            <div className={styles.dealsSix}>
              <div className={styles.div23}>
                <span className={styles.txt}>
                  <ul className={styles.ul}>
                    <li>Мин. сделка: $1</li>
                  </ul>
                </span>
              </div>
            </div>
            <div className={styles.dealsFive}>
              <div className={styles.div24}>
                <span className={styles.txt}>
                  <ul className={styles.ul}>
                    <li>Макс. сделка: $20</li>
                  </ul>
                </span>
              </div>
            </div>
            <div className={styles.dealsFour}>
              <div className={styles.div25}>
                <span className={styles.txt}>
                  <ul className={styles.ul}>
                    <li>Торговая прибыль: -$18.01</li>
                  </ul>
                </span>
              </div>
            </div>
            <div className={styles.dealsThree}>
              <div className={styles.div26}>
                <span className={styles.txt}>
                  <ul className={styles.ul}>
                    <li>Торговый оборот: $334</li>
                  </ul>
                </span>
              </div>
            </div>
            <div className={styles.dealsTwo}>
              <div className={styles.div27}>
                <span className={styles.txt}>
                  <ul className={styles.ul}>
                    <li>Прибыльных сделок: 47%</li>
                  </ul>
                </span>
              </div>
            </div>
            <div className={styles.dealsOne}>
              <div className={styles.div28}>
                <div className={styles.txt}>
                  <ul className={styles.ul}>
                    <li>Сделки: 175</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bodyTable1}>
            <div className={styles.tableTime}>
              <div className={styles.div29}>
                <span className={styles.txt}>
                  <p className={styles.p}>За все</p>
                  <p className={styles.p}>время</p>
                </span>
              </div>
            </div>
            <div className={styles.tableYesterday}>
              <div className={styles.div30}>Вчера</div>
            </div>
            <div className={styles.tableToday}>
              <div className={styles.div31}>Сегодня</div>
            </div>
          </div>
          <div className={styles.bodyAccount}>
            <div className={styles.div32}>Статистика реального счета</div>
          </div>
          <div className={styles.bodyStats}>
            <div className={styles.statsBalance}>
              <div className={styles.div33}>$0.99</div>
              <div className={styles.div34}>Баланс:</div>
            </div>
            <div className={styles.statsUid}>
              <div className={styles.div35}>43175980</div>
              <div className={styles.div36}>Уникальный идентификатор:</div>
            </div>
          </div>
          <div className={styles.bodyTitle}>
            <div className={styles.johnS}>John S.</div>
          </div>
          <div className={styles.avatarImg}>
            <img
              className={styles.profile1Icon}
              alt=""
              src="/profile-1@2x.png"
            />
          </div>
        </div>
        <div className={styles.tradeTop}>
          <div className={styles.div37}>Торговый профиль</div>
        </div>
      </div>

      <div className={styles.societal}>
        <div className={styles.societalBody}>
          <div className={styles.bodyHide}>
            <div className={styles.div38}>Скрыть мой профиль</div>
            <img className={styles.switchIcon} alt="" src="/switch.svg" />
          </div>
          <div className={styles.bodyNickname}>
            <div className={styles.div39}>Никнейм</div>
            <div className={styles.johnsmithgmailcom}>user81496910</div>
          </div>
          <div className={styles.bodyAvatar}>
            <div className={styles.avatarBtn}>
              <div className={styles.div40}>
                Кликните или перенесите изображение
              </div>
            </div>
            <div className={styles.div41}>Аватарка</div>
            <div className={styles.avatarImg1}>
              <img
                className={styles.profile1Icon1}
                alt=""
                src="/profile-11@2x.png"
              />
            </div>
          </div>
        </div>
        <div className={styles.societalTop}>
          <div className={styles.div42}>Социальная торговля</div>
        </div>
      </div>

      <div className={styles.status}>
        <div className={styles.statusBody}>
          <div className={styles.bodyNumber}>
            <div className={styles.div43}>Номер документа</div>
            <div className={styles.johnsmithgmailcom1}>********37</div>
          </div>
          <div className={styles.bodyStatus}>
            <div className={styles.div44}>Статус</div>
            <div className={styles.emailBtn}>
              <div className={styles.div45}>Верифицирован</div>
            </div>
          </div>
          <div className={styles.bodyDocument}>
            <div className={styles.div46}>Тип документа</div>
            <div className={styles.johnsmithgmailcom2}>
              Удостоверение личности
            </div>
          </div>
          <div className={styles.bodyData}>
            <div className={styles.div47}>Дата</div>
            <div className={styles.div48}>2024-09-17 17:40</div>
          </div>
          <div className={styles.bodyProfile}>
            <div className={styles.profile}>profile</div>
            <div className={styles.div49}>Тип</div>
          </div>
        </div>
        <div className={styles.topBtn}>
          <div className={styles.div45}>Верифицирован</div>
        </div>
        <div className={styles.statusTop}>
          <div className={styles.div51}>{`Статус личности `}</div>
        </div>
      </div>

      <div className={styles.information}>
        <div className={styles.informationBody}>
          <div className={styles.bodyDate}>
            <div className={styles.div52}>
              <span className={styles.txt}>
                <span>{`Дата рождения `}</span>
                <span className={styles.span}>*</span>
              </span>
            </div>
            <div className={styles.johnsmithgmailcom3}>2001-11-08</div>
          </div>
          <div className={styles.bodyPhone}>
            <div className={styles.div53}>Телефон</div>
            <div className={styles.div54}>(555) 555-1234</div>
          </div>
          <div className={styles.bodyEmail}>
            <div className={styles.email}>Email</div>
            <div className={styles.emailBtn}>
              <div className={styles.div45}>Верифицирован</div>
            </div>
            <div className={styles.johnsmithgmailcom4}>johnsmith@gmail.com</div>
          </div>
          <div className={styles.bodySurname}>
            <div className={styles.div53}>
              <span className={styles.txt}>
                <span>{`Фамилия `}</span>
                <span className={styles.span}>*</span>
              </span>
            </div>
            <div className={styles.smith}>Smith</div>
          </div>
          <div className={styles.bodyName}>
            <div className={styles.john}>John</div>
            <div className={styles.div57}>
              <span className={styles.txt}>
                <span>{`Имя `}</span>
                <span className={styles.span}>*</span>
              </span>
            </div>
          </div>
        </div>
        <div className={styles.informationTop}>
          <div className={styles.div21}>Информация о личности</div>
        </div>
      </div>

      <div className={styles.navLink}>
        <div className={styles.linkHistory}>
          <div className={styles.div59}>История</div>
        </div>
        <div className={styles.linkWithdrawal}>
          <div className={styles.div60}>Вывод средств</div>
        </div>
        <div className={styles.linkReplenish}>
          <div className={styles.div61}>Пополнить</div>
        </div>
        <div className={styles.linkSafety}>
          <div className={styles.div62}>Безопасность</div>
        </div>
        <div className={styles.linkTradingHistory}>
          <div className={styles.div63}>История торговли</div>
        </div>
        <div className={styles.linkProfile}>
          <div className={styles.div64}>Профиль</div>
        </div>
      </div>

      <div className={styles.header}>
        <div className={styles.headerProfile}>
          <img
            className={styles.profile1Icon2}
            alt=""
            src="/profile-12@2x.png"
          />
        </div>
        <div className={styles.headerDeposit}>
          <b className={styles.deposit}>Deposit</b>
        </div>
        <div className={styles.headerAcc} onClick={handleDemoAccount}>
          <b className={styles.b}>$1,000.00</b>
          <img className={styles.accSvgIcon} alt="" src="/accsvg.svg" />
          <div className={styles.demoAccount}>Demo account</div>
        </div>
        <img className={styles.vectorIcon} onClick={handleLogoClick} alt="" src="/vector5.svg" />
      </div>

    </div>
  );
};

export default ProfilePage;
