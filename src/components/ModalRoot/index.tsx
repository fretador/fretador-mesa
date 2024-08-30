// src/components/ModalRoot/index.tsx
import React from 'react';
import Modal from 'react-modal';
import styles from './ModalRoot.module.css'; // Ajuste o caminho conforme necessário

interface ModalRootProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const ModalRoot: React.FC<ModalRootProps> = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      overlayClassName={styles.overlay}
      className={styles.content}
    >
      <div className={styles.modalContent}>
        {children}
      </div>
      
      <button onClick={onRequestClose} className={styles.closeButton}>
        OK
      </button>
    </Modal>
  );
};

export default ModalRoot;
