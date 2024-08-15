import React from "react";
import styles from './OcurrenceType.module.css';

interface OccurrenceTypeProps {
  occurrenceType: string;
}

const OccurrenceType = ({ occurrenceType }: OccurrenceTypeProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.occurrenceType}>{occurrenceType}</p>
    </div>
  );
};

export default OccurrenceType;