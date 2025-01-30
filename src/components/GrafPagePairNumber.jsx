import React from "react";
import styles from "./GrafPagePairNumber.module.css";

const GrafPagePairNumber = () => {
  return (
    <div className={styles.pairNumberWrap}>
      <div className={styles.audcadWrapper}>
        <div className={styles.audcad}>AUD/CAD</div>
      </div>
      <div className={styles.separatorParent}>
        <div className={styles.audcad}>67</div>
        <div className={styles.separator1}>%</div>
      </div>
      <div className={styles.pairNumberWrapInner}>
        <div className={styles.otcWrapper}>
          <div className={styles.otc}>OTC</div>
        </div>
      </div>
      <div className={styles.borderWrapper}>
        <div className={styles.border} />
      </div>
    </div>
  );
};

export default GrafPagePairNumber;