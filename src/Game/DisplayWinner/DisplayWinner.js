import { motion } from "framer-motion";
import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import icons from "./icons";
import styles from "./styles.module.css";
const DisplayWinner = ({ variants }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const overlayRef = useRef();
  const dialogRef = useRef();
  const timerRef = useRef();
  const winner = useSelector((state) => state?.board?.winner);
  const menuOptions = useSelector((state) => state?.menuOptions);

  const displayWinner = () => {
    const playerOneMark = menuOptions.playerOneMark;
    const against = menuOptions.playerAgainst;

    if (playerOneMark === winner && against === "player")
      return "Player 1 wins!";
    else if (playerOneMark !== winner && against === "player")
      return "Player 2 wins!";
    else if (playerOneMark === winner && against === "cpu") return "You Won!";
    else return "Oh No, you lost...";
  };

  const handleQuit = () => {
    dispatch({ type: "RESTART" });
    navigate("/");
  };

  const handleNextRound = () => {
    dispatch({ type: "NEW_GAME" });
  };

  useEffect(() => {
    if (winner) {
      overlayRef.current.style.display = "flex";
      timerRef.current = setTimeout(() => {
        if (!overlayRef.current || !dialogRef.current) return;
        overlayRef.current.style.backgroundColor = "";
        dialogRef.current.style.transform = "scaleY(1)";
      }, 10);
    } else {
      dialogRef.current.style.transform = "";
      overlayRef.current.style.backgroundColor = "";
      timerRef.current = setTimeout(() => {
        if (!overlayRef.current) return;
        overlayRef.current.style.display = "";
      }, 200);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [winner]);

  return (
    <div className={styles.overlay} ref={overlayRef}>
      <dialog open={true} ref={dialogRef} className={styles.dialog}>
        {winner === "draw" ? (
          <h1 className={styles.title}>ROUND TIED</h1>
        ) : (
          <>
            <h2 className={styles.title_one}>{displayWinner()}</h2>
            <h1
              className={styles.title_two}
              style={{ color: winner === "x" ? "#31c3bd" : "#f2b137" }}
            >
              <img
                className={styles.icon}
                src={icons[`icon${winner?.toUpperCase()}`]}
                alt="winner-icon"
                loading="lazy"
              />
              Takes the Round
            </h1>
          </>
        )}
        <motion.header variants={variants}>
          <div className={styles.buttons}>
            <button type="button" className={styles.quit} onClick={handleQuit}>
              Quit
            </button>
            <button
              type="button"
              className={styles.next}
              onClick={handleNextRound}
            >
              Next Round
            </button>
          </div>
        </motion.header>
      </dialog>
    </div>
  );
};

export default memo(DisplayWinner);
