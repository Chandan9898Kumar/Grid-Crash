import React, { memo, useEffect, useRef } from "react";
import styles from "./styles.module.css";
// import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import { motion } from "framer-motion";
// import marks from "./marks";

const Tile = ({ row, column, variants }) => {
  const markRef = useRef();
  const tileRef = useRef();

  const childVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const handleMark = () => {
    // dispatch({type: 'UPDATE_BOARD', row, column, turn});
    // dispatch({type: 'CHECK_BOARD'});
    // dispatch({type: 'CHECK_DRAW'});
    // dispatch({type: 'CHANGE_TURN'});
  };

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
