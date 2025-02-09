import styles from './PaymentDate.module.css'
import React from 'react'

interface PaymentDateProps {
  date: string;
}

const PaymentDate = ({ date }: PaymentDateProps) => {

  return (
    <p className={styles.date}>{date}</p>
  )
}


export default PaymentDate;
