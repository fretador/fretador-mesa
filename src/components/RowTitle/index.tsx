import React from "react";
import styles from "./RowTitle.module.css";

interface RowTitleProps {
  CityState?: string;
  Cnpj?: string;
  CollectionLocation?: string;
  Contract?: string;
  CorporateName?: string;
  Cte?: string;
  Customer?: string;
  CustomerEmail?: string;
  DeliveryLocation?: string;
  Driver?: string;
  DriverStatus?: string;
  FreightCode?: string;
  FreightDate?: string;
  FreightStatus?: string;
  NF?: string;
  OccurrenceDate?: string;
  OccurrenceStatus?: string;
  OccurrenceType?: string;
  PaymentDate?: string;
  PaymentMethod?: string;
  PaymentType?: string;
  Route?: string;
  ServiceDate?: string;
  ServiceNumber?: string;
  ServiceSubject?: string;
  ServiceStatus?: string;
  TradeName?: string;
  Value?: string;
  Vehicle?: string;
  WhatsApp?: string;
  titleStyles?: React.CSSProperties;
}

const RowTitle: React.FC<RowTitleProps> = (props) => {
  const fields = Object.entries(props).filter(
    ([key, value]) => key !== "titleStyles" && value
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {fields.map(([key, value]) => (
          <p key={key} style={props.titleStyles}>
            {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RowTitle;
