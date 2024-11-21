import React, { useState } from "react";
import Header from "@/components/Header";
import Body from "@/components/Body";
import styles from "./Canva.module.css";
import { Row } from "@/components/Row";
import { useAppSelector } from "@/store/store";
import RowTitle from "@/components/RowTitle";
import OpenTicketModal from "@/components/ModalRoot/OpenTicketModal";
import FirstTimeMalfunctionConfirmationModal from "@/components/ModalRoot/FirstTimeMalfunctionConfirmationModal";
import IssueNavigatorModal from "@/components/ModalRoot/IssueNavigatorModal";

const Canva: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const [isOpenTicketModalOpen, setIsOpenTicketModalOpen] = useState(false);
  const [isFirstTimeMalfunctionModalOpen, setIsFirstTimeMalfunctionModalOpen] = useState(false);
  const [isIssueNavigatorModalOpen, setIsIssueNavigatorModalOpen] = useState(false);

  const toggleOpenTicketModal = () => {
    setIsOpenTicketModalOpen(!isOpenTicketModalOpen);
  };

  const toggleFirstTimeMalfunctionModal = () => {
    setIsFirstTimeMalfunctionModalOpen(!isFirstTimeMalfunctionModalOpen);
  };

  const handleAdvance = () => {
    console.log("Avançando para a próxima etapa do ticket.");
    toggleOpenTicketModal();
  };

  const handleConfirm = () => {
    console.log("Confirmado");
    toggleFirstTimeMalfunctionModal();
  };

  const handleCancel = () => {
    console.log("Cancelado");
    toggleFirstTimeMalfunctionModal();
  };

  const handleOnRequestClose = () => {
    setIsFirstTimeMalfunctionModalOpen(false);
  };

  const toggleIssueNavigatorModal = () => {
    setIsIssueNavigatorModalOpen(!isIssueNavigatorModalOpen);
  };

  return (
    <div className={styles.container}>
      <div
        className={
          isRetracted ? styles.retractedContentWrapper : styles.contentWrapper
        }
      >
        <div className={styles.header}>
          <Header title="Canva" />
        </div>
        <div className={styles.content}>
          <Body>
            <RowTitle
              FreightDate="DATA"
              FreightCode="CÓDIGO"
              Cte="CTE"
              Route="ROTA"
              Customer="CLIENTE"
              Driver="MOTORISTA"
              FreightStatus="STATUS"
            />
            <Row.Root>
              <Row.FreightDate date={new Date().toLocaleDateString()} />
              <Row.FreightCode code={"ABC123"} />
              <Row.Cte numCte="000000" />
              <Row.Route originState="SP" destinyState="RJ" />
              <Row.Customer customerName={"Joaquim José da Silva Xavier"} />
              <Row.Driver driverName="João Pedro do Nascimento" />
              <Row.FreightStatus />
            </Row.Root>
          </Body>

          {/* Botão para abrir o OpenTicketModal */}
          <button onClick={toggleOpenTicketModal} className={styles.openModalButton}>
            Abrir Ticket
          </button>

          {/* Botão para abrir o FirstTimeMalfunctionConfirmationModal */}
          <button onClick={toggleFirstTimeMalfunctionModal} className={styles.openModalButton}>
            Confirmar Mal Funcionamento
          </button>

          {/* Botão para abrir o novo modal IssueNavigatorModal */}
          <button onClick={toggleIssueNavigatorModal} className={styles.openModalButton}>
            Navegar Problema
          </button>

          {isOpenTicketModalOpen && (
            <OpenTicketModal
              isOpen={isOpenTicketModalOpen}
              onRequestClose={toggleOpenTicketModal}
              onAdvance={handleAdvance}
            />
          )}

          {isFirstTimeMalfunctionModalOpen && (
            <FirstTimeMalfunctionConfirmationModal
              isOpen={isFirstTimeMalfunctionModalOpen}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              onRequestClose={handleOnRequestClose}
            />
          )}

          {isIssueNavigatorModalOpen && (
            <IssueNavigatorModal
              isOpen={isIssueNavigatorModalOpen}
              onRequestClose={toggleIssueNavigatorModal}
              onSearch={() => console.log("Pesquisar dúvida")}
              onWriteIssue={toggleIssueNavigatorModal}
              onBack={toggleIssueNavigatorModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Canva;
