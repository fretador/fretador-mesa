import React, { useState, useCallback } from "react";
import Botao from "@/components/Botao";
import styles from "./FreightSubmissionButtons.module.css";
import AssignFreightModal from "@/components/ModalRoot/AssignFreightModal";

interface FreightSubmissionButtonsProps {
  onDirectToDriver: (driverId?: string) => void;
  onCreateOffer: () => void;
}

const FreightSubmissionButtons: React.FC<FreightSubmissionButtonsProps> = ({
  onDirectToDriver,
  onCreateOffer,
}) => {
  const [isAssignFreightModalOpen, setIsAssignFreightModalOpen] = useState(false);

  const handleDirectToDriver = useCallback((driverIds: string[]) => {
    const selectedDriver = driverIds.length > 0 ? driverIds[0] : undefined;
    onDirectToDriver(selectedDriver);
    setIsAssignFreightModalOpen(false);
  }, [onDirectToDriver]);

  const handleOpenModal = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAssignFreightModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsAssignFreightModalOpen(false);
  }, []);

  return (
    <>
      <div className={styles.submitWrapper}>
        <Botao
          type="button"
          text="Criar Oferta"
          className={styles.submitButton}
          onClick={()=>{
            console.log("Botão Criar Oferta Criado")
            onCreateOffer()}}
        />
        <Botao
          type="button"
          text="Direcionar para Motorista"
          className={styles.secondaryButton}
          onClick={handleOpenModal}
        />
      </div>

      <AssignFreightModal
        isOpen={isAssignFreightModalOpen}
        onRequestClose={handleCloseModal}
        onConfirm={handleDirectToDriver}
      />
    </>
  );
};

export default FreightSubmissionButtons;