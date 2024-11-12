import React from "react";
import ModalRoot from "../index";
import styles from "./FirstTimeMalfunctionConfirmationModal.module.css";

interface FirstTimeMalfunctionConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const FirstTimeMalfunctionConfirmationModal: React.FC<FirstTimeMalfunctionConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  onCancel,
}) => {
  return (
    <ModalRoot isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={styles.content}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Mal funcionamento</h2>
          <button className={styles.closeButton} onClick={onRequestClose}>
            x
          </button>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.modalMessage}>É a primeira vez que isso ocorre?</p>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={onConfirm}>SIM</button>
          <button className={styles.cancelButton} onClick={onCancel}>NÃO</button>
        </div>
      </div>
    </ModalRoot>
  );
};

export default FirstTimeMalfunctionConfirmationModal;
