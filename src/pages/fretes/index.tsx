import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState, useAppSelector } from "@/store/store";
import { useFreightController } from "@/controllers/freightController";
import { FreightFilters } from "@/utils/types/FreightFilters";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import RowTitle from "@/components/RowTitle";
import { Row } from "@/components/Row";
import styles from "./Fretes.module.css";

type FreightStatusOption = "DISPONIVEL" | "INDISPONIVEL" | "EM_TRANSITO"; // Ajuste conforme necessário

const Freights: React.FC = () => {
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const { loadFreights } = useFreightController();
  const freights = useSelector((state: RootState) => state.freight.freights);
  const pageInfo = useSelector((state: RootState) => state.freight.pageInfo);
  const loading = useSelector((state: RootState) => state.freight.loading);
  const error = useSelector((state: RootState) => state.freight.error);

  const [page] = useState(1);
  const [limit] = useState(10);
  const [filters] = useState<FreightFilters>({});
  const [shouldFetchFreights, setShouldFetchFreights] = useState(true);

  const fetchFreights = useCallback(() => {
    if (shouldFetchFreights) {
      loadFreights(filters, page, limit);
      setShouldFetchFreights(false);
    }
  }, [loadFreights, filters, page, limit, shouldFetchFreights]);

  useEffect(() => {
    fetchFreights();
  }, [fetchFreights]);

  useEffect(() => {
    if (!loading && !error) {
      console.log("Lista de Fretes:", freights);
    }
  }, [loading, error, freights]);

  const formatDateToBrazilian = (timestamp: string): string => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  return (
    <AuthenticatedLayout>
      <div className={styles.container}>
        <Sidebar />
        <div
          className={
            isRetracted ? styles.retractedContentWrapper : styles.contentWrapper
          }
        >
          <div className={styles.header}>
            <Header title={routeName} />
          </div>
          <div className={styles.content}>
            <RowTitle
              FreightDate="DATA"
              FreightCode="CÓDIGO"
              Cte="CTE"
              Route="ROTA"
              Customer="CLIENTE"
              Driver="MOTORISTA"
              FreightStatus="STATUS"
            />
            {loading ? (
              <p>Carregando...</p>
            ) : error ? (
              <p>Erro ao carregar os fretes: {error}</p>
            ) : (
              freights.map((freight) => (
                <Row.Root
                  key={freight.id}
                  freightStatus={freight.status as FreightStatusOption}
                >
                  <Row.FreightDate
                    date={formatDateToBrazilian(freight.creationDate)}
                  />
                  <Row.FreightCode code={freight.freightCode.toString()} />
                  <Row.Cte cte={freight.numCte || "N/A"} />
                  <Row.Route
                    originState={freight.gatheringState}
                    destinyState={freight.deliveryState}
                  />
                  <Row.Customer customerName={freight.clientName} />
                  <Row.Driver driverName={freight.driver} />
                  <Row.FreightStatus
                    freightStatus={freight.status as FreightStatusOption}
                  />
                </Row.Root>
              ))
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Freights;
