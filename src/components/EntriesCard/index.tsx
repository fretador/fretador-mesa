import React from "react";
import styles from './EntriesCard.module.css'

interface EntriesCardProps {
  driverName: string;
  type: string;
  paymentMethod: string;
  contact: string;
  handleNewPayment: () => void;
}

const typeLabels: { [key: string]: string } = {
  ADVANCE: 'Adiantamento',
  BALANCE: 'Saldo',
  EXPENSES: 'Despesas',
  PARTIAL_BALANCE: 'Saldo Parcial',
};

const EntriesCard: React.FC<EntriesCardProps> = ({
  driverName,
  type,
  paymentMethod,
  contact,
  handleNewPayment,
}) => {

  const typeLabel = typeLabels[type] || 'Não informado';

  return (
    <div className={styles.container} onClick={handleNewPayment}>

      <div className={styles.driverNameContainer}>
        <p>{driverName}</p>
      </div>

      <div className={styles.separator}></div>

      <div className={styles.typeContainer}>
        <p className={styles.title}>Tipo:</p>
        <p className={styles.value}>{typeLabel}</p>
      </div>

      <div className={styles.paymentMethodContainer}>
        <p className={styles.title}>Forma de PG:</p>
        <p className={styles.value}>{paymentMethod}</p>
      </div>

      <div className={styles.contactContainer}>
        <p className={styles.title}>Contato:</p>
        <p className={styles.value}>{contact}</p>
      </div>

    </div>
  );
};

export default EntriesCard;
