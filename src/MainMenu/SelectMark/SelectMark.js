import { motion } from "framer-motion";
import React, { memo, useCallback } from "react";
import icons from "./icons";
import styles from "./styles.module.css";

import { useDispatch, useSelector } from "react-redux";

const DisplayHeader = memo(() => (
  <h1 className={styles.title}>PICK PLAYER 1'S MARK</h1>
));

const DisplayMessage = memo(() => (
  <h2 className={styles.message}>REMEMBER : X GOES FIRST</h2>
));

const DisplayButton = memo(({ mark, handleMark }) => (
  <div className={styles.selectMark}>
    {mark === "x" && (
      <motion.div layoutId="mark" className={styles.selectedXBackground} />
    )}
    {mark === "o" && (
      <motion.div layoutId="mark" className={styles.selectedOBackground} />
    )}
    <button className={styles.xButton} onClick={handleMark} data-id="x">
      <img
        className={styles.icons}
        src={mark === "x" ? icons["xIconSelected"] : icons["xIcon"]}
        alt="x-icon"
        loading="lazy"
      />
    </button>
    <button className={styles.oButton} onClick={handleMark} data-id="o">
      <img
        className={styles.icons}
        src={mark === "o" ? icons["oIconSelected"] : icons["oIcon"]}
        alt="o-icon"
        loading="lazy"
      />
    </button>
  </div>
));

const SelectMark = ({ variants }) => {
  const mark = "x";
//   const dispatch = useDispatch();
  const handleMark = useCallback((e) => {
    const markSelected = e.target.getAttribute("data-id");
   
    //   dispatch({ type: "UPDATE_MARK", mark: markSelected });
  }, []);

  return (
    <motion.section className={styles.container} variants={variants}>
      <DisplayHeader />
      <DisplayButton mark={mark} handleMark={handleMark} />
      <DisplayMessage />
    </motion.section>
  );
};

export default memo(SelectMark);
