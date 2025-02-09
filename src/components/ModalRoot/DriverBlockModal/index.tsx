
import React, { useState, useEffect } from "react";
import ModalRoot from "../index";
import styles from "./DriverBlockModal.module.css";


interface DriverBlockModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onBlock: (reason: string) => void;
}

const DriverBlockModal: React.FC<DriverBlockModalProps> = ({
  isOpen,
  onRequestClose,
  onBlock,
}) => {
  const [step, setStep] = useState(1);

  const [reason, setReason] = useState('');


  useEffect(() => {
    if (isOpen) {
      setStep(1);

      setReason("");

    }
  }, [isOpen]);

  const handleBlock = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onBlock(reason);
    }
  };

  return (
    <ModalRoot isOpen={isOpen} onRequestClose={onRequestClose}>

      <div className={styles.content} id="modalContent">

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Bloquear Motorista</h2>
          <button className={styles.closeButton} onClick={onRequestClose}>
            X
          </button>
        </div>
        <div className={styles.modalContent}>
          {step === 1 ? (
            <p className={styles.modalMessage}>Gostaria de bloquear esse motorista?</p>
          ) : (
            <>
              <p className={styles.modalMessage}>Indique o motivo</p>
              <input
                type="text"
                className={styles.inputText}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </>
          )}
        </div>
        <div className={styles.buttonGroup}>
          {step === 1 ? (
            <>
              <button className={styles.confirmButton} onClick={handleBlock}>SIM</button>
              <button className={styles.cancelButton} onClick={onRequestClose}>NÃO</button>
            </>
          ) : (
            <>
              <button className={styles.confirmButton} onClick={handleBlock}>Enviar</button>
              <button className={styles.cancelButton} onClick={onRequestClose}>Cancelar</button>
            </>
          )}
        </div>
      </div>
    </ModalRoot>
  );
};


export default DriverBlockModal;

