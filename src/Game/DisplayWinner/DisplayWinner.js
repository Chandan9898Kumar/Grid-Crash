import React, { memo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import icons from "./icons";
import styles from "./styles.module.css";
const DisplayWinner = () => {
  const navigate = useNavigate();
  const overlayRef = useRef();
  const dialogRef = useRef();
  const timerRef = useRef();
  const winner = "x";

  const handleQuit = () => {
    navigate("/");
  };

  const handleNextRound = () => {};

  useEffect(() => {
    if (winner) {
      overlayRef.current.style.display = "flex";
      timerRef.current = setTimeout(() => {
        if (!overlayRef.current || !dialogRef.current) return;
        overlayRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
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
            <h2 className={styles.title_one}>{"Winner Display"}</h2>
            <h1
              className={styles.title_two}
              style={{ color: winner === "x" ? "#31c3bd" : "#f2b137" }}
            >
              <img
                className={styles.icon}
                src={icons[`icon${winner.toUpperCase()}`]}
                alt="winner-icon"
                loading="lazy"
              />
              Takes the Round
            </h1>
          </>
        )}

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
      </dialog>
    </div>
  );
};

export default memo(DisplayWinner);
