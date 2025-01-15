import LoaderPage from "Common/CircularLoader";
import { motion } from "framer-motion";
import React, { lazy, Suspense, useEffect, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "./icons";
import styles from "./styles.module.css";
const SelectMark = lazy(() => import("./SelectMark"));

const CpuButton = ({ variants, playAgainstCpu }) => (
  <motion.button
    onClick={playAgainstCpu}
    className={styles.cpuButton}
    variants={variants}
  >
    New Game (Vs CPU)
  </motion.button>
);

const DisplayCpuButton = memo(CpuButton);

const PlayerButton = ({ variants, playAgainstPlayer }) => (
  <motion.button
    onClick={playAgainstPlayer}
    className={styles.playerButton}
    variants={variants}
  >
    New Game (Vs Player)
  </motion.button>
);

const DisplayPlayerButton = memo(PlayerButton);

const Image = ({ variants }) => (
  <motion.img
    className={styles.logo}
    src={logo}
    variants={variants}
    alt="logo"
    loading="lazy"
  />
);

const DisplayImage = memo(Image);

const MainMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const variants = {
    hidden: {
      scale: 0,
    },
    show: {
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 6 },
    },
  };

  const playAgainstCpu = useCallback(() => {
    dispatch({type: 'UPDATE_PLAYER', against: 'cpu'})
    navigate("/game");
  }, [navigate,dispatch]);

  const playAgainstPlayer = useCallback(() => {
    dispatch({type: 'UPDATE_PLAYER', against: 'player'})
    navigate("/game");
  }, [navigate,dispatch]);

  useEffect(() => {
    // dispatch({ type: "RESTART" });
  }, [dispatch]);

  return (
    <motion.div
      className={styles.container}
      initial={"hidden"}
      animate={"show"}
      transition={{ staggerChildren: 0.6 }}
    >
      <DisplayImage variants={variants} />
      <Suspense fallback={<LoaderPage />}>
        <SelectMark variants={variants} />
      </Suspense>
      <DisplayCpuButton variants={variants} playAgainstCpu={playAgainstCpu} />
      <DisplayPlayerButton
        variants={variants}
        playAgainstPlayer={playAgainstPlayer}
      />
    </motion.div>
  );
};

export default MainMenu;
