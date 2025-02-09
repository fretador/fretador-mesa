import React, { useState } from "react";
import styles from './ProvidePaymentDetails.module.css'
import Modal from "../..";

interface ProvidePaymentDetailsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleConfirm: (newTotal: number, newAdvance: number, newBalance: number) => void; // Ajustado para receber os 3 valores
  handleCancel: () => void;
}

const ProvidePaymentDetails = ({ isOpen, onRequestClose, handleConfirm, handleCancel }: ProvidePaymentDetailsProps) => {
  const [freightValue, setFreightValue] = useState("");
  const [freightAdvance, setFreightAdvance] = useState("");
  const [freightBalance, setFreightBalance] = useState("");

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return (parseInt(numericValue, 10) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleFreightAdvanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFreightAdvance(formatCurrency(event.target.value));
  };

  const handleFreightValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFreightValue(formatCurrency(event.target.value));
  };

  const handleFreightBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFreightBalance(formatCurrency(event.target.value));
  };

  const handleConfirmClick = () => {
    const total = parseFloat(freightValue.replace(/\./g, '').replace(',', '.'));
    const advance = parseFloat(freightAdvance.replace(/\./g, '').replace(',', '.'));
    const balance = parseFloat(freightBalance.replace(/\./g, '').replace(',', '.'));

    handleConfirm(total, advance, balance);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Informar dados de pagamento"
      modalDescription="Por favor, insira o valor do frete do motorista, valor de adiantamento e saldo:"
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={handleConfirmClick}
      buttonTwoTitle="Agora não"
      buttonTwoAction={handleCancel}
      childrenClassName={styles.children}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="input">Valor do frete total</label>
        <div className={styles.inputWrapper}>
          <span className={styles.prefix}>R$</span>
          <input
            type="text"
            name="freightValue"
            value={freightValue}
            onChange={handleFreightValueChange}
          />
        </div>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="input">Valor do adiantamento</label>
        <div className={styles.inputWrapper}>
          <span className={styles.prefix}>R$</span>
          <input
            type="text"
            name="freightAdvance"
            value={freightAdvance}
            onChange={handleFreightAdvanceChange}
          />
        </div>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="input">Valor do saldo</label>
        <div className={styles.inputWrapper}>
          <span className={styles.prefix}>R$</span>
          <input
            type="text"
            name="freightBalance"
            value={freightBalance}
            onChange={handleFreightBalanceChange}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProvidePaymentDetails;
