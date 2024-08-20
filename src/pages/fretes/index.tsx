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
import StatusFilter from "@/components/StatusFilter";
import styles from "./Fretes.module.css";

type FreightStatusOption =
  | "DISPONIVEL"
  | "INDISPONIVEL"
  | "EM_TRANSITO"
  | "WAITING"
  | "APPROVED"
  | "IN_PROGRESS"
  | "FINISHED"
  | undefined;

const Freights: React.FC = () => {
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const { loadFreights } = useFreightController();
  const freights = useSelector((state: RootState) => state.freight.freights);
  const pageInfo = useSelector((state: RootState) => state.freight.pageInfo);
  const loading = useSelector((state: RootState) => state.freight.loading);
  const error = useSelector((state: RootState) => state.freight.error);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState<FreightFilters>({});
  const [shouldFetchFreights, setShouldFetchFreights] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const fetchFreights = useCallback(() => {
    if (shouldFetchFreights) {
      loadFreights(filters, page, limit);
      setShouldFetchFreights(false);
    }
  }, [filters, page, limit, shouldFetchFreights, loadFreights]);

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

  const handleApplyFilters = (newFilters: {
    searchTerm: string;
    selectedStatuses: string[];
  }) => {
    const updatedFilters = {
      ...filters,
      status: newFilters.selectedStatuses.join(","), // Join the array into a comma-separated string
      search: newFilters.searchTerm,
    };

    console.log("Updated Filters:", updatedFilters); // Log do objeto de filtros atualizado

    setFilters(updatedFilters);
    setPage(1); // Resetar a página ao aplicar novos filtros
    setShouldFetchFreights(true);
    setShowFilter(false);
  };

  const handleCancelFilter = () => {
    setShowFilter(false);
  };

  const handleNextPage = () => {
    if (pageInfo.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
      setShouldFetchFreights(true);
    }
  };

  const handlePreviousPage = () => {
    if (pageInfo.hasPreviousPage && page > 1) {
      setPage((prevPage) => prevPage - 1);
      setShouldFetchFreights(true);
    }
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
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={styles.filterButton}
            >
              Filtrar Status
            </button>
          </div>
          {showFilter && (
            <StatusFilter
              onApply={handleApplyFilters}
              onCancel={handleCancelFilter}
            />
          )}
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
              <>
                {freights.map((freight) => {
                  const status: FreightStatusOption =
                    freight.status as FreightStatusOption;
                  return (
                    <Row.Root key={freight.id} freightStatus={status}>
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
                  );
                })}
                <div className={styles.pagination}>
                  <button
                    onClick={handlePreviousPage}
                    disabled={!pageInfo?.hasPreviousPage || page === 1}
                    className={styles.paginationButton}
                  >
                    Página Anterior
                  </button>
                  <span className={styles.pageInfo}>
                    Página {page} de {pageInfo?.totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={!pageInfo?.hasNextPage}
                    className={styles.paginationButton}
                  >
                    Próxima Página
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Freights;
