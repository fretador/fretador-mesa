import React, { useState } from "react";
import styles from './UnblockDriver.module.css'
import Modal from "../..";

interface UnblockDriverProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleConfirm: (reason: string) => void;
  handleCancel: () => void;
}

const UnblockDriver = ({isOpen, onRequestClose, handleConfirm, handleCancel}: UnblockDriverProps) => {

  const [reason, setReason] = useState("");
  
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReason(event.target.value);
    };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Desbloquear motorista"
      modalDescription="Dscreva em poucas palavras o motivo para desbloquear o motorista:"
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={() => handleConfirm(reason)}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={handleCancel}
      childrenClassName={styles.children}
    >
      <div className={styles.inputContainer}>
        <textarea
          name="unblockDriver"
          id="unblockDriver"
          placeholder="escreva aqui..."
          value={reason}
          onChange={handleTextareaChange}
        >
        </textarea>
      </div>
    </Modal>
  )
}

export default UnblockDriver