import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import restartIcon from "./icons";
import styles from "./styles.module.css";

const DialogBoxOpenButton = ({ handleOpen }) => {
  return (
    <button type="button" onClick={handleOpen} className={styles.container}>
      <img
        className={styles.icon}
        src={restartIcon}
        alt="restart-icon"
        loading="lazy"
      />
    </button>
  );
};

const OpenDialogBox = memo(DialogBoxOpenButton);

const DialogBox = ({ open, handleOpen, handleRestart }) => {
  const overlayRef = useRef();
  const dialogRef = useRef();
  const timerRef = useRef();

  useEffect(() => {
    if (open) {
      overlayRef.current.style.display = "flex";
      timerRef.current = setTimeout(() => {
        overlayRef.current.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        dialogRef.current.style.transform = "scaleY(1)";
      }, 10);
    } else {
      overlayRef.current.style.backgroundColor = "";
      dialogRef.current.style.transform = "";
      timerRef.current = setTimeout(() => {
        overlayRef.current.style.display = "";
      }, 200);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [open]);

  return (
    <div className={styles.overlay} ref={overlayRef}>
      <dialog open={open} className={styles.dialog} ref={dialogRef}>
        <h1 className={styles.title}>Restart Game ?</h1>
        <button type="button" className={styles.cancel} onClick={handleOpen}>
          No, Cancel
        </button>
        <button
          type="button"
          className={styles.restart}
          onClick={handleRestart}
        >
          Yes, Restart
        </button>
      </dialog>
    </div>
  );
};

const DisplayDialogBox = memo(DialogBox);
const Restart = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleRestart = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <OpenDialogBox handleOpen={handleOpen} />
      <DisplayDialogBox
        open={open}
        handleOpen={handleOpen}
        handleRestart={handleRestart}
      />
    </>
  );
};

export default memo(Restart);
