import React from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Body from "../../components/Body";
import styles from "./Canva.module.css";

const Canva: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <Body />
      </div>
    </div>
  );
};

export default Canva;
