import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDriverController } from "@/controllers/driverController";
import styles from './ApprovedDriversList.module.css';
import RowTitle from "../RowTitle";
import { Row } from "../Row";

const ApprovedDriversList: React.FC = () => {
  const { loadDrivers } = useDriverController();
  const { drivers, loading, error } = useSelector((state: any) => state.driver.driversByStatus['APPROVED'] || {});

  useEffect(() => {
    loadDrivers(1, 10, { status: 'APPROVED' });
  }, [loadDrivers]);

  if (loading) return <p>Carregando motoristas...</p>;
  if (error) return <p>Erro ao carregar motoristas: {error}</p>;

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
        {drivers?.map((driver: any) => (
          <Row.Root key={driver.id} customBackgroundColor="#B2CEDA">
            <Row.Driver
              driverPhotoUrl={driver.driverPhoto?.url || '/driver-mock.png'}
              driverName={driver.name}
              showImage={true}
              textColor="#1B556D"
              textFontWeight="700"
            />
            <Row.CityState city={driver.city} state={driver.state} />
            <Row.WhatsApp whatsApp={driver.phoneNumber} />
            <Row.Vehicle vehicle={driver.vehicle?.type || 'N/A'} />
            <Row.DriverStatus driverStatus="aprovado" />
          </Row.Root>
        ))}
      </div>
    </div>
  );
};

export default ApprovedDriversList;
