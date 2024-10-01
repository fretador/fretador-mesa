import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { getStageFromStatus } from "@/utils/getStageFromStatusFreight";
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

const useFreightData = (freightId: string) => {
  const [loading, setLoading] = useState(false);
  const [freight, setFreight] = useState<Freight | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState(0);

  const fetchFreightData = useCallback(async () => {
    try {
      console.log("Fetching freight data...");
      setLoading(true);
      const freightData = await FreightService.getFreightById(freightId);
      console.log("Fetched freight data:", freightData);
      setFreight(freightData);
      setCurrentStage(getStageFromStatus(freightData.status as FreightStatus));
    } catch (err) {
      setError("Erro ao carregar os dados do frete");
      console.error("Erro ao buscar dados do frete:", err);
    } finally {
      setLoading(false);
    }
  }, [freightId]);

  const refreshFreightData = useCallback(() => {
    console.log("Refreshing freight data...");
    fetchFreightData();
  }, [fetchFreightData]);

  useEffect(() => {
    if (freightId) {
      fetchFreightData();
    }
  }, [freightId, fetchFreightData]);

  return { loading, freight, error, currentStage, refreshFreightData };
};

const getFreightStepProps = (
  item: StatusHistoryItem,
  index: number,
  freight: Freight | null
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
    // ... casos existentes ...
    default:
      content = `Status: ${item.status}`;
  }

  const updateData = item.updateData ?? [];

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
    updateData, // Adicionado aqui
  };
};

const FreightInProgress: React.FC<FreightInProgressProps> = ({ freightId }) => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { loading, freight, error, currentStage, refreshFreightData } =
    useFreightData(freightId);
  const [routeName, setRouteName] = useState("");
  const freightStepContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (freight) {
      const pathName = router.pathname
        .replace("/", "")
        .replaceAll("-", " ")
        .toUpperCase();
      setRouteName(`${pathName} ${freight.freightCode.toString()}`);
    }
  }, [freight, router.pathname]);

  const handleDocumentsUploaded = useCallback(() => {
    console.log("Documents uploaded, refreshing freight data");
    refreshFreightData();
  }, [refreshFreightData]);

  useEffect(() => {
    if (freightStepContainerRef.current) {
      freightStepContainerRef.current.scrollTop = 0;
    }
  }, [freight]);

  // if (loading) {
  //   return <Loading />;
  // }

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
                  <ProgressBar currentStage={currentStage} />
                  <SeparatorIcon />
                  <div className={styles.freightInCurseOptionsContainer}>
                    <h2>Dados do embarque:</h2>
                    <FreightInCourseOptions
                      freightId={freight.id}
                      onDocumentsUploaded={handleDocumentsUploaded}
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
                      key={`${item.status}-${item.updateDate}`}
                      {...getFreightStepProps(item, index, freight)}
                    />
                  ))}
              </div>
              <LocationMap />
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default FreightInProgress;
