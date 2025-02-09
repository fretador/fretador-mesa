import React from "react";
import styles from './DriverStatus.module.css';

type DriverStatusOption = "APPROVED" | "PENDING" | "DENIED" | "WAITING";

interface DriverStatusProps {
  driverStatus: DriverStatusOption;
}

const statusLabels: { [key in DriverStatusOption]: string } = {
  APPROVED: "Aprovado",
  PENDING: "Pendente",
  DENIED: "Bloqueado",
  WAITING: "Aguardando",
};

const DriverStatus = ({ driverStatus }: DriverStatusProps) => {
  const statusClassName =
    driverStatus === "APPROVED"
      ? styles.approved
      : driverStatus === "PENDING"
        ? styles.awaiting
        : driverStatus === "DENIED"
          ? styles.blocked
          : driverStatus === "WAITING"
            ? styles.awaiting
            : '';

  return (
    <p className={`${styles.driverStatus} ${statusClassName}`}>
      {statusLabels[driverStatus]}
    </p>
  );
};

export default DriverStatus;