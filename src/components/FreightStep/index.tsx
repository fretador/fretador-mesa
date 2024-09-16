import React from "react";
import styles from './FreightStep.module.css'

const FreightStep = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dateAndHourContainer}>
        <p className={styles.date}>07/06/2024</p>
        <p className={styles.hour}>15:02:23</p>
      </div>

      <div className={styles.verticalSeparator}></div>

      <div className={styles.mainContentContainer}>
        <p>Frete solicitado pelo motorista</p>
      </div>
    </div>
  )
}

export default FreightStep