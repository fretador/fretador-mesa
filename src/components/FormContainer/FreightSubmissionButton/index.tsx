import React, { useState } from "react";
import Botao from "@/components/Botao"; // Importação do componente de botão personalizado
import styles from "./FreightSubmissionButtons.module.css";
import AssignFreightModal from "@/components/ModalRoot/AssignFreightModal"; // Assuming this is the correct import path

interface FreightSubmissionButtonsProps {
  onSubmit: () => void;
  onDirectToDriver: (driverId?: string) => void;
}

const FreightSubmissionButtons: React.FC<FreightSubmissionButtonsProps> = ({
  onSubmit,
  onDirectToDriver,
}) => {
  const [isAssignFreightModalOpen, setIsAssignFreightModalOpen] =
    useState(false);

  const handleDirectToDriver = (driverId?: string) => {
    onDirectToDriver(driverId);
    setIsAssignFreightModalOpen(false);
  };

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
        onClick={() => setIsAssignFreightModalOpen(true)}
      />
      <AssignFreightModal
        isOpen={isAssignFreightModalOpen}
        onRequestClose={() => setIsAssignFreightModalOpen(false)}
        onConfirm={handleDirectToDriver}
      />
    </div>
  );
};

export default FreightSubmissionButtons;
