// src/pages/Canva.tsx
import React, { useState } from "react";
import Header from "@/components/Header";
import Body from "@/components/Body";
import styles from "./Canva.module.css";
import { Row } from "@/components/Row";
import { useAppSelector } from "@/store/store";
import Sidebar from "@/components/Sidebar";
import RowTitle from "@/components/RowTitle";
import DriverRegistrationApproval from "@/components/ModalRoot/DriverRegistrationApproval";
import DriverBlockModal from "@/components/ModalRoot/DriverBlockModal"; // Verifique o caminho da importação

const Canva: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false); // Estado para o novo modal

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleBlockModal = () => {
    setIsBlockModalOpen(!isBlockModalOpen);
  };

  const handleBlock = (reason: string) => {
    // Lógica para bloquear o motorista com o motivo fornecido
    console.log("Motivo do bloqueio:", reason);
    toggleBlockModal();
  };

  return (
    <div className={styles.container}>
      {/* <Sidebar /> */}

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
            <Row.Root freightStatus="DISPONIVEL">
              <Row.FreightDate date={new Date().toLocaleDateString()} />
              <Row.FreightCode code={"ABC123"} />
              <Row.Cte cte="000000" />
              <Row.Route originState="SP" destinyState="RJ" />
              <Row.Customer customerName={"Joaquim José da Silva Xavier"} />
              <Row.Driver driverName="João Pedro do Nascimento" />
              <Row.FreightStatus freightStatus="DISPONIVEL" />
            </Row.Root>
          </Body>
          <button onClick={toggleModal} className={styles.openModalButton}>
            Direcionar Frete
          </button>

          {/* Botão para abrir o novo modal DriverBlockModal */}
          <button onClick={toggleBlockModal} className={styles.openModalButton}>
            Bloquear Motorista
          </button>

          {/* Renderizando o modal DriverRegistrationApproval */}
          <DriverRegistrationApproval
            isOpen={isModalOpen}
            onRequestClose={toggleModal}
            onApprove={toggleModal}
            onReject={toggleModal}
          />

          {/* Renderizando o novo modal DriverBlockModal */}
          <DriverBlockModal
            isOpen={isBlockModalOpen}
            onRequestClose={toggleBlockModal}
            onBlock={handleBlock}
          />
        </div>
      </div>
    </div>
  );
};

export default Canva;
