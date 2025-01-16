import LoaderPage from "Common/CircularLoader";
import { motion } from "framer-motion";
import React, { lazy, Suspense, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import {useSelector, useDispatch} from "react-redux"
const Header = lazy(() => import("./Header"));
const Board = lazy(() => import("./Board"));
const Scores = lazy(() => import("./Scores"));
const DisplayWinner = lazy(() => import("./DisplayWinner"));
const Game = () => {
  const containerRef = useRef();
  const firstRender = useRef(true)
  const board = useSelector((state)=> state?.board?.tiles)
  const winner = useSelector((state)=> state?.board?.winner)
  const menuOptions = useSelector(state => state?.menuOptions);
  const turn = useSelector(state => state?.turn);

  const dispatch= useDispatch()

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
