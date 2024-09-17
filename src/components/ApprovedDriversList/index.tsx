import React from "react";
import { Row } from "../Row";
import { Driver } from "@/utils/types/Driver";
import styles from './ApprovedDriversList.module.css';
import RowTitle from "../RowTitle";

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
  if (loading) return <p>Carregando motoristas...</p>;
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
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
          <Row.Root key={driver.id} customBackgroundColor="#B2CEDA">
            <Row.Driver
              driverPhotoUrl={driver.userPhoto?.imageUrl || '/driver-mock.png'}
              driverName={driver.name}
              showImage={true}
              textColor="#1B556D"
              textFontWeight="700"
            />
            <Row.CityState city={driver.city} state={driver.state} />
            <Row.WhatsApp whatsApp={driver.phoneNumber} />
            <Row.Vehicle vehicle={driver.vehicle?.type || 'N/A'} />
            <Row.DriverStatus driverStatus={driver.status} />
          </Row.Root>
        ))}
      </div>
    </div>
  );
};

export default ApprovedDriversList;
