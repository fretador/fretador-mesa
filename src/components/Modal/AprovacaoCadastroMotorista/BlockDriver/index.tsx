import React, { useState } from "react";
import styles from './BlockDriver.module.css';
import Modal from "../..";

interface BlockDriverProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleConfirm: (reason: string) => void;
  handleCancel: () => void;
}

const BlockDriver = ({ isOpen, onRequestClose, handleConfirm, handleCancel }: BlockDriverProps) => {
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
      modalTitle="Bloquear motorista"
      modalDescription="Gostaria de bloquear esse motorista? Escreva em poucas palavras o motivo:"
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={handleConfirmClick}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={handleCancelClick}
      childrenClassName={styles.children}
    >
      <div className={styles.inputContainer}>
        <textarea
          name="blockDriver"
          id="blockDriver"
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

export default BlockDriver;
