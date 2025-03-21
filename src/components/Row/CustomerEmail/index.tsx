import React from "react";
import styles from './CustomerEmail.module.css';

interface CustomerEmailProps {
  email: string;
}

const CustomerEmail = ({ email }: CustomerEmailProps) => {
  return (
    <p className={styles.email}>{email}</p>
  );
};

export default CustomerEmail;