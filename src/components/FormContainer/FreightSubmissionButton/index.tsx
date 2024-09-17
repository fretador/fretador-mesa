import React, { useState } from "react";
import Botao from "@/components/Botao";
import styles from "./FreightSubmissionButtons.module.css";
import AssignFreightModal from "@/components/ModalRoot/AssignFreightModal"; // Assuming this is the correct import path

interface FreightSubmissionButtonsProps {
  onDirectToDriver: (driverId?: string) => void;
}

const FreightSubmissionButtons: React.FC<FreightSubmissionButtonsProps> = ({
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
      <Botao type="submit" text="Enviar" className={styles.submitButton} />
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
