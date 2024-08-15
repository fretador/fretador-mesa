import React from "react";
import styles from './ocurrenceType.module.css';

interface OccurrenceTypeProps {
  occurrenceType: string;
}

const OccurrenceType = ({ occurrenceType }: OccurrenceTypeProps) => {
  return (
    <p className={styles.occurrenceType}>{occurrenceType}</p>
  );
};

export default OccurrenceType;