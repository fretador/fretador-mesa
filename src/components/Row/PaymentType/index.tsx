import React from "react";
import styles from './PaymentType.module.css';

type PaymentTypeOption = "adiantamento" | "saldo" | "saldo parcial" | "despesas" | "ocorrência"

interface PaymentTypeProps {
  paymentType: PaymentTypeOption
}

const PaymentType = ({paymentType}: PaymentTypeProps) => {

  const statusClassName =
    paymentType === "adiantamento"
      ? styles.advance
      : paymentType === "saldo"
      ? styles.balance
      : paymentType === "saldo parcial"
      ? styles.partialBalance
      : paymentType === "despesas"
      ? styles.expenses
      : paymentType === "ocorrência"
      ? styles.occurrence
      : ''

  return (
    <p className={`${styles.paymentTypeValue} ${statusClassName}`}>{paymentType}</p>
  )
}

export default PaymentType