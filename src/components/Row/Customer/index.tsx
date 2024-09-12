import React from "react";
import styles from "./Customer.module.css";

interface CustomerProps {
  customerName: string;
}

const Customer = ({ customerName }: CustomerProps) => {
  return (
    <p className={styles.customerName}>{customerName}</p>
  );
};

export default Customer;
