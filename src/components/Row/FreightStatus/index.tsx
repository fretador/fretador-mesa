import React from "react";
import styles from "./FreightStatus.module.css";

interface FreightStatusProps {
  freightStatus?: string;
}

const translateStatus = (status: string) => {
  switch (status) {
    case "AVAILABLE":
      return "DISPONIVEL";
    case "APPROVED":
      return "APROVAR";
    case "IN_PROGRESS":
      return "EM CURSO";
    case "FINISHED":
      return "FINALIZADO";
    case "WAITING":
      return "AGUARDANDO";
    default:
      return status;
  }
};

const FreightStatus = ({ freightStatus = "" }: FreightStatusProps) => {
  const translatedStatus = translateStatus(freightStatus);

  return (
    <>
      <p className={styles.freightStatusText}>{translatedStatus}</p>
    </>
  );
};

export default FreightStatus;
