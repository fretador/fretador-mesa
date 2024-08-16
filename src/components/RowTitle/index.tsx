import React from "react";
import styles from "./RowTitle.module.css";

interface RowTitleProps {
  CityState: string;
  Cnpj: string;
  CorporateName: string;
  Cte: string;
  Customer: string;
  CustomerEmail: string;
  Driver: string;
  DriverStatus: string;
  FreightCode: string;
  FreightDate: string;
  FreightStatus: string;
  OccurrenceDate: string;
  OccurrenceStatus: string;
  OccurrenceType: string;
  PaymentDate: string;
  PaymentMethod: string;
  Route: string;
  TradeName: string;
  Value: string;
  Vehicle: string;
  WhatsApp: string;
}

const RowTitle: React.FC<RowTitleProps> = ({
  CityState,
  Cnpj,
  CorporateName,
  Cte,
  Customer,
  CustomerEmail,
  Driver,
  DriverStatus,
  FreightCode,
  FreightDate,
  FreightStatus,
  OccurrenceDate,
  OccurrenceStatus,
  OccurrenceType,
  PaymentDate,
  PaymentMethod,
  Route,
  TradeName,
  Value,
  Vehicle,
  WhatsApp,
}) => {
  return (
    <div className={styles.rowTitle}>
      <div>{CityState}</div>
      <div>{Cnpj}</div>
      <div>{CorporateName}</div>
      <div>{Cte}</div>
      <div>{Customer}</div>
      <div>{CustomerEmail}</div>
      <div>{Driver}</div>
      <div>{DriverStatus}</div>
      <div>{FreightCode}</div>
      <div>{FreightDate}</div>
      <div>{FreightStatus}</div>
      <div>{OccurrenceDate}</div>
      <div>{OccurrenceStatus}</div>
      <div>{OccurrenceType}</div>
      <div>{PaymentDate}</div>
      <div>{PaymentMethod}</div>
      <div>{Route}</div>
      <div>{TradeName}</div>
      <div>{Value}</div>
      <div>{Vehicle}</div>
      <div>{WhatsApp}</div>
    </div>
  );
};

export default RowTitle;
