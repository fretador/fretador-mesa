import styles from './PaymentDate.module.css'
import React from 'react'

interface PaymentDateProps {
  date: Date;
}

const PaymentDate = ({ date }: PaymentDateProps) => {

  const formattedDate = date.toLocaleDateString();

  return (
    <div className={styles.container}>
      <p className={styles.date}>{formattedDate}</p>
    </div>
  )
}


export default PaymentDate;
