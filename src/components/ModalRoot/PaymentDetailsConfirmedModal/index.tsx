import React from "react";
import ReactModal from "react-modal";
import styles from "./PaymentDetailsConfirmedModal.module.css";

interface PaymentDetailsConfirmedModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const PaymentDetailsConfirmedModal: React.FC<PaymentDetailsConfirmedModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.content}
      overlayClassName={styles.overlay}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Pagamento Informado</h2>
        <button className={styles.closeButton} onClick={onRequestClose}>
          x
        </button>
      </div>
      <div className={styles.modalContent}>
        <p className={styles.modalMessage}>
        Dados de pagamento informados com sucesso!</p>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.confirmButton} onClick={onRequestClose}>
          OK
        </button>
      </div>
    </ReactModal>
  );
};

export default PaymentDetailsConfirmedModal;
