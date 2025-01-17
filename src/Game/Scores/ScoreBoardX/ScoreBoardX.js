import { motion } from "framer-motion";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
const ScoreBoardX = ({ variants }) => {
  const score = useSelector((state) => state?.scores?.x);
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
      return `X (${playerOneMark === "x" ? "YOU" : "CPU"})`;
    else if (playingAgainst === "player")
      return `X (${playerOneMark === "x" ? "P1" : "P2"})`;
  };

  useEffect(() => {
    if (winner === "x") {
      dispatch({ type: "UPDATE_SCORE_X" });
    }
  }, [winner, dispatch]);

  return (
    <motion.section className={styles.container} variants={variants}>
      <h1 className={styles.title}>{playerTitle()}</h1>

      <p className={styles.score}>{score}</p>
    </motion.section>
  );
};

export default memo(ScoreBoardX);
