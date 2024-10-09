import React from "react";
import ModalRoot from "../index";
import styles from "./DriverRegistrationApproval.module.css";

interface DriverRegistrationApprovalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onApprove: () => void;
  onReject: () => void;
}

const DriverRegistrationApproval: React.FC<DriverRegistrationApprovalProps> = ({
  isOpen,
  onRequestClose,
  onApprove,
  onReject,
}) => {
  return (
    <ModalRoot isOpen={isOpen} onRequestClose={onRequestClose}>
                     <div className={styles.content}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Aprovar Cadastro</h2>
          <button className={styles.closeButton} onClick={onRequestClose}>
            X
          </button>
        </div>
        <div className={styles.modalContent}>
          <p className={styles.modalMessage}>Gostaria de finalizar e aprovar este cadastro?</p>
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
