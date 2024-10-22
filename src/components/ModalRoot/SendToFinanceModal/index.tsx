import React from "react";
import ModalRoot from "../index";
import styles from "./SendToFinanceModal.module.css";

interface SendToFinanceModalProps {
  content: string | '';
  isOpen: boolean;
  onRequestClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const DriverRegistrationApproval: React.FC<SendToFinanceModalProps> = ({
  content,
  isOpen,
  onRequestClose,
  onApprove,
  onReject,
}) => {
  return (
    <ModalRoot isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={styles.content}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Enviar para Financeiro</h2>
          <button className={styles.closeButton} onClick={onRequestClose}>
            X
          </button>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.modalMessage}>{content}</p>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.confirmButton} onClick={onApprove}>SIM</button>
          <button className={styles.cancelButton} onClick={onReject}>NÃO</button>
        </div>
      </div>
    </ModalRoot>
  );
};

export default DriverRegistrationApproval;
