import React from "react";
import styles from "./graf-page.module.css";
import HeaderMain from "../components/HeaderMain";
import GrafPageLeftPanel from "../components/GrafPageLeftPanel";
import GrafPageRightPanel from "../components/GrafPageRightPanel";
import GrafPagePairNumber from "../components/GrafPagePairNumber";
import GraphWrapper from "../components/graph/GraphWrapper";

const GrafPage = () => {
  return (
    <div className={styles.grafPage}>
      <HeaderMain />
      <div className={styles.content}>
        <GrafPageLeftPanel />

        {/*<div className={styles.pairNumberContainer}>*/}
        {/*  <GrafPagePairNumber />*/}
        {/*</div>*/}
          <GraphWrapper />
        <GrafPageRightPanel />
      </div>
    </div>
  );
};

export default GrafPage;
