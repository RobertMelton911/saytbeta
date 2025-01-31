import React from "react";
import styles from "./GrafPagePairDisclosed.module.css";
import { useAtom,atom } from "jotai"

// Данные о валютных парах
const currencyPairs = [
  { pair: "AUD/CAD", value: "92%" },
  { pair: "AUD/USD", value: "92%" },
  { pair: "EUR/USD", value: "90%" },
  { pair: "GBP/USD", value: "87%" },
  { pair: "AUD/NZD", value: "82%" },
  { pair: "GBP/JPY", value: "82%" },
  { pair: "CAD/CHF", value: "79%" },
  { pair: "USD/CAD", value: "71%" },
];

const GrafPagePairDisclosed = () => {
  const [ currency, setCurrency ] = useAtom(currencyPairsAtom);
  return (
    <div className={styles.pairNumberDisclosed}>
      <div className={styles.pairAsset}>
        <a className={styles.a}>Актив</a>
        <a className={styles.a1}>Выплота</a>
      </div>

      <section className={styles.pairOpenParent}>
        {currencyPairs.map((item, index) => (
          <div key={index} className={`${styles.pairOpen} ${index >= 4 ? styles.pairOpen5 : ""}`}  >
            <div className={styles.audcadOtc} onClick={() => setCurrency(item)} >{item.pair} OTC</div>
            <div className={styles.separators}>{item.value}</div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default GrafPagePairDisclosed;

export const currencyPairsAtom = atom(currencyPairs[0]);
