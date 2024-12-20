import React, { useState, useEffect, useRef } from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Freteemcurso.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import FreightInCurseHeader from "@/components/FreightInCurseHeader";
import { SeparatorIcon } from "@/utils/icons";
import ProgressBar from "@/components/ProgressBar";
import FreightStep from "@/components/FreightStep";
import SmallLoading from "@/components/SmallLoading";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { getStageFromStatus } from "@/utils/getStageFromStatusFreight";
import { Freight } from "@/utils/Interfaces/Freight";
import { Type } from "@/utils/enums/typeEnum";
import FreightInCourseOptions from "@/components/FreightInCourseOptions";
import LocationMap from "@/components/LocationMap";
import { useFreightById } from "@/hooks/freight/useFreightById";
import { getNextStatus, getStatusText } from "@/utils/freightStatusHelpers";
import { UpdateData } from "@/utils/Interfaces/UpdateData";

interface FreightInProgressProps {
  freightId: string;
}

interface StatusHistoryItem {
  updateDate: string | null;
  updateData: UpdateData;
  status: FreightStatus | string;
}

const useFreightData = (freightId: string) => {
  const { data, loading, error, refetch } = useFreightById(freightId as string);

  const freight: Freight | null = data || null;
  const currentStage = freight && freight.status
    ? getStageFromStatus(freight.status as FreightStatus)
    : 0;

  return { loading, freight, error, currentStage, refetch };
};

const getFreightStepProps = (
  item: StatusHistoryItem,
  index: number,
  freight: Freight | null
) => {
  const theme: "dark" | "light" = index % 2 === 0 ? "dark" : "light";
  let content = "";
  let primaryButtonLabel: string | undefined;
  let onPrimaryButtonClick: (() => void) | undefined;
  let actionButtonText: string | undefined;
  let handleActionButton: (() => void) | undefined;

  const freightType = freight?.type ?? Type.TARGETED;

  switch (item.status) {
    case FreightStatus.TARGETED:
      content = freightType === Type.TARGETED
        ? "Frete enviado ao motorista"
        : "Frete solicitado pelo motorista";
      break;
    case FreightStatus.APPROVED:
      content = freightType === Type.TARGETED
        ? "Frete aceito pelo motorista - Enviar Ordem de Coleta"
        : "Embarque autorizado";
      break;
    case FreightStatus.ROUTE_IN_PROGRESS:
      content = "Entrega em andamento";
      actionButtonText = "Rastrear";
      handleActionButton = () => console.log("Botão de rastreamento clicado");
      break;
    case FreightStatus.DRIVER_ARRIVED:
      content = "Motorista chegou ao local de coleta";
      break;
    case FreightStatus.WAITING:
      content = "Aguardando motorista";
      break;
    case FreightStatus.REQUESTED:
      content = "Frete solicitado pelo motorista";
      break;
    case FreightStatus.PICKUP_ORDER_SENT:
      content = "Ordem de Coleta enviada para o motorista";
      return {
        theme,
        date: item.updateDate || "",
        content,
        hasAttachment: true as const,
        attachmentPath: freight?.pickupOrderPhoto ?? "",
        disabled: false,
        updateData: item.updateData,
      };
    case FreightStatus.LOADING_STARTED:
      content = "Início do carregamento";
      break;
    case FreightStatus.LOADING_FINISHED:
      content = "Carregamento finalizado";
      break;
    // case FreightStatus.UNLOADING_STARTED:
    //   content = "Início do descarregamento";
    //   break;
    // case FreightStatus.UNLOADING_FINISHED:
    //   content = "Descarregamento finalizado";
    //   break;
    case FreightStatus.INVOICE_SENT:
      content = "Envio da Nota Fiscal";
      break;
    case FreightStatus.OPERATION_APPROVED:
      content = "Comprovantes ABC.jpg, 2736464.jpg, BCD.jpg enviados - Ver em meus documentos";
      break;
    case FreightStatus.INVOICE_COUPON_REFUSED:
      content = "Documentação do Frete recusada";
      break;
    case FreightStatus.INVOICE_COUPON_SENT:
      content = "Comprovantes Aprovados";
      break;
    case FreightStatus.FINANCIAL_APPROVED:
      content = "Pagamento Realizado";
      break;
    case FreightStatus.FINANCIAL_REQUIRED:
      content = "Saldo solicitado";
      break;
    // case FreightStatus.ADMIN_REQUIRED:
    //   content = "Aguardando aprovação do administrador";
    //   break;
    // case FreightStatus.ADMIN_APPROVED:
    //   content = "Aprovado pelo administrador";
    //   break;
    // case FreightStatus.OPERATION_REQUIRED:
    //   content = "Aguardando aprovação da operação";
    //   break;
    // case FreightStatus.OPERATION_APPROVED:
    //   content = "Aprovado pela operação";
    //   break;
    case FreightStatus.DRIVER_SELECTED:
      content = "Motorista selecionado";
      break;
    case FreightStatus.FINISHED:
      content = "Frete finalizado";
      break;
    case FreightStatus.CANCELED:
      content = "Frete cancelado";
      break;
    default:
      content = `Status: ${item.status}`;
      break;
  }

  return {
    theme,
    date: item.updateDate || "",
    content,
    primaryButtonLabel,
    onPrimaryButtonClick,
    actionButtonText,
    handleActionButton,
    hasAttachment: false as const,
    disabled: false,
    updateData: item.updateData ?? {},
  };
};

