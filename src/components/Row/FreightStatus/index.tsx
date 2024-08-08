import React, { useEffect } from "react";
import styles from './freightStatus.module.css'

type FreightStatusOption = "DISPONÍVEL" | "APROVAR" | "EM CURSO" | "FINALIZADO";

interface FreightStatusProps {
  freightStatus: FreightStatusOption,
}

const FreightStatus = ({ freightStatus }: FreightStatusProps) => {

  return (
    <p className={styles.freightStatusText}>{freightStatus}</p>
  )
}

export default FreightStatus