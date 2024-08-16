import React from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Fretes.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import FreightList from '../../components/ExampleFreights/FreightList';

const Freights: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

  return (
    <div className={styles.container}>
      <Sidebar />

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
            <FreightList />
          </Body>
        </div>
      </div>
    </div>
  );
};

export default Freights;
