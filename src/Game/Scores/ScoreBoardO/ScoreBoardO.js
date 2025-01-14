import React, { memo, useEffect } from "react";

import { motion } from "framer-motion";
import styles from "./styles.module.css";

const ScoreBoardO = ({ variants }) => {
  const score = "";
  const playerOneMark = "";
  const playingAgainst = "";
  const winner = "";

  const playerTitle = () => {
    if (playingAgainst === "cpu")
      return `O (${playerOneMark === "o" ? "YOU" : "CPU"})`;
    else if (playingAgainst === "player")
      return `O (${playerOneMark === "o" ? "P1" : "P2"})`;
  };

  return (
    <motion.section className={styles.container} variants={variants}>
      <h1 className={styles.title}>{playerTitle()}</h1>
      <p className={styles.score}>{score}</p>
    </motion.section>
  );
};

export default memo(ScoreBoardO);
