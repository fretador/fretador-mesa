import React from "react";
import styles from './OccurrenceStatus.module.css';

type OccurrenceStatusOption = "aberto" | "em tratamento" | "encerrado"

interface OccurrenceStatusProps {
  occurrenceStatus: OccurrenceStatusOption
}

const OccurrenceStatus = ({occurrenceStatus}: OccurrenceStatusProps) => {

  const statusClassName =
    occurrenceStatus === "aberto"
      ? styles.open
      : occurrenceStatus === "em tratamento"
      ? styles.treatment
      : occurrenceStatus === "encerrado"
      ? styles.finished
      : ''

  return (
    <p className={`${styles.occurrenceStatusValue} ${statusClassName}`}>{occurrenceStatus}</p>
  )
}

export default OccurrenceStatus