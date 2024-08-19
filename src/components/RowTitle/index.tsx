import React from "react";
import styles from "./RowTitle.module.css";

interface RowTitleProps {
  CityState?: string;
  Cnpj?: string;
  CorporateName?: string;
  Cte?: string;
  Customer?: string;
  CustomerEmail?: string;
  Driver?: string;
  DriverStatus?: string;
  FreightCode?: string;
  FreightDate?: string;
  FreightStatus?: string;
  OccurrenceDate?: string;
  OccurrenceStatus?: string;
  OccurrenceType?: string;
  PaymentDate?: string;
  PaymentMethod?: string;
  Route?: string;
  TradeName?: string;
  Value?: string;
  Vehicle?: string;
  WhatsApp?: string;
}

const RowTitle: React.FC<RowTitleProps> = (props) => {
  const fields = Object.entries(props).filter(([key, value]) => value);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {fields.map(([key, value]) => (
          <p key={key}>{value}</p>
        ))}
      </div>
    </div>
  );
};

export default RowTitle;
