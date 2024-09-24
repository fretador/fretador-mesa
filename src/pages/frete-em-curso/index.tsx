import React, { useState, useEffect } from "react";
import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Freteemcurso.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import SearchComponent from "@/components/SearchButton";
import FreightInCurseHeader from "@/components/FreightInCurseHeader";
import { SeparatorIcon } from "@/utils/icons";
import ProgressBar from "@/components/ProgressBar";
import FreightInCurseOptions from "@/components/FreightInCurseOptions";
import FreightStep from "@/components/FreightStep";
import { FreightService } from "@/services/freightService";
import Loading from "@/components/Loading";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { Freight } from "@/utils/types/Freight";

interface FreightInProgressProps {
  freightId: string;
}

const FreightInProgress: React.FC<FreightInProgressProps> = ({ freightId }) => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const [freight, setFreight] = useState<Freight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const fetchFreightData = async () => {
      try {
        setLoading(true);
        const freightData = await FreightService.getFreightById(freightId);
        setFreight(freightData);
        console.log("freightData", freightData);
        setCurrentStage(
          getStageFromStatus(freightData?.status as FreightStatus)
        );
      } catch (err) {
        setError("Erro ao carregar os dados do frete");
        console.error("Erro ao buscar dados do frete:", err);
      } finally {
        setLoading(false);
      }
    };

    if (freightId) {
      fetchFreightData();
    }
  }, [freightId]);

  const getStageFromStatus = (status: FreightStatus): number => {
    // Implemente a lógica para mapear o status do frete para um estágio
    // Exemplo simplificado:
    const stageMap: { [key in FreightStatus]?: number } = {
      [FreightStatus.WAITING]: 0,
      [FreightStatus.TARGETED]: 0,
      [FreightStatus.REQUESTED]: 0,
      [FreightStatus.APPROVED]: 0,
      [FreightStatus.PICKUP_ORDER_SENT]: 0,
      [FreightStatus.OPERATION_REQUIRED]: 4,
      [FreightStatus.OPERATION_APPROVED]: 4,
      [FreightStatus.ADMIN_REQUIRED]: 4,
      [FreightStatus.ADMIN_APPROVED]: 4,
      [FreightStatus.FINANCIAL_REQUIRED]: 5,
      [FreightStatus.FINANCIAL_APPROVED]: 5,
      [FreightStatus.LOADING_STARTED]: 2,
      [FreightStatus.LOADING_FINISHED]: 2,
      [FreightStatus.UNLOADING_STARTED]: 2,
      [FreightStatus.UNLOADING_FINISHED]: 3,
      [FreightStatus.INVOICE_SENT]: 4,
      [FreightStatus.INVOICE_COUPON_SENT]: 4,
      [FreightStatus.INVOICE_COUPON_REFUSED]: 4,
      [FreightStatus.DRIVER_ARRIVED]: 5,
      [FreightStatus.DRIVER_SELECTED]: 18,
    };
    return stageMap[status] || 0;
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

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
            <Header title={`FRETE EM CURSO - ${freight?.freightCode || ""}`} />
          </div>
          <div className={styles.content}>
            <Body>
              <div>
                <SearchComponent
                  onSearch={(query) => console.log("Busca:", query)}
                />
              </div>

              {freight && (
                <div className={styles.freightInCurseContainer}>
                  <FreightInCurseHeader
                    freightCode={freight.freightCode.toString()}
                    statusFreight={freight.status as FreightStatus}
                    driverName={freight.targetedDrivers[0]?.name}
                    origin={freight.origin}
                    destination={freight.destination}
                    driverPhoto={
                      freight.targetedDrivers[0]?.userPhoto.imageUrl ||
                      freight.targetedDrivers[0]?.userPhoto ||
                      ""
                    }
                  />

                  <SeparatorIcon />

                  <ProgressBar currentStage={currentStage} />

                  <SeparatorIcon />

                  <div className={styles.freightInCurseOptionsContainer}>
                    <h2>Dados do embarque:</h2>
                    <FreightInCurseOptions />
                  </div>
                </div>
              )}

              <FreightStep
                theme="dark"
                date="07/06/2024"
                hour="15:02:23"
                content="Frete solicitado pelo motorista"
              />

              <FreightStep
                theme="light"
                date="07/06/2024"
                hour="15:02:23"
                content="Autorizar embarque?"
                authorizeBoarding={true}
              />

              <FreightStep
                theme="dark"
                date="07/06/2024"
                hour="15:02:23"
                content="Motorista iniciou a viagem"
                actionButton={true}
                actionButtonText="rastrear"
                handleActionButton={() => console.log("Botão de ação clicado")}
              />

              <FreightStep
                theme="light"
                date="07/06/2024"
                hour="15:02:23"
                content="Anexo enviado pelo motorista"
                actionButton={true}
                actionButtonText="ver anexos"
                handleActionButton={() => console.log("Botão de ação clicado")}
                hasAttachment={true}
                attachmentPath={
                  freight?.attachmentPath || "/default-attachment.png"
                } // Exemplo de como utilizar o dado
              />
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default FreightInProgress;
