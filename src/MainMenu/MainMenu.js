import { motion } from "framer-motion";
import React, { lazy, memo, useCallback, useEffect } from "react";
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
    fetchPriority="high"
    loading="eager"
    draggable={false}
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

  const handleGameStart = useCallback(
    (against) => {
      try {
        dispatch({ type: "UPDATE_PLAYER", against });
        navigate("/game");
      } catch (error) {
        console.error("Error starting game:", error);
        // Handle error appropriately
      }
    },
    [navigate, dispatch]
  );

  const playAgainstCpu = useCallback(() => {
    handleGameStart("cpu");
  }, [handleGameStart]);

  const playAgainstPlayer = useCallback(() => {
    handleGameStart("player");
  }, [handleGameStart]);

  useEffect(() => {
    // Batch multiple dispatches
    dispatch((dispatch) => {
      dispatch({ type: "RESET" });
      dispatch({ type: "RESTART" });
    });
  }, [dispatch]);

  return (
    <motion.div
      className={styles.container}
      initial={"hidden"}
      animate={"show"}
      transition={{ staggerChildren: 0.6 }}
    >
      <DisplayImage variants={variants} />
      <SelectMark variants={variants} />
      <DisplayCpuButton variants={variants} playAgainstCpu={playAgainstCpu} />
      <DisplayPlayerButton
        variants={variants}
        playAgainstPlayer={playAgainstPlayer}
      />
    </motion.div>
  );
};

export default MainMenu;
