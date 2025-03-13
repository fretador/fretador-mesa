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
import VehicleDetails from "@/components/DriverApproval/VehicleDetails";
import Attachments from "@/components/DriverApproval/Attachments";
import ActionButtons from "@/components/DriverApproval/ActionButtons";
import { Driver } from "@/utils/interfaces/Driver";
import { gerarDadosBancarios } from "@/utils/mocks/bankDataGenerator";
import {
  generateRandomPlate,
  generateRandomVehicleData,
} from "@/utils/mocks/vehicleDataGenerator";
import SmallLoading from "@/components/SmallLoading";
import { useDriverById } from "@/hooks/driver/useDriverById";

const DriverApproval: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { driverId } = router.query;
  const [activeTab, setActiveTab] = useState("motorista");
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const { data: driverData, loading, error } = useDriverById(driverId as string);

  const transformDriver = (driver: Driver): Driver => {
    const firstName = driver.name.split(" ")[0].toLowerCase();
    const generatedEmail = `${firstName}@fretador.com.br`;
    const { agencia, conta, banco } = gerarDadosBancarios(driver.cpf);
    const randomVehicleData = generateRandomVehicleData(driver.cpf);

    return {
      ...driver,
      email: driver.email || generatedEmail,
      owner: {
        name: driver.name,
        cpf: driver.cpf,
        phoneNumber: driver.phoneNumber,
        email: generatedEmail,
        bankName: banco,
        bankAgency: agencia,
        bankAccount: conta,
        pix: driver.email || generatedEmail,
        isDriverAsOwner: true,
      },
      attachments: {
        userPhoto: driver.userPhoto?.imageUrl,
        cnh: driver.cnhPhoto?.imageUrl,
        proofResidencePhoto: driver.proofResidencePhoto?.imageUrl,
        rg: driver.rgPhoto?.imageUrl,
        vehiclePhoto: driver.vehicle?.vehiclePhoto?.imageUrl,
        anttPhoto: driver.vehicle?.anttPhoto?.imageUrl,
        documentPhoto: driver.vehicle?.documentPhoto?.imageUrl,
      },
      vehicle: {
        ...driver.vehicle,
        plate: generateRandomPlate(),
        ...randomVehicleData,
      },
    };
  };

  const transformedDriver = driverData ? transformDriver(driverData) : null;

  const handleGoBack = () => {
    router.back();
  };

  const backButtonContent = (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <BackIcon /> <p style={{ fontWeight: "700" }}>Voltar</p>
    </div>
  );
  const routeName = "APROVAÇÃO CADASTRO DO MOTORISTA";

  const renderContent = () => {
    if (loading) {
      return <div className={styles.loadingContainer}><SmallLoading /></div>;
    }

    if (error) {
      return <div>Erro ao carregar os dados do motorista</div>;
    }

    if (!transformedDriver) {
      return <div>Nenhum dado do motorista encontrado.</div>;
    }

    switch (activeTab) {
      case "motorista":
        return (
          <div>
            <DriverAndOwnerDetails driver={transformedDriver} />
            <ActionButtons
              showApprove={true}
              showDownload={true}
              showBlock={true}
            />
          </div>
        );
      case "veiculo":
        return (
          <div>
            <VehicleDetails vehicle={transformedDriver.vehicle} />
            <ActionButtons
              showApprove={true}
              showDownload={true}
              showBlock={true}
            />
          </div>
        );
      case "anexos":
        return (
          <div>
            <Attachments driver={transformedDriver} isSelectionMode={isSelectionMode} />
            <ActionButtons
              showSelectPhotos={true}
              showRequest={true}
              showBlock={true}
              isSelectionMode={isSelectionMode}
              setIsSelectionMode={setIsSelectionMode}
            />
          </div>
        );
      case "historico":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              height: "300px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "1247px",
                height: "60px",
                borderRadius: "5px",
                backgroundColor: "#B2CEDA"
              }}
            >
              <p style={{ fontSize: "20px" }}>Sem dados para mostrar</p>
            </div>
            <ActionButtons
              showApprove={true}
              showDownload={true}
              showBlock={true}
            />
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
                <Botao
                  text={backButtonContent}
                  className={styles.backButton}
                  onClick={handleGoBack}
                />
              </div>

              <div className={styles.mainContentContainer}>
                <div className={styles.menu}>
                  <button
                    onClick={() => setActiveTab("motorista")}
                    className={
                      activeTab === "motorista"
                        ? styles.activeTabButton
                        : styles.tabButton
                    }
                  >
                    Motorista/Proprietário
                  </button>
                  <button
                    onClick={() => setActiveTab("veiculo")}
                    className={
                      activeTab === "veiculo"
                        ? styles.activeTabButton
                        : styles.tabButton
                    }
                  >
                    Dados do Veículo
                  </button>
                  <button
                    onClick={() => setActiveTab("anexos")}
                    className={
                      activeTab === "anexos"
                        ? styles.activeTabButton
                        : styles.tabButton
                    }
                  >
                    Anexos
                  </button>
                  <button
                    onClick={() => setActiveTab("historico")}
                    className={
                      activeTab === "historico"
                        ? styles.activeTabButton
                        : styles.tabButton
                    }
                  >
                    Histórico
                  </button>
                </div>
                <div className={styles.content}>{renderContent()}</div>
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default DriverApproval;