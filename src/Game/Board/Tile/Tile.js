import React, { memo, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { motion } from "framer-motion";
import marks from "./marks";

const Tile = ({ row, column, variants }) => {
  const markRef = useRef();
  const tileRef = useRef();
  const dispatch = useDispatch();
  const tile = useSelector((state) => state?.board?.tiles[row][column]);
  const winningTiles = useSelector((state) => state?.board?.winningTiles,shallowEqual);
  const turn = useSelector((state) => state?.turn);

  const childVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const handleMark = () => {
    dispatch({ type: "UPDATE_BOARD", row, column, turn });
    dispatch({ type: "CHECK_BOARD" });
    dispatch({ type: "CHECK_DRAW" });
    dispatch({ type: "CHANGE_TURN" });
  };

  /* The `useEffect` hook in the code snippet is responsible for updating the image source of the mark
  displayed on the tile based on the current turn and the value of the tile in the game board state. The useEffect that decides which icon to display when the user hovers over the tile */
  useEffect(() => {
    if (tile !== 0) {
      return;
    }

    markRef.current.src =
      turn === "x" ? marks["hoverIconX"] : marks["hoverIconO"];
  }, [turn, tile]);

  /* The `useEffect` hook in the provided code snippet is responsible for updating the appearance of the
tile based on changes in the `tile` and `turn` variables. Here's a breakdown of what it does: */
  useEffect(() => {
    if (tile === 0) {
      // tile has been reset
      tileRef.current.style.pointerEvents = "";
      tileRef.current.style.backgroundColor = "";
      markRef.current.src =
        turn === "x" ? marks["hoverIconX"] : marks["hoverIconO"];
      markRef.current.style.transform = "";
    } else {
      // tile has been selected
      tileRef.current.style.pointerEvents = "none";
      markRef.current.src = tile === "x" ? marks["iconX"] : marks["iconO"];
      markRef.current.style.transform = "scale(1)";
    }
  }, [tile, turn]);

  return (
    <motion.div
      className={styles.container}
      onClick={handleMark}
      ref={tileRef}
      variants={variants}
      transition={{ when: "beforeChildren" }}
    >
      <motion.img
        className={styles.mark}
        ref={markRef}
        variants={childVariants}
      />
    </motion.div>
  );
};

export default memo(Tile);
