import React from "react";
import styles from './PendingOccurrencesCard.module.css'

interface PendingOccurrencesCardProps {
  driverName: string,
  freightCode: string,
  occurrenceType: string,
  date: string,
  handleNewOccurrence: () => void
}

const PendingOccurrencesCard = ({ driverName, freightCode, occurrenceType, date, handleNewOccurrence}: PendingOccurrencesCardProps) => {
  return (
    <div className={styles.container} onClick={handleNewOccurrence}>

      <div className={styles.driverNameContainer}>
        <p>{driverName}</p>   
      </div>

      <div className={styles.separator}></div>

      <div className={styles.freightCodeContainer}>
        <p className={styles.title}>N. Frete:</p>
        <p className={styles.value}>{freightCode}</p>
      </div>

      <div className={styles.occurrenceTypeContainer}>
        <p className={styles.title}>Tipo:</p>
        <p className={styles.value}>{occurrenceType}</p>
      </div>

      <div className={styles.dateContainer}>
        <p className={styles.title}>Data:</p>
        <p className={styles.value}>{date}</p>
      </div>

  </div>
  )
}

export default PendingOccurrencesCard