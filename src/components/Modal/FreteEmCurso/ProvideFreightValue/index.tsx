import React, { useState } from "react";
import styles from './ProvideFreightValue.module.css'
import Modal from "../..";

interface ProvideFreightValueProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleConfirm: (newTotal: number) => void; // Ajustado para receber o valor total como argumento
  handleCancel: () => void;
}

const ProvideFreightValue = ({ isOpen, onRequestClose, handleConfirm, handleCancel }: ProvideFreightValueProps) => {
  const [freightValue, setFreightValue] = useState("");

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return (parseInt(numericValue, 10) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleFreightValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFreightValue(formatCurrency(event.target.value));
  };

  const handleConfirmClick = () => {
    // Converte string formatada para número
    const numericValue = parseFloat(freightValue.replace(/\./g, '').replace(',', '.'));
    handleConfirm(numericValue);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Informar valor do frete"
      modalDescription="Por favor, insira o valor total do frete:"
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
    </Modal>
  );
};

export default ProvideFreightValue;
