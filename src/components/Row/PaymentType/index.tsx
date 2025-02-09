import React from "react";
import styles from './PaymentType.module.css';

type PaymentTypeOption = "adiantamento" | "saldo" | "saldo parcial" | "despesas" | "ocorrência" | string

interface PaymentTypeProps {
  paymentType: PaymentTypeOption
}

const PaymentType = ({paymentType}: PaymentTypeProps) => {

  const statusClassName =
    paymentType === "Adiantamento"
      ? styles.advance
      : paymentType === "Saldo"
      ? styles.balance
      : paymentType === "Saldo Parcial"
      ? styles.partialBalance
      : paymentType === "Despesas"
      ? styles.expenses
      : paymentType === "Ocorrência"
      ? styles.occurrence
      : ''

  return (
    <p className={`${styles.paymentTypeValue} ${statusClassName}`}>{paymentType}</p>
  )
}

export default PaymentType