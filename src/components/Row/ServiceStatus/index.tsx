import React from "react";
import styles from './ServiceStatus.module.css';

type ServiceStatusOption = "respondido" | "em aberto" | "reaberto" | "finalizado"

interface ServiceStatusProps {
  serviceStatus: ServiceStatusOption
}

const ServiceStatus = ({serviceStatus}: ServiceStatusProps) => {

  const statusClassName =
    serviceStatus === "respondido"
      ? styles.answered
      : serviceStatus === "em aberto"
      ? styles.opened
      : serviceStatus === "reaberto"
      ? styles.reopened
      : serviceStatus === "finalizado"
      ? styles.finished
      : ''

  return (
    <p className={`${styles.serviceStatusValue} ${statusClassName}`}>{serviceStatus}</p>
  )
}

export default ServiceStatus