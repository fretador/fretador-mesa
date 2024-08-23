import React from "react";
import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Ajuda.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";

const Help: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

  return (
    <div className={styles.container}>
      <div>
        <Sidebar />
      </div>

      <div
        className={
          isRetracted ? styles.retractedContentWrapper : styles.contentWrapper
        }
      >
        <div className={styles.header}>
          <Header title={routeName} />
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

export default Help;
