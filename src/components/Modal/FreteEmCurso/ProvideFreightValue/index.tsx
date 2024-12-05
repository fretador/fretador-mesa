import React, { useState } from "react";
import styles from './ProvideFreightValue.module.css'
import Modal from "../..";

interface ProvideFreightValueProps {
  isOpen: boolean,
  onRequestClose: () => void,
  handleConfirm: () => void,
  handleCancel: () => void
}

const ProvideFreightValue = ({isOpen, onRequestClose, handleConfirm, handleCancel}: ProvideFreightValueProps) => {

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Informar valor do frete"
      modalDescription="Por favor, insira o valor do frete do motorista, valor de adiantamento e saldo:"
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={handleConfirm}
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
  )
}

export default ProvideFreightValue