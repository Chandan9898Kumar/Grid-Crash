import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "./icons";
import styles from "./styles.module.css";

const CpuButton = () => {
  return (
    <motion.button className={styles.cpuButton}>
      {" "}
      New Game ( Vs CPU )
    </motion.button>
  );
};

const PlayerButton = () => {
  return (
    <motion.button className={styles.playerButton}>
      New Game ( Vs Player )
    </motion.button>
  );
};

const Image = ({ variants }) => {
  return (
    <motion.img
      className={styles.logo}
      src={logo}
      variants={variants}
      alt="logo"
      loading="lazy"
    />
  );
};

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
      <CpuButton />
      <PlayerButton />
      
    </motion.div>
  );
};

export default MainMenu;
