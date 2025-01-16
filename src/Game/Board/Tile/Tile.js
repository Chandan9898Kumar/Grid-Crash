import { motion } from "framer-motion";
import React, { memo, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import marks from "./marks";
import styles from "./styles.module.css";

const Tile = ({ row, column, variants }) => {
  const markRef = useRef();
  const tileRef = useRef();
  const dispatch = useDispatch();
  const tile = useSelector((state) => state?.board?.tiles[row][column]);
  const winningTiles = useSelector(
    (state) => state?.board?.winningTiles,
    shallowEqual
  );
  const turn = useSelector((state) => state?.turn);
  console.log(tile, "tile >>>>>>>>>>>>>>>>>>>>>>");

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

    markRef.current.src = turn === "x" ? marks["hoverIconX"] : marks["hoverIconO"];
  }, [turn, tile]);

  /* The `useEffect` hook in the provided code snippet is responsible for updating the appearance of the
tile based on changes in the `tile` and `turn` variables. Here's a breakdown of what it does: */
  useEffect(() => {
    if (tile === 0) {
      //tile has been reset
      tileRef.current.style.pointerEvents = "";
      markRef.current.src = turn === "x" ? marks["hoverIconX"] : marks["hoverIconO"];
      markRef.current.style.transform = "";
      tileRef.current.style.backgroundColor = "";
    } else {
      //tile has been selected
      tileRef.current.style.pointerEvents = "none";
      markRef.current.src = tile === "x" ? marks["iconX"] : marks["iconO"];
      markRef.current.style.transform = "scale(1)";
    }
  }, [tile, turn]);

  /**
   * This function updates the background color and image of a tile when a player (X or O) wins the game of Tic-Tac-Toe.
   * It checks if the current tile is part of the winning combination (rows, columns, or diagonals) and applies the appropriate styles once a player has won.
   */
  useEffect(() => {
    if (!winningTiles?.length) return;
    winningTiles.forEach((winningTile) => {
      if (winningTile[0] === row && winningTile[1] === column) {
        tileRef.current.style.backgroundColor =
          tile === "x" ? "#31C3BD" : "#F2B137";
        markRef.current.src = marks[`winning${tile?.toUpperCase()}`];
      }
    });
  }, [winningTiles, row, column, tile]);

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
