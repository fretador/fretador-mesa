import React from "react";
import styles from './OccurrenceStatus.module.css';

type OccurrenceStatusOption = "respondido" | "em aberto" | "reaberto" | "finalizado"

interface OccurrenceStatusProps {
  occurrenceStatus: OccurrenceStatusOption | string
}

const OccurrenceStatus = ({occurrenceStatus}: OccurrenceStatusProps) => {

  const statusClassName =
    occurrenceStatus === "respondido"
      ? styles.answered
      : occurrenceStatus === "em aberto"
      ? styles.opened
      : occurrenceStatus === "reaberto"
      ? styles.reopened
      : occurrenceStatus === "finalizado"
      ? styles.finished
      : ''

  return (
    <p className={`${styles.occurrenceStatusValue} ${statusClassName}`}>{occurrenceStatus}</p>
  )
}

export default OccurrenceStatus