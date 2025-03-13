import React, { useState } from "react";
import { Row } from "../Row";
import { Driver } from "@/utils/interfaces/Driver";
import styles from "./ApprovedDriversList.module.css";
import RowTitle from "../RowTitle";
import SmallLoading from "../SmallLoading";
import { useRouter } from "next/router";

interface ApprovedDriversListProps {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
}

const ApprovedDriversList: React.FC<ApprovedDriversListProps> = ({
  drivers,
  loading,
  error,
}) => {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <SmallLoading />
      </div>
    );
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

  const handleDriverClick = (driverId: string) => {
    router.push(`/cadastro-do-motorista/${driverId}`);
  };

  const handleSortClick = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Ordenar os motoristas pelo nome
  const sortedDrivers = [...drivers].sort((a, b) => {
    const nameA = a.name?.toLowerCase() || '';
    const nameB = b.name?.toLowerCase() || '';

    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Aprovados</h2>
        <div className={styles.actionsButtons}>
          <h4 onClick={handleSortClick} style={{ cursor: 'pointer' }}>
            Ordenar {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
          </h4>
        </div>
      </div>

      <RowTitle
        Driver="Motorista"
        CityState="Cidade-ES"
        WhatsApp="Whatsapp"
        Vehicle="Veículo"
        DriverStatus="Status"
        titleStyles={{ color: "#1B556D", fontWeight: "700", fontSize: "20px" }}
      />
      <div className={styles.content}>
        {sortedDrivers.map((driver: Driver) => (
          <Row.Root
            key={driver.id}
            customBackgroundColor="#B2CEDA"
            onClick={() => handleDriverClick(driver.id)}
          >
            <Row.Driver
              driverPhotoUrl={driver.userPhoto?.imageUrl || "/driver-mock.png"}
              driverName={driver.name}
              showImage={true}
              textColor="#1B556D"
              textFontWeight="700"
            />
            <Row.CityState city={driver.city} state={driver.state} />
            <Row.WhatsApp whatsApp={driver.phoneNumber} />
            <Row.Vehicle vehicle={driver.vehicle?.vehicleType || "N/A"} />
            <Row.DriverStatus driverStatus={driver.status} />
          </Row.Root>
        ))}
      </div>
    </div>
  );
};

export default ApprovedDriversList;
