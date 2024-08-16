import React from "react";

import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./index.module.css";
import { useAppSelector } from "@/store/store";

const Home: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);

  return (
    <div className={styles.container}>
      <Sidebar />

      <div
        className={
          isRetracted ? styles.retractedContentWrapper : styles.contentWrapper
        }
      >
        <div className={styles.header}>
          <Header title={"HOME"} />
        </div>
        <div className={styles.content}>
          <Body>
            <div></div>
          </Body>
        </div>
      </div>
    </div>
  );
};

export default Home;
