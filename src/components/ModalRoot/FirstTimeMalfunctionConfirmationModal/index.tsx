import React from 'react';
import styles from './FirstTimeMalfunctionConfirmationModalProps.module.css';

interface FirstTimeMalfunctionConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  onRequestClose: () => void;
}

const FirstTimeMalfunctionConfirmationModal: React.FC<FirstTimeMalfunctionConfirmationModalProps> = ({ onConfirm, onCancel, onRequestClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Mal funcionamento</h2>
          <button className={styles.closeButton} onClick={onRequestClose}>
            X
          </button>
          <div className={styles.modalContent}>
          <p className={styles.modalMessage}>É a primeira vez que isso ocorre?</p>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={onConfirm}>SIM</button>
          <button className={styles.cancelButton} onClick={onCancel}>NÃO</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeMalfunctionConfirmationModal;
