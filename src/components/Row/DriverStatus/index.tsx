import React from "react";
import styles from './driverStatus.module.css'

type DriverStatusOption = "aprovado" | "aguardando" | "bloqueado"

interface DriverStatusProps {
  driverStatus: DriverStatusOption
}

const DriverStatus = ({ driverStatus }: DriverStatusProps) => {

  const statusClassName =
    driverStatus === "aprovado"
      ? styles.approved
      : driverStatus === "aguardando"
      ? styles.awaiting
      : driverStatus === "bloqueado"
      ? styles.blocked
      : ''

  return (
    <p className={`${styles.driverStatus} ${statusClassName}`}>{driverStatus}</p>
  )
}

export default DriverStatus