import { motion } from "framer-motion";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";

function ScoreBoardTies({ variants }) {
  const ties = useSelector((state) => state?.scores?.ties);
  const winner = useSelector((state) => state?.board?.winner);
  const dispatch = useDispatch();

  useEffect(() => {
    if (winner === "draw") dispatch({ type: "UPDATE_TIES" });
  }, [winner, dispatch]);

  return (
    <motion.section className={styles.container} variants={variants}>
      <h1 className={styles.title}>TIES</h1>
      <p className={styles.score}>{ties}</p>
    </motion.section>
  );
}

export default memo(ScoreBoardTies);
