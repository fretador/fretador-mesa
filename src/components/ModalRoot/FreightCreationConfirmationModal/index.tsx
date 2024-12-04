import React from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import styles from "./FreightCreationConfirmationModal.module.css";

interface FreightCreationConfirmationModalProps {
  isOpen: boolean;
  freightCode?: number; // Código do frete, caso seja criado com sucesso
  error?: string; // Mensagem de erro, caso algo dê errado
  onRequestClose: () => void;
}

const FreightCreationConfirmationModal: React.FC<FreightCreationConfirmationModalProps> = ({
  isOpen,
  freightCode,
  error,
  onRequestClose,
}) => {
  const router = useRouter();

  const handleOkClick = () => {
    onRequestClose();
    router.push("/fretes");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.content}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>
          {error ? "Erro ao Criar o Frete" : "Frete Criado com Sucesso!"}
        </h2>
      </div>

      <div className={styles.modalContent}>
        {error ? (
          <p className={styles.modalMessage}>{error}</p>
        ) : (
          <>
            <p className={styles.modalMessage}>Frete: </p>
            {freightCode && (
              <p className={styles.regularText}>
                <span className={styles.boldText}>Frete:</span> {freightCode} Criado com Sucesso!
              </p>
            )}
          </>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button className={styles.confirmButton} onClick={handleOkClick}>
          OK
        </button>
      </div>
    </Modal>
  );
};

export default FreightCreationConfirmationModal;
