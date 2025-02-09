import React, { useState } from "react";
import styles from './SendAlert.module.css';
import Modal from "../..";

interface SendAlertProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleConfirm: (reason: string) => void;
  handleCancel: () => void;
}

const SendAlert = ({ isOpen, onRequestClose, handleConfirm, handleCancel }: SendAlertProps) => {
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
      setError("A mensagem não pode estar vazia.");
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
      modalTitle="Enviar alerta"
      modalDescription="Insira a mensagem que quer enviar ao motorista como alerta:"
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={handleConfirmClick}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={handleCancelClick}
      childrenClassName={styles.children}
    >
      <div className={styles.inputContainer}>
        <textarea
          name="sendAlert"
          id="sendAlert"
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

export default SendAlert;
