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
import DriverBlockModal from "@/components/ModalRoot/DriverBlockModal";
import ModalRoot from "@/components/ModalRoot";
import PhotoRequestModal from "@/components/ModalRoot/PhotoRequestModal"; 


const Canva: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isRootModalOpen, setIsRootModalOpen] = useState(false);
  const [isPhotoRequestModalOpen, setIsPhotoRequestModalOpen] = useState(false); 


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleBlockModal = () => {
    setIsBlockModalOpen(!isBlockModalOpen);
  };


  const toggleRootModal = () => {
    setIsRootModalOpen(!isRootModalOpen);
  };

  const togglePhotoRequestModal = () => {
    setIsPhotoRequestModalOpen(!isPhotoRequestModalOpen);
  };

  const handleBlock = (reason: string) => {
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
            Aprovação de Cadastro
          </button>

          <button onClick={toggleBlockModal} className={styles.openModalButton}>
            Bloquear Motorista
          </button>

          <button onClick={toggleRootModal} className={styles.openModalButton}>
            Abrir ModalRoot
          </button>

          <button onClick={togglePhotoRequestModal} className={styles.openModalButton}>
            Abrir PhotoRequestModal
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


          <ModalRoot isOpen={isRootModalOpen} onRequestClose={toggleRootModal}>
            <div>
              <h2>Conteúdo do ModalRoot</h2>
              <p>Este é o conteúdo do ModalRoot.</p>
              <button onClick={toggleRootModal}>Fechar</button>
            </div>
          </ModalRoot>

          <PhotoRequestModal
            isOpen={isPhotoRequestModalOpen}
            onRequestClose={togglePhotoRequestModal}
          />

        </div>
      </div>
    </div>
  );
};

export default Canva;
