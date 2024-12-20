import React, { useState } from "react";
import styles from './RequestDocuments.module.css';
import Modal from "../..";

interface RequestDocumentsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleConfirm: (reason: string) => void;
  handleCancel: () => void;
}

const RequestDocuments = ({ isOpen, onRequestClose, handleConfirm, handleCancel }: RequestDocumentsProps) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value);
    setError("");
  };

  const handleConfirmClick = () => {
    if (!reason.trim()) {
      setError("O motivo não pode estar vazio.");
    } else {
      handleConfirm(reason);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Solicitar documentos"
      modalDescription="Qual documento gostaria de solicitar ao motorista?"
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={handleConfirmClick}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={handleCancel}
      childrenClassName={styles.children}
    >
      <div className={styles.inputContainer}>
        <textarea
          name="requestDocuments"
          id="requestDocuments"
          placeholder="Escreva aqui..."
          value={reason}
          onChange={handleTextareaChange}
        />
      </div>
      <div className={styles.errorContainer}>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </Modal>
  );
};

export default RequestDocuments;
