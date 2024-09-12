import React from 'react';
import Modal from 'react-modal';
import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  message,
  onConfirm,
  onCancel
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      overlayClassName={styles.overlay}
      className={styles.content}
    >
      <header className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>{title}</h2>
      </header>
      <div className={styles.modalContent}>
        <p className={styles.modalMessage}>{message}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            SIM
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            NÃO
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
