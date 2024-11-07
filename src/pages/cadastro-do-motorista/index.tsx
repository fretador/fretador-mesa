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
import { Driver } from "@/utils/types/Driver";
import { useQuery } from "@apollo/client";
import { GET_DRIVER_BY_ID } from "@/graphql/queries/driverQueries";
import { gerarDadosBancarios } from "@/utils/mocks/bankDataGenerator";
import Loading from '@/components/Loading';
import {
  generateRandomPlate,
  generateRandomVehicleData,
} from "@/utils/mocks/vehicleDataGenerator";

const RegisteredDriver: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { driverId } = router.query;
  const [activeTab, setActiveTab] = useState("motorista");

  const { data, loading, error } = useQuery(GET_DRIVER_BY_ID, {
    variables: { id: driverId },
    skip: !driverId,
  });

  // Função para transformar os dados do motorista
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

  const driverData = data?.driver;
  const transformedDriver = driverData ? transformDriver(driverData) : null;

  const handleGoBack = () => {
    router.back();
  };

  const backButtonContent = (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <BackIcon /> <p style={{ fontWeight: "700" }}>Voltar</p>
    </div>
  );
  const routeName = "CADASTRO DO MOTORISTA";

  const renderContent = () => {
    if (loading) {
      return <div className={styles.loadingContainer} ><Loading /> </div >;
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
              showRequest={true}
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
              showRequest={true}
              showDownload={true}
              showBlock={true}
            />
          </div>
        );
      case "anexos":
        return (
          <div>
            <Attachments driver={transformedDriver} />
            <ActionButtons
              showRequest={true}
              showDownload={true}
              showBlock={true}
            />
          </div>
        );
      case "preferencias":
        return (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              height: "708px",
            }}
          >
            <ActionButtons
              showRequest={true}
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
                    onClick={() => setActiveTab("preferencias")}
                    className={
                      activeTab === "preferencias"
                        ? styles.activeTabButton
                        : styles.tabButton
                    }
                  >
                    Preferências
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

export default RegisteredDriver;
