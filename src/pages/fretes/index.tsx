import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "@/store/store";
import { useFreightController } from "@/controllers/freightController";
import { FreightFilters } from "@/utils/types/FreightFilters";
import { formatDateToBrazilian } from "@/utils/dates";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import RowTitle from "@/components/RowTitle";
import { Row } from "@/components/Row";
import StatusFilter from "@/components/StatusFilter";
import styles from "./Fretes.module.css";
import SearchComponent from "@/components/SearchButton";
import Body from "@/components/Body";
import AddNewFreightButton from "@/components/AddNewFreightButton";
import Loading from "@/components/Loading";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { Freight } from "@/utils/types/Freight";

const Freights: React.FC = () => {
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();
  const { loadFreights } = useFreightController();

  // Redux selectors
  const isRetracted = useSelector((state: RootState) => state.sidebar.isRetracted);
  const freights = useSelector((state: RootState) => state.freight.freights);
  const pageInfo = useSelector((state: RootState) => state.freight.pageInfo);
  const loading = useSelector((state: RootState) => state.freight.loading);
  const error = useSelector((state: RootState) => state.freight.error);

  // Local state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const adjustLimit = useCallback(() => {
    const height = window.innerHeight;
    if (height >= 950) {
      setLimit(10);
    } else if (height >= 800) {
      setLimit(8);
    } else if (height >= 720) {
      setLimit(7);
    } else {
      setLimit(5);
    }
  }, []);

  // Window resize effect
  useEffect(() => {
    adjustLimit();
    window.addEventListener("resize", adjustLimit);
    return () => window.removeEventListener("resize", adjustLimit);
  }, [adjustLimit]);

  const fetchFreights = useCallback(() => {
    const filters: FreightFilters = {
      status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
      allFilters: searchTerm || undefined,
    };
    loadFreights(filters, page, limit);
  }, [selectedStatuses, searchTerm, page, limit, loadFreights]);

  // Debounced fetch effect
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchFreights();
    }, 300); // Increased debounce time for better performance

    return () => clearTimeout(handler);
  }, [fetchFreights]);

  // Filter handlers
  const handleStatusFilterApply = useCallback((newSearchTerm: string, statuses: string[]) => {
    setSearchTerm(newSearchTerm);
    setSelectedStatuses(statuses);
    setPage(1); // Reset to first page when filters change
  }, []);

  const handleStatusFilterCancel = useCallback(() => {
    setSearchTerm("");
    setSelectedStatuses([]);
    setPage(1); // Reset to first page when filters are cleared
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page when search changes
  }, []);

  // Pagination handlers
  const handlePreviousPage = useCallback(() => {
    if (pageInfo?.hasPreviousPage && page > 1) {
      setPage(prev => prev - 1);
    }
  }, [pageInfo?.hasPreviousPage, page]);

  const handleNextPage = useCallback(() => {
    if (pageInfo?.hasNextPage) {
      setPage(prev => prev + 1);
    }
  }, [pageInfo?.hasNextPage]);

  const handleLastPage = useCallback(() => {
    if (pageInfo?.totalPages) {
      setPage(pageInfo.totalPages);
    }
  }, [pageInfo?.totalPages]);

  const handleFirstPage = useCallback(() => {
    setPage(1);
  }, []);

  const handleFreightClick = useCallback((freightId: string | undefined) => {
    if (!freightId) return;
    router.push(`/frete-em-curso/${freightId}`);
  }, [router]);

  const generateRandomCteAndClient = (freight: Freight): Freight => {
    if (freight.numCte && freight.clientName) return freight;

    return {
      ...freight,
      numCte: freight.numCte || `CTE-${Math.floor(Math.random() * 1000000)}`,
      clientName: freight.clientName || `Cliente-${Math.floor(Math.random() * 50)}`
    };
  };

  const renderFreightRows = () => (
    freights.map(freight => {
      const status = freight.status as FreightStatus;
      const updatedFreight = generateRandomCteAndClient(freight);

      return (
        <Row.Root
          key={updatedFreight.id || Math.random().toString()}
          freightStatus={status}
          onClick={() => handleFreightClick(updatedFreight.id)}
        >
          <Row.FreightDate
            date={
              updatedFreight.creationDate
                ? formatDateToBrazilian(updatedFreight.creationDate)
                : "Não informada"
            }
          />
          <Row.FreightCode
            code={updatedFreight.freightCode ? updatedFreight.freightCode.toString() : "-"}
          />
          <Row.Cte cte={updatedFreight.numCte || "-"} />
          <Row.Route
            originState={
              updatedFreight.origin
                ? updatedFreight.origin.split(", ")[1]
                : "Não informada"
            }
            destinyState={
              updatedFreight.destination
                ? updatedFreight.destination.split(", ")[1]
                : "Não informada"
            }
          />
          <Row.Customer
            customerName={updatedFreight.clientName || "-"}
          />
          <Row.Driver
            driverName={updatedFreight.targetedDrivers?.[0]?.name || "-"}
          />
          <Row.FreightStatus freightStatus={status} />
        </Row.Root>
      );
    })
  );

  return (
    <AuthenticatedLayout>
      <div className={styles.container}>
        <div>
          <Sidebar />
        </div>
        <div className={isRetracted ? styles.retractedContentWrapper : styles.contentWrapper}>
          <div className={styles.header}>
            <Header title={routeName} />
          </div>
          <div className={styles.content}>
            <Body>
              <div className={styles.searchComponents}>
                <SearchComponent onSearch={handleSearch} />
                <div className={styles.filterComponents}>
                  <StatusFilter
                    onApply={handleStatusFilterApply}
                    onCancel={handleStatusFilterCancel}
                    type="freight"
                  />
                </div>
              </div>

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
                <div className={styles.loadingContainer}>
                  <Loading />
                </div>
              ) : error ? (
                <p>Erro ao carregar os fretes: {error}</p>
              ) : (
                <>
                  {renderFreightRows()}
                  <div className={styles.pagination}>
                    <button
                      onClick={handleFirstPage}
                      disabled={page === 1}
                      className={styles.paginationButton}
                    >
                      Primeira Página
                    </button>
                    <button
                      onClick={handlePreviousPage}
                      disabled={!pageInfo?.hasPreviousPage || page === 1}
                      className={styles.paginationButton}
                    >
                      Página Anterior
                    </button>
                    <span className={styles.pageInfo}>
                      Página {page} de {pageInfo?.totalPages || 1}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={!pageInfo?.hasNextPage}
                      className={styles.paginationButton}
                    >
                      Próxima Página
                    </button>
                    <button
                      onClick={handleLastPage}
                          disabled={!pageInfo?.totalPages || pageInfo.totalPages === page}
                      className={styles.paginationButton}
                    >
                      Última Página
                    </button>
                  </div>
                </>
              )}

              <div className={styles.addFreightButton}>
                <AddNewFreightButton />
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Freights;
