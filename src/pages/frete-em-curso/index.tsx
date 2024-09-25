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
import FreightStep from "@/components/FreightStep";
import { FreightService } from "@/services/freightService";
import Loading from "@/components/Loading";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { Freight } from "@/utils/types/Freight";
import { Type } from "@/utils/enums/typeEnum";
import FreightInCourseOptions from "@/components/FreightInCourseOptions";
import LocationMap from "@/components/LocationMap";

interface FreightInProgressProps {
  freightId: string;
}

interface StatusHistoryItem {
  updateDate: string;
  status: FreightStatus;
}

const FreightInProgress: React.FC<FreightInProgressProps> = ({ freightId }) => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [freight, setFreight] = useState<Freight | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [routeName, setRouteName] = useState("");

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

        // Atualiza o routeName com o pathname e o freightCode
        const pathName = router.pathname
          .replace("/", "")
          .replaceAll("-", " ")
          .toUpperCase();
        setRouteName(`${pathName} ${freightData.freightCode.toString()}`);
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
  }, [freightId, router.pathname]);

  const getStageFromStatus = (status: FreightStatus): number => {
    const stageMap: { [key in FreightStatus]?: number } = {
      [FreightStatus.WAITING]: 0,
      [FreightStatus.TARGETED]: 0,
      [FreightStatus.REQUESTED]: 0,
      [FreightStatus.APPROVED]: 0,
      [FreightStatus.ACCEPTED]: 0,
      [FreightStatus.DRIVER_SELECTED]: 0,
      [FreightStatus.OPERATION_REQUIRED]: 0,
      [FreightStatus.OPERATION_APPROVED]: 4,
      [FreightStatus.ADMIN_REQUIRED]: 4,
      [FreightStatus.ADMIN_APPROVED]: 4,
      [FreightStatus.FINANCIAL_REQUIRED]: 5,
      [FreightStatus.FINANCIAL_APPROVED]: 5,
      [FreightStatus.PICKUP_ORDER_SENT]: 1,
      [FreightStatus.LOADING_STARTED]: 2,
      [FreightStatus.LOADING_FINISHED]: 2,
      [FreightStatus.UNLOADING_STARTED]: 2,
      [FreightStatus.UNLOADING_FINISHED]: 3,
      [FreightStatus.INVOICE_SENT]: 4,
      [FreightStatus.INVOICE_COUPON_SENT]: 4,
      [FreightStatus.INVOICE_COUPON_REFUSED]: 4,
      [FreightStatus.DRIVER_ARRIVED]: 5,
    };
    return stageMap[status] || 0;
  };

  const getFreightStepProps = (
    item: StatusHistoryItem,
    index: number,
    freight: Freight | null | undefined
  ) => {
    const theme = index % 2 === 0 ? "dark" : "light";
    let content = "";
    let primaryButtonLabel: string | undefined;
    let onPrimaryButtonClick: (() => void) | undefined;
    let actionButtonText: string | undefined;
    let handleActionButton: (() => void) | undefined;
    let hasAttachment = false;
    let attachmentPath: string | undefined;

    const freightType = freight?.type ?? Type.TARGETED;

    switch (item.status) {
      case FreightStatus.TARGETED:
        content =
          freightType === Type.TARGETED
            ? "Frete enviado ao motorista"
            : "Frete solicitado pelo motorista";
        break;
      case FreightStatus.APPROVED:
        content =
          freightType === Type.TARGETED
            ? "Frete aceito pelo motorista - Enviar Ordem de Coleta"
            : "Autorizar embarque";
        primaryButtonLabel = freightType !== Type.TARGETED ? "Sim" : undefined;
        onPrimaryButtonClick = () => console.log("Botão de ação clicado");
        break;
      case FreightStatus.DRIVER_ARRIVED:
        content = "Motorista chegou ao local de coleta";
        actionButtonText = "rastrear";
        handleActionButton = () => console.log("Botão de rastreamento clicado");
        break;
      case FreightStatus.PICKUP_ORDER_SENT:
        content = "Ordem de Coleta enviada para o motorista";
        hasAttachment = true;
        attachmentPath = freight?.pickupOrderPhoto ?? undefined;
        break;
      default:
        content = `Status: ${item.status}`;
    }

    return {
      theme,
      date: item.updateDate,
      content,
      primaryButtonLabel,
      onPrimaryButtonClick,
      actionButtonText,
      handleActionButton,
      hasAttachment,
      attachmentPath,
      disabled: false,
    };
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
            <Header title={`FRETE EM CURSO ${freight?.freightCode}`} />
          </div>
          <div className={styles.content}>
            <Body>
              <div>
                <SearchComponent />
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
                      (freight.targetedDrivers[0]?.userPhoto?.imageUrl ||
                        freight.targetedDrivers[0]?.userPhoto ||
                        "") as string
                    }
                  />

                  <SeparatorIcon />

                  {/* Adicionar a barra de progresso aqui */}
                  <ProgressBar currentStage={currentStage} />

                  <SeparatorIcon />

                  <div className={styles.freightInCurseOptionsContainer}>
                    <h2>Dados do embarque:</h2>
                    <FreightInCourseOptions />
                  </div>
                </div>
              )}

              {freight?.statusHistory?.map((item, index) => (
                <FreightStep
                  key={`${item.status}-${index}`}
                  {...getFreightStepProps(item, index)}
                />
              ))}
              <LocationMap />
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default FreightInProgress;
