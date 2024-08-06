import React from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Body from "@/components/Body";
import Counter from "@/components/Counter";
import styles from "./Canva.module.css";

const Canva: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Sidebar user="Lili" />
        <div className={styles.content}>
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Canva;
