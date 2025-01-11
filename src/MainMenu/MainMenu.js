import LoaderPage from "Common/CircularLoader";
import { motion } from "framer-motion";
import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "./icons";
import styles from "./styles.module.css";
const SelectMark = lazy(() => import("./SelectMark"));

const CpuButton = React.memo(({ variants }) => (
  <motion.button className={styles.cpuButton} variants={variants}>
    New Game (Vs CPU)
  </motion.button>
));

const PlayerButton = React.memo(({ variants }) => (
  <motion.button className={styles.playerButton} variants={variants}>
    New Game (Vs Player)
  </motion.button>
));

const Image = React.memo(({ variants }) => (
  <motion.img
    className={styles.logo}
    src={logo}
    variants={variants}
    alt="logo"
    loading="lazy"
  />
));

const MainMenu = () => {
  const variants = {
    hidden: {
      scale: 0,
    },
    show: {
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 6 },
    },
  };
  return (
    <motion.div
      className={styles.container}
      initial={"hidden"}
      animate={"show"}
      transition={{ staggerChildren: 0.6 }}
    >
      <Image variants={variants} />
      <Suspense fallback={<LoaderPage />}>
        <SelectMark variants={variants} />
      </Suspense>
      <CpuButton variants={variants} />
      <PlayerButton variants={variants} />
    </motion.div>
  );
};

export default MainMenu;
