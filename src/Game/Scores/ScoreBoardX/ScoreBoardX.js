import React, { memo, useEffect } from "react";
import styles from "./styles.module.css";

import { motion } from "framer-motion";
const ScoreBoardX = ({ variants }) => {
  const score = "";
  const playerOneMark = "";
  const playingAgainst = "";
  const winner = "";

  const playerTitle = () => {
    if (playingAgainst === "cpu")
      return `X (${playerOneMark === "x" ? "YOU" : "CPU"})`;
    else if (playingAgainst === "player")
      return `X (${playerOneMark === "x" ? "P1" : "P2"})`;
  };

  return (
    <motion.section className={styles.container} variants={variants}>
      <h1 className={styles.title}>{playerTitle()}</h1>

      <p className={styles.score}>{score}</p>
    </motion.section>
  );
};

export default memo(ScoreBoardX);