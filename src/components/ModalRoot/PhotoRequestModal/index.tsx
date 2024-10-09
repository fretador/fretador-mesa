import React from "react";
import ReactModal from "react-modal";
import styles from "./PhotoRequestModal.module.css";

interface PhotoRequestModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const PhotoRequestModal: React.FC<PhotoRequestModalProps> = ({
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
        <h2 className={styles.modalTitle}>Novas Fotos Solicitadas</h2>
        <button className={styles.closeButton} onClick={onRequestClose}>
          X
        </button>
      </div>
      <div className={styles.modalContent}>
        <p className={styles.modalMessage}>
          Novas fotos solicitadas, por favor aguarde o retorno do motorista.
        </p>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.confirmButton} onClick={onRequestClose}>
          OK
        </button>
      </div>
    </ReactModal>
  );
};

export default PhotoRequestModal;
