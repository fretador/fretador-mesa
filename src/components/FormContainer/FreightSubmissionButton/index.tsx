import React from "react";
import Botao from "@/components/Botao";
import styles from "./FreightSubmissionButtons.module.css";

interface FreightSubmissionButtonsProps {
  onDirectToDriver: () => void; // Agora só indica a intenção de direcionar para motorista
  onCreateOffer: () => void;
}

const FreightSubmissionButtons: React.FC<FreightSubmissionButtonsProps> = ({
  onDirectToDriver,
  onCreateOffer,
}) => {
  return (
    <div className={styles.submitWrapper}>
      <Botao
        type="button"
        text="Criar Oferta"
        className={styles.submitButton}
        onClick={onCreateOffer}
      />
      <Botao
        type="button"
        text="Direcionar para Motorista"
        className={styles.secondaryButton}
        onClick={onDirectToDriver}
      />
    </div>
  );
};

export default FreightSubmissionButtons;
