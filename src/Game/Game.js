import React, { useEffect, useRef, lazy, Suspense } from "react";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import LoaderPage from "Common/CircularLoader";
const Header = lazy(() => import("./Header"));
const Board = lazy(() => import("./Board"));
const Scores = lazy(() => import("./Scores"));
const DisplayWinner = lazy(() => import("./DisplayWinner"));
const Game = () => {
  const containerRef = useRef();

  const variants = {
    hidden: { scale: 0 },
    show: {
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 6 },
    },
  };
  return (
    <>
      <Suspense fallback={<LoaderPage />}>
        <motion.div
          className={styles.container}
          ref={containerRef}
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.2 }}
        >
          <Header variants={variants} />
          <Board variants={variants} />
          <Scores variants={variants} />
        </motion.div>

        <DisplayWinner />
      </Suspense>
    </>
  );
};

export default Game;
