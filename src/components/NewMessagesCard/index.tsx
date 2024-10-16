import React from "react";
import styles from './NewMessageCard.module.css'

interface NewMessagesCardProps {
  driverName: string,
  serviceNumber: string,
  subject: string,
  date: string,
  handleNewMessage: () => void
}

const NewMessagesCard = ({driverName, serviceNumber, subject, date, handleNewMessage}: NewMessagesCardProps) => {
  return (
    <div className={styles.container} onClick={handleNewMessage}>

      <div className={styles.driverNameContainer}>
        <p>{driverName}</p>   
      </div>

      <div className={styles.separator}></div>

      <div className={styles.serviceNumberContainer}>
        <p className={styles.title}>Atendimento:</p>
        <p className={styles.value}>{serviceNumber}</p>
      </div>

      <div className={styles.subjectContainer}>
        <p className={styles.title}>Assunto:</p>
        <p className={styles.value}>{subject}</p>
      </div>

      <div className={styles.dateContainer}>
        <p className={styles.title}>Data:</p>
        <p className={styles.value}>{date}</p>
      </div>

  </div>
  )
}

export default NewMessagesCard