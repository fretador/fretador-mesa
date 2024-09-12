import React from "react";
import styles from './TradeName.module.css';

interface TradeNameProps {
  tradeName: string;
}

const TradeName = ({ tradeName }: TradeNameProps) => {
  return (
    <p className={styles.tradeName}>{tradeName}</p>
  );
};

export default TradeName;