import React, { useState } from "react";
import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./DriverApproval.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { BackIcon } from "@/utils/icons";
import DriverAndOwnerDetails from "@/components/DriverApproval/DriverAndOwnerDetails";
<<<<<<< HEAD
import VehicleDetails from "@/components/DriverApproval/VehicleDetails";
=======
>>>>>>> dd86752 (feat: create DriverAndOwnerDetails and ActionButtons components)

const DriverApproval: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("motorista");

  const backButtonContent = <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}><BackIcon /> <p style={{fontWeight: '700'}}>Voltar</p></div>
  const routeName = "APROVAÇÃO CADASTRO DO MOTORISTA";

  const renderContent = () => {
    switch (activeTab) {
      case "motorista":
        return (
          <div>
            <DriverAndOwnerDetails />
          </div>
        );
      case "veiculo":
        return (
          <div>
            <VehicleDetails />
          </div>
        );
      case "anexos":
        return (
          <div>
            <h2>Anexos</h2>
          </div>
        );
      case "preferencias":
        return (
          <div>
            <h2>Preferências</h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AuthenticatedLayout>
      <div className={styles.container}>
        <div>
          <Sidebar />
        </div>

        <div
          className={
            isRetracted ? styles.retractedContentWrapper : styles.contentWrapper
          }
        >
          <div className={styles.header}>
            <Header title={routeName} />
          </div>
          <div className={styles.content}>
            <Body>
              <div className={styles.backButtonContainer}>
                <Botao text={backButtonContent} className={styles.backButton} /> 
              </div>

              <div className={styles.mainContentContainer}>
                <div className={styles.menu}>
                  <button
                    onClick={() => setActiveTab("motorista")}
                    className={activeTab === "motorista" ? styles.activeTabButton : styles.tabButton}
                  >
                    Motorista/Proprietário
                  </button>
                  <button
                    onClick={() => setActiveTab("veiculo")}
                    className={activeTab === "veiculo" ? styles.activeTabButton : styles.tabButton}
                  >
                    Dados do Veículo
                  </button>
                  <button
                    onClick={() => setActiveTab("anexos")}
                    className={activeTab === "anexos" ? styles.activeTabButton : styles.tabButton}
                  >
                    Anexos
                  </button>
                  <button
                    onClick={() => setActiveTab("preferencias")}
                    className={activeTab === "preferencias" ? styles.activeTabButton : styles.tabButton}
                  >
                    Preferências
                  </button>
                </div>
                <div className={styles.content}>
                  {renderContent()}
                </div>
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default DriverApproval;
