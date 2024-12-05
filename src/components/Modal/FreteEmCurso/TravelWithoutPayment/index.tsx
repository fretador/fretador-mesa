import React, { useState } from "react";
import styles from './TravelWithoutPayment.module.css'
import Modal from "../..";

interface TravelWithoutPaymentProps {
  isOpen: boolean,
  onRequestClose: () => void,
  handleConfirm: () => void,
  handleCancel: () => void
}

const TravelWithoutPayment = ({isOpen, onRequestClose, handleConfirm, handleCancel}: TravelWithoutPaymentProps) => {

  const [reason, setReason] = useState("");

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(event.target.value);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Viagem sem pagamento"
      modalDescription="Você confirma esse embarque sem valor de frete? Por favor, insira o motivo:"
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={handleConfirm}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={handleCancel}
      childrenClassName={styles.children}
    >
      <div className={styles.inputContainer}>
        <textarea
          name="travelWithoutPayment"
          id="travelWithoutPayment"
          placeholder="escreva aqui..."
          value={reason}
          onChange={handleTextareaChange}
        >
        </textarea>
      </div>
    </Modal>
  )
}

export default TravelWithoutPayment