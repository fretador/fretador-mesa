/* eslint-disable react-hooks/exhaustive-deps */
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
import { Driver } from "@/utils/types/Driver";
import { DriverService } from "@/services/driverService";

const Drivers: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

  // Estados para filtros e dados
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [awaitingApprovalDrivers, setAwaitingApprovalDrivers] = useState<
    Driver[]
  >([]);
  const [Drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  // Função para buscar motoristas aguardando analise
  const fetchAwaitingApprovalDrivers = async () => {
    setLoading(true);
    setError(null);

    try {
      const filter = {
        status: ["PENDING"],
        vehicle: selectedVehicles.length > 0 ? selectedVehicles : undefined,
        allFilters: searchTerm || undefined,
      };

      const response = await DriverService.getDrivers(1, 10, filter);
      setAwaitingApprovalDrivers(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao buscar motoristas"
      );
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar motoristas
  const fetchDrivers = async () => {
    setLoading(true);
    setError(null);

    try {
      const filter = {
        status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
        vehicle: selectedVehicles.length > 0 ? selectedVehicles : undefined,
        allFilters: searchTerm || undefined,
      };

      const response = await DriverService.getDrivers(1, 10, filter);
      setDrivers(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao buscar motoristas"
      );
    } finally {
      setLoading(false);
    }
  };

  // useEffect para buscar motoristas sempre que os filtros mudarem
  useEffect(() => {
    if (awaitingApprovalDrivers.length === 0) {
      fetchAwaitingApprovalDrivers();
    }
    fetchDrivers();
  }, [selectedStatuses, selectedVehicles, searchTerm]);

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
                  loading={loading}
                  error={error}
                  handleNewDriver={handleNewDriver}
                />
              </div>

              <DriversList drivers={Drivers} loading={loading} error={error} />
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Drivers;
