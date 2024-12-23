import React, { useState } from "react";
import styles from './UnblockDriver.module.css';
import Modal from "../..";

interface UnblockDriverProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleConfirm: (reason: string) => void;
  handleCancel: () => void;
}

const UnblockDriver = ({ isOpen, onRequestClose, handleConfirm, handleCancel }: UnblockDriverProps) => {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const resetForm = () => {
    setReason("");
    setError("");
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value);
    setError("");
  };

  const handleConfirmClick = () => {
    if (!reason.trim()) {
      setError("O motivo não pode estar vazio.");
    } else {
      handleConfirm(reason);
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
      modalTitle="Desbloquear motorista"
      modalDescription="Descreva em poucas palavras o motivo para desbloquear o motorista:"
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={handleConfirmClick}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={handleCancelClick}
      childrenClassName={styles.children}
    >
      <div className={styles.inputContainer}>
        <textarea
          name="unblockDriver"
          id="unblockDriver"
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

export default UnblockDriver;
