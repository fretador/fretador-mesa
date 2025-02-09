import React, { useState, useEffect } from 'react';
import styles from './SmallLoading.module.css';

const SmallLoading = () => {
  const [allVisible, setAllVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAllVisible(false);
      setTimeout(() => setAllVisible(true), 100);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.spinnerContainer}>
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className={`${styles.bar} ${!allVisible ? styles.hidden : ''}`}
          style={{ animationDelay: `${index * 0.2}s` }}
        ></div>
      ))}
    </div>
  );
};

export default SmallLoading;
