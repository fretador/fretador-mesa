import React from "react";
import styles from './tradeName.module.css';

interface TradeNameProps {
  tradeName: string;
}

const TradeName = ({ tradeName }: TradeNameProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.tradeName}>{tradeName}</p>
    </div>
  );
};

export default TradeName;