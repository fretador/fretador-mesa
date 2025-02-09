import React, { useState } from 'react';
import styles from './ValueInputModal.module.css';

interface ValueInputModalProps {
  onClose: () => void;
  onConfirm: (value: string) => void;
}

const ValueInputModal: React.FC<ValueInputModalProps> = ({ onClose, onConfirm }) => {
  const [value, setValue] = useState('');

  const handleConfirm = () => {
    onConfirm(value);
    onClose();
  };

  const formatValue = (inputValue: string): string => {
    // Remove non-numeric characters
    let numericValue = inputValue.replace(/\D/g, '');

    // Add thousands separator (.) and decimal separator (,)
    if (numericValue.length > 2) {
      numericValue = numericValue.replace(/(\d)(?=(\d{3})+,)/g, '$1.');
    }

    // Add decimal separator (,) if there are more than 2 digits after the decimal point
    if (numericValue.length > 2) {
      numericValue = numericValue.replace(/(\d{2})$/, ',$1');
    }

    return numericValue;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatValue(inputValue);
    setValue(formattedValue);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Enviar para Financeiro</h2>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.modalMessage}>Digite o valor a ser pago:</p>
          <div className={styles.inputContainer}>
            <input
              type="text"
              className={styles.inputText}
              value={value}
              onChange={handleInputChange}
              placeholder="R$"
            />
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.confirmButton} onClick={handleConfirm}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValueInputModal;
