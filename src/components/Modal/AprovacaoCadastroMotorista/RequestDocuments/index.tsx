import React, { useState } from "react";
import styles from './RequestDocuments.module.css';
import Modal from "../..";

interface RequestDocumentsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleConfirm: (document: string, reason: string) => void;
  handleCancel: () => void;
}

const RequestDocuments = ({ isOpen, onRequestClose, handleConfirm, handleCancel }: RequestDocumentsProps) => {
  const [document, setDocument] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const resetForm = () => {
    setDocument("");
    setReason("");
    setError("");
  };

  const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocument(event.target.value);
    setError("");
  };

  const handleReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value);
    setError("");
  };

  const handleConfirmClick = () => {
    if (!document.trim() || !reason.trim()) {
      setError("Ambos os campos devem ser preenchidos.");
    } else {
      handleConfirm(document, reason);
      resetForm();
    }
  };

  const handleCancelClick = () => {
    handleCancel();
    resetForm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Solicitar documento"
      modalDescription="Qual documento você quer solicitar?"
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={handleConfirmClick}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={handleCancelClick}
      childrenClassName={styles.children}
    >
      <div className={styles.inputContainer}>
        <input
          type="text"
          name="document"
          id="document"
          placeholder="Documento"
          value={document}
          onChange={handleDocumentChange}
          className={styles.input}
        />
        <p>Motivo</p>
        <textarea
          name="reason"
          id="reason"
          placeholder="Escreva o motivo..."
          value={reason}
          onChange={handleReasonChange}
          className={styles.textarea}
        />
      </div>
      <div className={styles.errorContainer}>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </Modal>
  );
};

export default RequestDocuments;
