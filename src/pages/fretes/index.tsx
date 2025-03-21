/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Freight } from "@/utils/Interfaces/Freight";
import { FreightFilters } from "@/utils/Interfaces/FreightFilters";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
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
import { formatDateToBrazilian } from "@/utils/dates";
import { FreightNode } from "@/utils/Interfaces/FreightNode";
import { useRouter } from "next/router";
import { extractState } from "@/utils/utils";
import { SESSION_STORAGE_KEYS } from "@/utils/helpers/storageHelper";
import Pagination from "@/components/Pagination";
import SmallLoading from "@/components/SmallLoading";
import { useFreights } from "@/hooks/freight/useFreights";

const Freights: React.FC = () => {
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();
  const isRetracted = useSelector((state: RootState) => state.sidebar.isRetracted);

  const isBrowser = typeof window !== "undefined";

  // Initialize state from session storage
  const [page, setPage] = useState(() => {
    if (isBrowser) {
      const savedPage = sessionStorage.getItem(SESSION_STORAGE_KEYS.PAGE);
      return savedPage ? Number(savedPage) : 1;
    }
    return 1;
  });

  const [limit, setLimit] = useState(10);

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(() => {
    if (isBrowser) {
      const savedStatuses = sessionStorage.getItem(SESSION_STORAGE_KEYS.SELECTED_STATUSES);
      return savedStatuses ? JSON.parse(savedStatuses) : [];
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState(() => {
    if (isBrowser) {
      return sessionStorage.getItem(SESSION_STORAGE_KEYS.SEARCH_TERM) || "";
    }
    return "";
  });

  // Save state to session storage when it changes
  useEffect(() => {
    if (isBrowser) {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.PAGE, String(page));
    }
  }, [page]);

  useEffect(() => {
    if (isBrowser) {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.SELECTED_STATUSES, JSON.stringify(selectedStatuses));
    }
  }, [selectedStatuses]);

  useEffect(() => {
    if (isBrowser) {
      sessionStorage.setItem(SESSION_STORAGE_KEYS.SEARCH_TERM, searchTerm);
    }
  }, [searchTerm]);

  const { data, loading, error } = useFreights({
    page,
    limit,
    filter: {
      status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
      searchTerm: searchTerm || undefined,
    } as FreightFilters,
  });

  const freights: Freight[] = data?.edges.map((edge: FreightNode) => edge.node || []) || [];
  const pageInfo = data?.pageInfo;

  // Adjust limit based on window height
  const adjustLimit = useCallback(() => {
    const height = window.innerHeight;
    if (height >= 950) setLimit(10);
    else if (height >= 800) setLimit(8);
    else if (height >= 720) setLimit(6);
    else setLimit(5);
  }, []);

  useEffect(() => {
    adjustLimit();
    window.addEventListener("resize", adjustLimit);
    return () => window.removeEventListener("resize", adjustLimit);
  }, [adjustLimit]);

  // Handlers for filter and search
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
    setPage(1); // Reset to first page when search term changes
  }, []);

  // Handlers for pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Função para renderizar as linhas dos fretes
  const renderFreightRows = () =>
    freights.map((freight) => {
      const status = freight.status as FreightStatus;
      return (
        <Row.Root
          key={freight.id || Math.random().toString()}
          freightStatus={status}
          onClick={() => router.push(`/frete-em-curso/${freight.id}`)}
        >
          <Row.FreightDate date={formatDateToBrazilian(freight.creationDate || new Date())} />
          <Row.FreightCode code={String(freight.freightCode) || "-"} />
          <Row.Cte cte={freight.numCte || "-"} />
          <Row.Route
            originState={extractState(freight.origin)}
            destinyState={extractState(freight.destination)}
          />
          <Row.Customer customerName={freight.clientName || "-"} />
          <Row.Driver driverName={freight.targetedDrivers?.[0]?.name || "-"} />
          <Row.FreightStatus freightStatus={status} />
        </Row.Root>
      );
    });

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
                <StatusFilter onApply={handleStatusFilterApply} onCancel={handleStatusFilterCancel} type="freight" />
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
                  <SmallLoading />
                </div>
              ) : error ? (
                <p>Erro ao carregar os fretes: {error.message}</p>
              ) : (
                <>
                  {renderFreightRows()}
                  <div className={styles.pagination}>
                    <Pagination
                      currentPage={page}
                      totalPages={pageInfo?.totalPages ? pageInfo?.totalPages : 1}
                      onPageChange={handlePageChange}
                    />
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
