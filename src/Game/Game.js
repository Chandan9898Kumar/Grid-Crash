import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
const Game = () => {
  const containerRef = useRef();
  return (
    <motion.div
      className={styles.container}
      ref={containerRef}
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.2 }}
    >
      Game
    </motion.div>
  );
};

export default Game;
