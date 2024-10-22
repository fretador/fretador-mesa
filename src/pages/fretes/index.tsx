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

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const handleStatusFilterApply = (searchTerm: string, statuses: string[]) => {
    setSearchTerm(searchTerm);
    setSelectedStatuses(statuses);
  };

  const handleStatusFilterCancel = () => {
    setSearchTerm("");
    setSelectedStatuses([]);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const fetchFreights = () => {
    const filters: FreightFilters = {
      status:
        selectedStatuses.length > 0 ? (selectedStatuses as [string]) : undefined,
      allFilters: searchTerm || undefined,
    };

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
  }, [searchTerm, selectedStatuses, page, limit]);

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

  const handleFreightClick = (freightId: string) => {
    router.push(`/frete-em-curso/${freightId}`);
  };

  const generateRandomCteAndClient = (freight: Freight) => {
    const updatedFreight = { ...freight };
    if (!updatedFreight.numCte) {
      updatedFreight.numCte = `CTE-${Math.floor(Math.random() * 1000000)}`;
    }
    if (!updatedFreight.clientName) {
      updatedFreight.clientName = `Cliente-${Math.floor(Math.random() * 50)}`;
    }
    return updatedFreight;
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
                <SearchComponent onSearch={handleSearch} />
                <div className={styles.filterComponents}>
                  <StatusFilter
                    onApply={handleStatusFilterApply}
                    onCancel={handleStatusFilterCancel}
                    type={"freight"}
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
                  {freights.map((freight) => {
                    const status: FreightStatus =
                      freight.status as FreightStatus;
                    const updatedFreight = generateRandomCteAndClient(freight);
                    return (
                      <Row.Root
                        key={updatedFreight.id}
                        freightStatus={status}
                        onClick={() => handleFreightClick(updatedFreight.id)}
                      >
                        <Row.FreightDate
                          date={formatDateToBrazilian(
                            updatedFreight.creationDate
                          )}
                        />
                        <Row.FreightCode
                          code={updatedFreight.freightCode.toString()}
                        />
                        <Row.Cte cte={updatedFreight.numCte || "-"} />
                        <Row.Route
                          originState={updatedFreight?.origin?.split(", ")[1]}
                          destinyState={
                            updatedFreight?.destination?.split(", ")[1]
                          }
                        />
                        <Row.Customer
                          customerName={updatedFreight.clientName || "-"}
                        />
                        <Row.Driver
  driverName={
    updatedFreight?.targetedDrivers?.length > 0
      ? updatedFreight.targetedDrivers[0].name
      : "-"
  }
/>
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
