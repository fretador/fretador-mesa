import styles from './PaymentDate.module.css'
import React from 'react'

interface PaymentDateProps {
  date: Date;
}

const PaymentDate = ({ date }: PaymentDateProps) => {

  const formattedDate = date.toLocaleDateString();

  return (
    <p className={styles.date}>{formattedDate}</p>
  )
}


export default PaymentDate;
