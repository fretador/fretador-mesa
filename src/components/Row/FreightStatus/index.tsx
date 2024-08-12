import React from "react";
import styles from './freightStatus.module.css'

// type FreightStatusOption = "DISPONIVEL" | "APROVAR" | "EM CURSO" | "FINALIZADO";

interface FreightStatusProps {
  freightStatus?: string,
}

const FreightStatus = ({ freightStatus }: FreightStatusProps) => {

  return (
    <p className={styles.freightStatusText}>{freightStatus}</p>
  )
}

export default FreightStatus