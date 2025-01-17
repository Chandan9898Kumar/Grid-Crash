import LoaderPage from "Common/CircularLoader";
import { motion } from "framer-motion";
import React, { lazy, Suspense, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
const Header = lazy(() => import("./Header"));
const Board = lazy(() => import("./Board"));
const Scores = lazy(() => import("./Scores"));
const DisplayWinner = lazy(() => import("./DisplayWinner"));
const Game = () => {
  const containerRef = useRef();
  const firstRender = useRef(true);
  const timerRef = useRef();
  const board = useSelector((state) => state?.board?.tiles);
  const winner = useSelector((state) => state?.board?.winner);
  const menuOptions = useSelector((state) => state?.menuOptions);
  const turn = useSelector((state) => state?.turn);

  const dispatch = useDispatch();

  const variants = {
    hidden: { scale: 0 },
    show: {
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 6 },
    },
  };

  //this function is handles the moves for the cpu
  useEffect(() => {
    const playerOneMark = menuOptions.playerOneMark;
    const against = menuOptions.playerAgainst;
    if (winner) return;
    else if (against === "cpu" && playerOneMark !== turn) {
      containerRef.current.style.pointerEvents = "none";
      timerRef.current = setTimeout(
        () => {
          if (!containerRef.current) return;
          dispatch({ type: "CPU_MOVE", mark: turn });
          dispatch({ type: "CHECK_BOARD" });
          dispatch({ type: "CHECK_DRAW" });
          dispatch({ type: "CHANGE_TURN" });
          containerRef.current.style.pointerEvents = "";
        },
        playerOneMark === "o" ? (firstRender.current ? 3000 : 800) : 800
      );
      firstRender.current = false;
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [
    board,
    winner,
    turn,
    menuOptions.playerOneMark,
    menuOptions.playerAgainst,
    dispatch,
  ]);

  return (
    <>
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
      <Suspense fallback={<LoaderPage />}>
        {winner && (
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.2 }}
          >
            <DisplayWinner variants={variants} />
          </motion.div>
        )}
      </Suspense>
    </>
  );
};

export default Game;
