import React from "react";
import styles from './paymentMethod.module.css'

type PaymentMethodOption = "adiantamento" | "saldo" | "saldo parcial" | "despesas"

interface PaymentMethodProps {
  paymentMethod: PaymentMethodOption
}

const PaymentMethod = ({paymentMethod}: PaymentMethodProps) => {

  const paymentClassName =
     paymentMethod === "adiantamento"
      ? styles.advance
      : paymentMethod === "saldo"
      ? styles.balance
      : paymentMethod === "saldo parcial"
      ? styles.partialBalance
      : paymentMethod === "despesas"
      ? styles.expenses
      : ''

  return (
    <p className={`${styles.paymentMethodValue} ${paymentClassName}`}>{paymentMethod}</p>
  )
}

export default PaymentMethod