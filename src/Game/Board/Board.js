import React, { memo } from "react";
import styles from "./styles.module.css";
import Tile from "./Tile";
function Board({ variants }) {
  return (
    <div className={styles.container}>
      <Tile row={0} column={0} variants={variants} key="1" />
      <Tile row={0} column={1} variants={variants} key="2" />
      <Tile row={0} column={2} variants={variants} key="3" />
      <Tile row={1} column={0} variants={variants} key="4" />
      <Tile row={1} column={1} variants={variants} key="5" />
      <Tile row={1} column={2} variants={variants} key="6" />
      <Tile row={2} column={0} variants={variants} key="7" />
      <Tile row={2} column={1} variants={variants} key="8" />
      <Tile row={2} column={2} variants={variants} key="9" />
    </div>
  );
}

export default memo(Board);
