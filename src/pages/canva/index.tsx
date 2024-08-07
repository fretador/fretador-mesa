import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Body from "@/components/Body";
import Counter from "@/components/Counter";
import styles from "./Canva.module.css";
import { Row } from "@/components/Row";
import { Root } from "../../../node_modules/domelementtype/lib/esm/index";

const Canva: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Sidebar user="Lili" />
        <div className={styles.content}>
          <Body />
          <Row.Root>
            <Row.FreightDate date={new Date()} />
            <Row.Cte cte="000000" />
            <Row.Route originState="SP" destinyState="RJ" />
          </Row.Root>
        </div>
      </div>
    </div>
  );
};

export default Canva;
