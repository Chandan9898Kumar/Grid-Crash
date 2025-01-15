import { motion } from "framer-motion";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

const ScoreBoardO = ({ variants }) => {
  const score = useSelector((state) => state?.scores?.o);
  const playerOneMark = useSelector(
    (state) => state?.menuOptions?.playerOneMark
  );
  const playingAgainst = useSelector(
    (state) => state?.menuOptions?.playerAgainst
  );
  const winner = useSelector((state) => state?.board?.winner);
  const dispatch = useDispatch();

  const playerTitle = () => {
    if (playingAgainst === "cpu")
      return `O (${playerOneMark === "o" ? "YOU" : "CPU"})`;
    else if (playingAgainst === "player")
      return `O (${playerOneMark === "o" ? "P1" : "P2"})`;
  };

  useEffect(() => {
    if (winner === "o") dispatch({ type: "UPDATE_SCORE_O" });
  }, [winner, dispatch]);

  return (
    <motion.section className={styles.container} variants={variants}>
      <h1 className={styles.title}>{playerTitle()}</h1>
      <p className={styles.score}>{score}</p>
    </motion.section>
  );
};

export default memo(ScoreBoardO);
