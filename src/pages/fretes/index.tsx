import React, { useEffect, useState } from "react";
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
import StatusFilter2 from "@/components/StatusFilter2";
import styles from "./Fretes.module.css";
import SearchComponent from "@/components/SearchButton";
import Body from "@/components/Body";
import AddNewFreightButton from "@/components/AddNewFreightButton";
import Loading from "@/components/Loading";
import { FreightStatus } from "@/utils/enums/freightStatusEnum"; // Importando o enum correto

const Freights: React.FC = () => {
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();
  const isRetracted = useSelector(
    (state: RootState) => state.sidebar.isRetracted
  );

  const { loadFreights } = useFreightController();

  const freights = useSelector((state: RootState) => state.freight.freights);
  const pageInfo = useSelector((state: RootState) => state.freight.pageInfo);
  const loading = useSelector((state: RootState) => state.freight.loading);
  const error = useSelector((state: RootState) => state.freight.error);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<FreightFilters>({});
  const [showFilter, setShowFilter] = useState(true);

  const adjustLimit = () => {
    const height = window.innerHeight;

    if (height >= 950) {
      setLimit(10);
    } else if (height >= 800 && height < 950) {
      setLimit(8);
    } else if (height >= 720 && height < 800) {
      setLimit(7);
    } else if (height < 720) {
      setLimit(5);
    }
  };

  useEffect(() => {
    adjustLimit();

    window.addEventListener("resize", adjustLimit);

    return () => {
      window.removeEventListener("resize", adjustLimit);
    };
  }, []);

  const handleApplyFilters = (
    searchTerm: string,
    selectedStatuses: FreightStatus[] // Usando o enum FreightStatus aqui
  ) => {
    const updatedFilters: FreightFilters = {
      ...filters,
      status: selectedStatuses.join(","), // Usando os valores do enum diretamente
    };

    if (searchTerm) {
      updatedFilters.deliveryCity = searchTerm;
      updatedFilters.gatheringCity = searchTerm;
    }

    console.log("Updated Filters:", updatedFilters);

    setFilters(updatedFilters);
    setPage(1);
  };

  const handleCancelFilter = () => {
    setFilters({});
    setShowFilter(false);
  };

  const fetchFreights = () => {
    loadFreights(filters, page, limit);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchFreights();
    }, 100);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, page, limit]);

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageInfo?.hasPreviousPage && page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // Função para redirecionar para a página de detalhes do frete
  const handleFreightClick = (freightId: string) => {
    router.push(`/frete-em-curso/${freightId}`); // Exemplo de redirecionamento
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
              <div className={styles.searchComponents}>
                <SearchComponent />
                <StatusFilter2 />
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
                  {freights.map((freight) => {
                    const status: FreightStatus =
                      freight.status as FreightStatus;
                    return (
                      <Row.Root
                        key={freight.id}
                        freightStatus={status}
                        onClick={() => handleFreightClick(freight.id)}
                      >
                        <Row.FreightDate
                          date={formatDateToBrazilian(freight.creationDate)}
                        />
                        <Row.FreightCode
                          code={freight.freightCode.toString()}
                        />
                        <Row.Cte cte={freight.numCte || "N/A"} />
                        <Row.Route
                          originState={freight.gatheringState}
                          destinyState={freight.deliveryState}
                        />
                        <Row.Customer customerName={freight.clientName} />
                        <Row.Driver driverName={freight.driver} />
                        <Row.FreightStatus freightStatus={status} />
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
                      Página {page} de {pageInfo?.totalPages || 1}
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
