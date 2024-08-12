import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Body from "@/components/Body";
import styles from "./Canva.module.css";
import { Row } from "@/components/Row";
import { useAppSelector } from "@/store/store";

const Canva: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Sidebar user="Lili" />
        <div
          className={
            isRetracted ? styles.contentRetracted : styles.contentExpanded
          }
        >
          <Body>
            <Row.Root>
              <Row.FreightDate date={new Date()} />
              <Row.Cte cte="000000" />
              <Row.Route originState="SP" destinyState="RJ" />
              <Row.FreightCode code={'ABC123'}/>
              <Row.Customer customerName={'Joaquim José da Silva Xavier'}/>
              <Row.TradeName tradeName={'BRASIL LOG TRANSPORTADORA'}/>
            </Row.Root>
          </Body>
        </div>
      </div>
    </div>
  );
};

export default Canva;
