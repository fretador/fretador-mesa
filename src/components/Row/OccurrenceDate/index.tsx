import styles from './OccurrenceDate.module.css';
import React from 'react'

interface OccurrenceDateProps {
  occurrenceDate: string;
}

const OccurrenceDate = ({ occurrenceDate }: OccurrenceDateProps) => {

  return (
    <p className={styles.occurrenceDateValue}>{occurrenceDate}</p>
  )
}

export default OccurrenceDate