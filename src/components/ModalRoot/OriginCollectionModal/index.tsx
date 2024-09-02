import React, { useState } from 'react';
import ModalRoot from '../../ModalRoot';
import styles from './OriginCollectionModal.module.css';

interface OriginCollectionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const OriginCollectionModal: React.FC<OriginCollectionModalProps> = ({ isOpen, onRequestClose }) => {
  const [city, setCity] = useState('');
  const [showSenderInfo, setShowSenderInfo] = useState(false);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSenderInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowSenderInfo(e.target.value === 'informar');
  };

  return (
    <ModalRoot isOpen={isOpen} onRequestClose={onRequestClose}>
      <header className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Origem - Local de Coleta</h2>
      </header>
      <div className={styles.modalContent}>
        <label className={styles.label} htmlFor="city">
          Cidade origem
        </label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={handleCityChange}
          className={styles.input}
          placeholder="Digite a cidade"
        />
        <div className={styles.radioGroup}>
          <label>
            <input 
              type="radio" 
              name="remetente" 
              value="naoInformar" 
              className={styles.radio} 
              onChange={handleSenderInfoChange}
            />
            Não informar dados do Remetente
          </label>
          <label>
            <input 
              type="radio" 
              name="remetente" 
              value="informar" 
              className={styles.radio} 
              onChange={handleSenderInfoChange}
            />
            Informar dados do Remetente
          </label>
        </div>

        <div className={`${styles.additionalInfo} ${showSenderInfo ? styles.show : ''}`}>
          <label className={styles.label} htmlFor="cnpj">CNPJ</label>
          <input type="text" id="cnpj" className={styles.input} placeholder="00.000.000/0000-00" />

          <label className={styles.label} htmlFor="razaoSocial">Razão Social</label>
          <input type="text" id="razaoSocial" className={styles.input} placeholder="Digite a razão social" />

          <label className={styles.label} htmlFor="endereco">Endereço</label>
          <input type="text" id="endereco" className={styles.input} placeholder="Digite o endereço" />
        </div>

        <button onClick={onRequestClose} className={styles.confirmButton}>
          Confirmar
        </button>
      </div>
    </ModalRoot>
  );
};

export default OriginCollectionModal;
