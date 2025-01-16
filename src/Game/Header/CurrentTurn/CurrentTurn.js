import React, { memo } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import icons from "./icons";

const CurrentTurn = () => {
  const turn = useSelector((state) => state?.turn);

  return (
    <div className={styles.container}>
      <img
        className={styles.icons}
        src={icons[`icon${turn?.toUpperCase()}Turn`]}
        alt="player-turn"
        loading="lazy"
      />
      TURN
    </div>
  );
};

export default memo(CurrentTurn);
