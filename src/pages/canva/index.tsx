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
import ReportIssueModal from "@/components/ModalRoot/ReportIssueModal";
import Modal from "@/components/Modal";

const Canva: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const [isOpenTicketModalOpen, setIsOpenTicketModalOpen] = useState(false);
  const [isFirstTimeMalfunctionModalOpen, setIsFirstTimeMalfunctionModalOpen] = useState(false);
  const [isIssueNavigatorModalOpen, setIsIssueNavigatorModalOpen] = useState(false);
  const [isReportIssueModalOpen, setIsReportIssueModalOpen] = useState(false);

  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [isNewModalOpen2, setIsNewModalOpen2] = useState(false)
  const [isNewModalOpen3, setIsNewModalOpen3] = useState(false)

  const toggleNewModal = () => {
    setIsNewModalOpen(!isNewModalOpen)
  }

  const toggleNewModal2 = () => {
    setIsNewModalOpen2(!isNewModalOpen2)
  }

  const toggleNewModal3 = () => {
    setIsNewModalOpen3(!isNewModalOpen3)
  }

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

  const toggleReportIssueModal = () => {
    setIsReportIssueModalOpen(!isReportIssueModalOpen);
  };

  const handleSend = () => {
    console.log("Enviando o ticket...");
    // Adicione qualquer lógica adicional que você precise aqui
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
              <Row.Cte cte="000000" />
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

          {/* Botão para abrir o novo modal ReportIssueModal */}
          <button onClick={toggleReportIssueModal} className={styles.openModalButton}>
            Reportar Problema
          </button>

          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', marginTop: '48px'}}>
            <button onClick={toggleNewModal} className={styles.newModalButton}>
              Abrir Novo Modal 1 Botão
            </button>

            <button onClick={toggleNewModal2} className={styles.newModalButton}>
              Abrir Novo Modal 2 Botões
            </button>

            <button onClick={toggleNewModal3} className={styles.newModalButton}>
              Abrir Novo Modal Personalizado
            </button>
          </div>


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

          {isReportIssueModalOpen && (
            <ReportIssueModal
              isOpen={isReportIssueModalOpen}
              onRequestClose={toggleReportIssueModal}
              onSend={handleSend}
              onBack={toggleReportIssueModal}
            />
          )}

          {isNewModalOpen && (
            <Modal
              isOpen={isNewModalOpen}
              onRequestClose={toggleNewModal}
              modalTitle="Confirmação de Frete"
              modalDescription="Frete confirmado com sucesso"
              buttonOneTitle="Ok"
              buttonOneAction={() => console.log('Verificação ok')}
            />
          )}

          {isNewModalOpen2 && (
            <Modal
              isOpen={isNewModalOpen2}
              onRequestClose={toggleNewModal2}
              modalTitle="Confirmação de Frete"
              modalDescription="Você gostaria de confirmar o frete?"
              hasTwoButtons={true}
              buttonOneTitle="Sim"
              buttonOneAction={() => console.log('Confirmou')}
              buttonTwoTitle="Não"
              buttonTwoAction={() => console.log('Não Confirmou')}
            />
          )}

          {isNewModalOpen3 && (
            <Modal
              isOpen={isNewModalOpen3}
              onRequestClose={toggleNewModal3}
              modalTitle="Criação de Frete"
              modalDescription="Crie o frete abaixo:"
              buttonOneTitle="Criar"
              buttonOneAction={() => console.log('Criou')}
              childrenClassName={styles.children}
            >
              <div>
                <label htmlFor="input">Código do Frete:</label>
                <input id="input" type="text" />
              </div>

              <div>
                <label htmlFor="input">Nome do Motorista:</label>
                <input id="input" type="text" />
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canva;
