import React from "react";
import styles from "./Value.module.css";

interface ValueProps {
  value: number;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const Value = ({ value }: ValueProps) => {
  return (
    <p className={styles.value}>{formatCurrency(value)}</p>
  );
};

export default Value;
