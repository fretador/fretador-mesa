import React, { useState, useEffect } from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Motoristas.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import SearchComponent from "@/components/SearchButton";
import AwaitingApprovalList from "@/components/AwaitingApprovalCards";
import StatusFilter from "@/components/StatusFilter";
import VehicleFilter from "@/components/VehicleFilter";
import DriversList from "@/components/ApprovedDriversList";
import { Driver } from "@/utils/interfaces/Driver";
import { DriverNode } from "@/utils/interfaces/DriverNode";
import { useQuery } from "@apollo/client";
import { GET_DRIVERS_QUERY } from "@/graphql/queries/driverQueries";

const Drivers: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

  // Estados para filtros e dados
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Funções para lidar com os filtros
  const handleStatusFilterApply = (searchTerm: string, statuses: string[]) => {
    setSearchTerm(searchTerm);
    setSelectedStatuses(statuses);
  };

  const handleStatusFilterCancel = () => {
    setSearchTerm("");
    setSelectedStatuses([]);
  };

  const handleVehicleFilterApply = (searchTerm: string, vehicles: string[]) => {
    setSearchTerm(searchTerm);
    setSelectedVehicles(vehicles);
  };

  const handleVehicleFilterCancel = () => {
    setSelectedVehicles([]);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleNewDriver = (driverId: string) => {
    router.push(`/aprovacao-cadastro-do-motorista/${driverId}`);
  };

  // Utilizando useQuery para buscar motoristas aguardando aprovação
  const {
    data: awaitingApprovalData,
    loading: awaitingApprovalLoading,
    error: awaitingApprovalError,
    refetch: refetchAwaitingApproval,
  } = useQuery(GET_DRIVERS_QUERY, {
    variables: {
      page: 1,
      limit: 10,
      filter: {
        status: ["PENDING"],
        vehicle: selectedVehicles.length > 0 ? selectedVehicles : undefined,
        searchTerm: searchTerm || undefined,
      },
    },
    fetchPolicy: "cache-first",
  });

  // Utilizando useQuery para buscar motoristas aprovados
  const {
    data: driversData,
    loading: driversLoading,
    error: driversError,
    refetch: refetchDrivers,
  } = useQuery(GET_DRIVERS_QUERY, {
    variables: {
      page: 1,
      limit: 10,
      filter: {
        status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
        vehicle: selectedVehicles.length > 0 ? selectedVehicles : undefined,
        searchTerm: searchTerm || undefined,
      },
    },
    fetchPolicy: "cache-first",
  });

  // useEffect para refetch quando filtros mudarem
  useEffect(() => {
    refetchAwaitingApproval();
    refetchDrivers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatuses, selectedVehicles, searchTerm]);

  // Extrair os motoristas dos dados retornados pelas queries
  const awaitingApprovalDrivers: Driver[] =
    awaitingApprovalData?.drivers?.edges.map((edge: DriverNode) => edge.node) || [];

  const drivers: Driver[] =
    driversData?.drivers?.edges.map((edge: DriverNode) => edge.node) || [];

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
                    type={"driver"}
                  />
                  <VehicleFilter
                    onApply={handleVehicleFilterApply}
                    onCancel={handleVehicleFilterCancel}
                  />
                </div>
              </div>

              <div className={styles.awaitingApprovalContainer}>
                <h2>Aguardando Aprovação</h2>
                <AwaitingApprovalList
                  drivers={awaitingApprovalDrivers}
                  loading={awaitingApprovalLoading}
                  error={
                    awaitingApprovalError
                      ? "Erro ao buscar motoristas aguardando aprovação"
                      : null
                  }
                />
              </div>

              <DriversList
                drivers={drivers}
                loading={driversLoading}
                error={
                  driversError ? "Erro ao buscar motoristas aprovados" : null
                }
              />
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Drivers;
