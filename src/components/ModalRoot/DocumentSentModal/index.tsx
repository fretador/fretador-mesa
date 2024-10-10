import React from "react";
import styles from "./DocumentSentModal.module.css";
import { CloseIcon } from "@/utils/icons";
import Botao from "@/components/Botao";
interface DocumentSentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const DocumentSentModal: React.FC<DocumentSentModalProps> = ({
  isOpen,
  onClose,
  title = "Documentos enviados",
  message = "Seus documentos foram enviados com sucesso.",
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <p>{message}</p>
        <div className={styles.buttonsContainer}>
          <Botao onClick={onClose} text="OK" type="button" />
        </div>
      </div>
    </div>
  );
};

export default DocumentSentModal;
