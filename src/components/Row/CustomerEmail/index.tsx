import React from "react";
import styles from './customerEmail.module.css';

interface CustomerEmailProps {
  email: string;
}

const CustomerEmail = ({ email }: CustomerEmailProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.email}>{email}</p>
    </div>
  );
};

export default CustomerEmail;