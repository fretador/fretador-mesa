import React, { useState } from 'react';
import styles from './OpenTicketModal.module.css';

interface OpenTicketModalProps {
  onAdvance: () => void;
  onRequestClose: () => void;
  isOpen: boolean; 
}

const OpenTicketModal: React.FC<OpenTicketModalProps> = ({ onAdvance, onRequestClose, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleSelectFocus = (event: React.FocusEvent<HTMLSelectElement>) => {
    const selectElement = event.target;
    if (selectElement.value === '') {
      selectElement.value = '';
    }
  };

  const handleSelectBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    const selectElement = event.target;
    if (!selectedOption) {
      selectElement.value = '';
    }
  };

  const handleAdvanceClick = () => {
    if (selectedOption) {
      onAdvance();
    } else {
      alert('Por favor, selecione uma opção de ticket.');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Abrir Ticket</h2>
          <button className={styles.closeButton} onClick={onRequestClose}>
            x
          </button>
        </div>
        <p className={styles.modalMessage}>Selecione a opção de ticket que deseja abrir:</p>
        <select
          className={styles.select}
          value={selectedOption}
          onChange={handleSelectChange}
          onFocus={handleSelectFocus}
          onBlur={handleSelectBlur}
        >
          <option value="" disabled hidden>Selecione</option>
          <option value="mauFuncionamento">Mau Funcionamento</option>
          <option value="duvidas">Dúvidas</option>
        </select>
        <button className={styles.button} onClick={handleAdvanceClick}>
          Avançar
        </button>
      </div>
    </div>
  );
};

export default OpenTicketModal;
