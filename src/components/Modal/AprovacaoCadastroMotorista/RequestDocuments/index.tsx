import React, { useState } from "react";
import styles from './RequestDocuments.module.css'
import Modal from "../..";

interface RequestDocumentsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  handleConfirm: (reason: string) => void;
  handleCancel: () => void;
}

const RequestDocuments = ({isOpen, onRequestClose, handleConfirm, handleCancel}: RequestDocumentsProps) => {

  const [reason, setReason] = useState("");
  
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReason(event.target.value);
    };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Solicitar documentos"
      modalDescription="Qual documento gostaria de solicitar ao motorista?"
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={() => handleConfirm(reason)}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={handleCancel}
      childrenClassName={styles.children}
    >
      <div className={styles.inputContainer}>
        <textarea
          name="requestDocuments"
          id="requestDocuments"
          placeholder="escreva aqui..."
          value={reason}
          onChange={handleTextareaChange}
        >
        </textarea>
      </div>
    </Modal>
  )
}

export default RequestDocuments