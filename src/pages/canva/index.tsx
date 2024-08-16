import React from "react";
import Header from "@/components/Header";
import { SidebarComp } from "@/components/SidebarComp";
import Body from "@/components/Body";
import styles from "./Canva.module.css";
import { Row } from "@/components/Row";
import RowTitle from "@/components/RowTitle";
import { useAppSelector } from "@/store/store";
import { mockBoardUsers } from "@/utils/mocks/mockBoardUsers";
import {
  HomeIcon,
  TruckIcon,
  PersonAddIcon,
  PeopleIcon,
  WarningIcon,
  FinanceIcon,
  SettingsIcon,
  SupportIcon,
  HelpIcon,
  LogoutIcon,
} from "@/utils/icons";
import Sidebar from "@/components/Sidebar";

const Canva: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);

  return (
    <div className={styles.container}>
      {/* <Sidebar /> */}

      <div
        className={
          isRetracted ? styles.retractedContentWrapper : styles.contentWrapper
        }
      >
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.content}>
          <Body>
            <RowTitle
              FreightDate="DATA"
              Cte="CTE"
              Route="ROTA"
              FreightCode="CÓDIGO"
              FreightCode="CÓDIGO"
              Customer="CLIENTE"
              TradeName="NOME FANTASIA"
              Value="VALOR"
              CityState="CIDADE"
              Cnpj="CNPJ"
               CorporateName="RAZAO SOCIAL"
               CustomerEmail="EMAIL"
               Driver="MOTORISTA"
               DriverStatus="STATUS MOTORISTA"
               FreightStatus="STATUS FRETE"
               OccurrenceDate="DATA OCORRENCIA"
               OccurrenceStatus="STATUS OCORRENCIA"
               OccurrenceType="TIPO OCORRENCIA"
               PaymentDate="DATA PAGAMENTO"
               PaymentMethod="FORMA PAGAMENTO"
               Vehicle="VEICULO"
               WhatsApp="WHATSAPP"
            />
            <Row.Root>
              <Row.FreightDate date={new Date()} />
              <Row.Cte cte="000000" />
              <Row.Route originState="SP" destinyState="RJ" />
              <Row.FreightCode code={"ABC123"} />
              <Row.FreightCode code={"ABC123"} />
              <Row.Customer customerName={"Joaquim José da Silva Xavier"} />
              <Row.TradeName tradeName={"BRASIL LOG TRANSPORTADORA"} />
              <Row.Value value={3500.5} />
            </Row.Root>
          </Body>
        </div>
      </div>
    </div>
  );
};

export default Canva;
