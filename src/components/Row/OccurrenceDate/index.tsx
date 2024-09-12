import styles from './OccurrenceDate.module.css';
import React from 'react'

interface OccurrenceDateProps {
  occurrenceDate: Date;
}

const OccurrenceDate = ({ occurrenceDate }: OccurrenceDateProps) => {

  const formattedDate = occurrenceDate.toLocaleDateString();

  return (
    <p className={styles.occurrenceDateValue}>{formattedDate}</p>
  )
}

export default OccurrenceDate