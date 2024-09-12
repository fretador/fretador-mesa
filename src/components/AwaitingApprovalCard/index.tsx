import React from "react";
import styles from './AwaitingApprovalCard.module.css'

interface AwaitingApprovalCardProps {
  driverName: string,
  driverStatus: string,
  vehicle: string,
  contact: string,
  handleNewDriver: () => void
}

const AwaitingApprovalCard = ({driverName, driverStatus, vehicle, contact, handleNewDriver}: AwaitingApprovalCardProps) => {

  const formattedContact = `${contact.slice(0, 2)}-${contact.slice(2, 7)}-${contact.slice(7)}`;

  return (
    <div className={styles.container} onClick={handleNewDriver}>

      <div className={styles.driverNameContainer}>
        <p>{driverName}</p>   
      </div>

      <div className={styles.separator}></div>

      <div className={styles.statusContainer}>
        <p className={styles.title}>Status:</p>
        <p className={styles.value}>{driverStatus}</p>
      </div>

      <div className={styles.vehicleContainer}>
        <p className={styles.title}>Veículo:</p>
        <p className={styles.value}>{vehicle}</p>
      </div>

      <div className={styles.contactContainer}>
        <p className={styles.title}>Contato:</p>
        <p className={styles.value}>{formattedContact}</p>
      </div>

    </div>
  )
}

export default AwaitingApprovalCard