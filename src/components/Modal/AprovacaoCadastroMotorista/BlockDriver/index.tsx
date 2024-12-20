import React, { useState } from "react";
import styles from './BlockDriver.module.css'
import Modal from "../..";

interface BlockDriverProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleConfirm: (reason: string) => void;
  handleCancel: () => void;
}

const BlockDriver = ({isOpen, onRequestClose, handleConfirm, handleCancel}: BlockDriverProps) => {

  const [reason, setReason] = useState("");
  
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReason(event.target.value);
    };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Bloquear motorista"
      modalDescription="Gostaria de bloquear esse motorista? Escreva em poucas palavras o motivo:"
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={() => handleConfirm(reason)}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={handleCancel}
      childrenClassName={styles.children}
    >
      <div className={styles.inputContainer}>
        <textarea
          name="blockDriver"
          id="blockDriver"
          placeholder="escreva aqui..."
          value={reason}
          onChange={handleTextareaChange}
        >
        </textarea>
      </div>
    </Modal>
  )
}

export default BlockDriver