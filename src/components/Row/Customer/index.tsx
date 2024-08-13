import React from "react";
import styles from './customer.module.css';

interface CustomerProps {
  customerName: string;
}

const Customer = ({ customerName }: CustomerProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.customerName}>{customerName}</p>
    </div>
  );
};

export default Customer;