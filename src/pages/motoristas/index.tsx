import React, { useState } from "react";
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
import { useDrivers } from "@/hooks/driver/useDrivers";

const Drivers: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();

  // Estados para filtros
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Busca motoristas aguardando aprovação
  const {
    data: awaitingApprovalData,
    loading: awaitingApprovalLoading,
    error: awaitingApprovalError,
  } = useDrivers({
    page: 1,
    limit: 10,
    filter: {
      status: ["PENDING", "CONFIRMED"],
      vehicle: selectedVehicles.length > 0 ? selectedVehicles : undefined,
      searchTerm: searchTerm || undefined,
    },
  });

  // Busca motoristas aprovados
  const {
    data: driversData,
    loading: driversLoading,
    error: driversError,
  } = useDrivers({
    page: 1,
    limit: 10,
    filter: {
      status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
      vehicle: selectedVehicles.length > 0 ? selectedVehicles : undefined,
      searchTerm: searchTerm || undefined,
    },
  });

  // Manipuladores de filtros
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

  // Extrai os motoristas dos dados
  const awaitingApprovalDrivers: Driver[] =
    awaitingApprovalData?.edges.map((edge: DriverNode) => edge.node) || [];

  const drivers: Driver[] =
    driversData?.edges.map((edge: DriverNode) => edge.node) || [];

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