const FreightInProgress: React.FC<FreightInProgressProps> = ({ freightId }) => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { loading, freight, error, currentStage, refetch } = useFreightData(freightId);
  const [routeName, setRouteName] = useState("");
  const freightStepContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (freight) {
      const pathName = router.pathname
        .replace("/", "")
        .replaceAll("-", " ")
        .toUpperCase();
      setRouteName(`${pathName} ${freight.freightCode?.toString() ?? ""}`);
    }
  }, [freight, router.pathname]);

  useEffect(() => {
    if (freightStepContainerRef.current) {
      freightStepContainerRef.current.scrollTop = 0;
    }
  }, [freight]);

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
            <Header title={`FRETE EM CURSO ${freight?.freightCode ?? ""}`} />
          </div>
          <div className={styles.content}>
            <Body>
              {loading ? (
                <div className={styles.loadingContainer}>
                  <SmallLoading />
                </div>
              ) : error ? (
                <p>Erro ao carregar frete: {error.message}</p>
              ) : !freight ? (
                <p>Frete não encontrado</p>
              ) : (
                <div className={styles.freightInCurseContainer}>
                  <FreightInCurseHeader
                    freightCode={freight.freightCode?.toString() ?? ""}
                    statusFreight={freight.status as FreightStatus}
                    driverName={freight.targetedDrivers?.[0]?.name ?? ""}
                    origin={freight.origin ?? ""}
                    destination={freight.destination ?? ""}
                    driverPhoto={
                      (freight.targetedDrivers?.[0]?.userPhoto?.imageUrl ||
                        freight.targetedDrivers?.[0]?.userPhoto ||
                        "") as string
                    }
                    freightId={freight.id ?? ""}
                  />
                  <SeparatorIcon />
                  <ProgressBar currentStage={currentStage} />
                  <SeparatorIcon />
                  <div className={styles.freightInCurseOptionsContainer}>
                    <h2>Dados do embarque:</h2>
                    <FreightInCourseOptions
                      freightId={freight.id ?? ""}
                      currentStatus={freight.status as FreightStatus}
                      actionButtonText={getStatusText(freight.status)}
                      actionButtonStatus={getNextStatus(freight.status)}
                      value={freight.value}
                      advanceValue={freight.advanceValue}
                      balanceValue={freight.balanceValue}
                    />
                  </div>
                </div>
              )}
              <div
                className={styles.freightStepContainer}
                ref={freightStepContainerRef}
              >
                {freight?.statusHistory
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <FreightStep
                      key={`${item.status}-${item.updateDate || index}`}
                      {...getFreightStepProps(item, index, freight)}
                    />
                  ))}
              </div>

              <div className={styles.mapContainer}>
                <h2>Localização</h2>
                <LocationMap />
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default FreightInProgress;
