import React from "react";
import { useAtom } from "jotai";
import styles from "./GrafPageSelectAmount.module.css";
import { selectAmountVisibleAtom, selectedAmountAtom } from "./GrafPageRightPanel";

const amounts = [5, 10, 25, 50, 100, 250, 500, 1000];

const GrafPageSelectAmount = ({ selectAmountRef, rightPanelElement }) => {
  const [, setShowSelectAmount] = useAtom(selectAmountVisibleAtom);
  const [, setSelectedAmount] = useAtom(selectedAmountAtom);

  if (!rightPanelElement) return null;

  const rect = rightPanelElement.getBoundingClientRect();
  const style = {
    top: (rect.top + 109) + "px", 
    left: (rect.left - 197) + "px" // Вне `GrafPageRightPanel`, 15px слева
  };

  return (
    <div className={styles.selectAmount} ref={selectAmountRef} style={style}>
      <div className={styles.amountGrid}>
        {amounts.map((amount, index) => (
          <div key={index} className={styles.amountItem} onClick={() => {
            setSelectedAmount(amount.toString());
            setShowSelectAmount(false);
          }}>
            ${amount}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrafPageSelectAmount;
