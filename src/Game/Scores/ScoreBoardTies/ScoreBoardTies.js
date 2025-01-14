import React, { useEffect ,memo} from "react";
// import { useSelector, useDispatch} from 'react-redux';
import styles from "./styles.module.css";
import { motion } from "framer-motion";

function ScoreBoardTies({ variants }) {
  const ties = "";
  const winner = "";
  // const dispatch = useDispatch();

  // useEffect(() => {
  //     if(winner === 'draw')
  //         dispatch({type: 'UPDATE_TIES'});
  // }, [winner])

  return (
    <motion.section className={styles.container} variants={variants}>
      <h1 className={styles.title}>TIES</h1>
      <p className={styles.score}>{ties}</p>
    </motion.section>
  );
}

export default memo(ScoreBoardTies);
