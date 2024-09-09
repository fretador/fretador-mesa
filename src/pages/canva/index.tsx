import React, { useState } from "react";
import Header from "@/components/Header";
import Body from "@/components/Body";
import styles from "./Canva.module.css";
import { Row } from "@/components/Row";
import { useAppSelector } from "@/store/store";
import Sidebar from "@/components/Sidebar";
import RowTitle from "@/components/RowTitle";
import ConfirmationModal from "@/components/ModalRoot/ConfirmationModal"; // Ajuste na importação

const Canva: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleConfirm = () => {
    // Ação para salvar a alteração de dados
    console.log("Alteração salva");
    toggleModal();
  };

  const handleCancel = () => {
    console.log("Alteração não salva");
    toggleModal();
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
            Abrir Modal de Alteração
          </button>
          <ConfirmationModal
            isOpen={isModalOpen}
            onRequestClose={toggleModal}
            title="Alteração de dados"
            message="Gostaria de salvar a alteração realizada?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Canva;
