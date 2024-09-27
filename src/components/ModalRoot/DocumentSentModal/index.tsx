import React from "react";
import styles from "./DocumentSentModal.module.css";

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
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default DocumentSentModal;
