import React from "react";
import Botao from "@/components/Botao"; // Importação do componente de botão personalizado
import styles from "./FreightSubmissionButtons.module.css";

interface FreightSubmissionButtonsProps {
  onSubmit: () => void;
  onDirectToDriver: () => void;
}

const FreightSubmissionButtons: React.FC<FreightSubmissionButtonsProps> = ({
  onSubmit,
  onDirectToDriver,
}) => {
  return (
    <div className={styles.submitWrapper}>
      <Botao
        type="submit"
        text="Enviar"
        className={styles.submitButton}
        onClick={onSubmit}
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
