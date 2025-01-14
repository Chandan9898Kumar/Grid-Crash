import React, { lazy, memo, Suspense } from "react";
import styles from "./styles.module.css";

const ScoreBoardX = lazy(() => import("./ScoreBoardX"));
const ScoreBoardO = lazy(() => import("./ScoreBoardO"));
const ScoreBoardTies = lazy(() => import("./ScoreBoardTies"));
const Scores = ({ variants }) => {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <ScoreBoardX variants={variants} />
        <ScoreBoardTies variants={variants} />
        <ScoreBoardO variants={variants} />
      </Suspense>
    </div>
  );
};

export default memo(Scores);
