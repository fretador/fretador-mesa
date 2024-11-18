import React from "react";
import { Row } from "../Row";
import { Driver } from "@/utils/Interfaces/Driver";
import styles from "./ApprovedDriversList.module.css";
import RowTitle from "../RowTitle";
import Loading from "../Loading";
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

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

  const handleDriverClick = (driverId: string) => {
    router.push(`/cadastro-do-motorista/${driverId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Aprovados</h2>
        <h4>Ordenar A-Z</h4>
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
        {drivers.map((driver: Driver) => (
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
