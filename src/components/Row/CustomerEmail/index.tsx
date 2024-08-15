import React from "react";
import styles from './CustomerEmail.module.css';

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