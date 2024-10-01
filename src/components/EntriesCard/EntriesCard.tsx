import React from "react";
import styles from './EntriesCard.module.css'

interface EntriesCardProps {
  driverName: string,
  type: string,
  paymentMethod: string,
  contact: string,
  handleNewPayment: () => void
}

const EntriesCard = ({driverName, type, paymentMethod, contact, handleNewPayment}: EntriesCardProps) => {

  const formattedContact = `${contact.slice(0, 2)}-${contact.slice(2, 7)}-${contact.slice(7)}`;

  return (
    <div className={styles.container} onClick={handleNewPayment}>

      <div className={styles.driverNameContainer}>
        <p>{driverName}</p>   
      </div>

      <div className={styles.separator}></div>

      <div className={styles.typeContainer}>
        <p className={styles.title}>Tipo:</p>
        <p className={styles.value}>{type}</p>
      </div>

      <div className={styles.paymentMethodContainer}>
        <p className={styles.title}>Forma de PG:</p>
        <p className={styles.value}>{paymentMethod}</p>
      </div>

      <div className={styles.contactContainer}>
        <p className={styles.title}>Contato:</p>
        <p className={styles.value}>{formattedContact}</p>
      </div>

    </div>
  )
}

export default EntriesCard