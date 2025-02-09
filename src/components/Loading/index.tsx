import React from 'react';
import styles from './Loading.module.css';
import { FretadorIcon } from '@/utils/icons';

const Loading = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.circle}>
        <div className={styles.innerCircle}></div>
      </div>
      
      <div>
        <FretadorIcon />
      </div>
    </div>
  );
};

export default Loading;
