import LoaderPage from "Common/CircularLoader";
import { motion } from "framer-motion";
import React, { lazy, memo, Suspense } from "react";
import icons from "./icons";
import styles from "./styles.module.css";
const CurrentTurn = lazy(() => import("./CurrentTurn"));
const Restart = lazy(() => import("./Restart"));
const Header = ({ variants }) => {
  return (
    <motion.header className={styles.headerBar} variants={variants}>
      <img
        className={styles.logo}
        src={icons["logo"]}
        alt="header-image"
        loading="lazy"
      />

      <Suspense fallback={<LoaderPage />}>
        <CurrentTurn />
        <Restart />
      </Suspense>
    </motion.header>
  );
};

export default memo(Header);
