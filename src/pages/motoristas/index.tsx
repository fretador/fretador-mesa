import React from "react";
import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Motoristas.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import SearchComponent from "@/components/SearchButton";
import AwaitingApprovalCard from "@/components/AwaitingApprovalCard";
import AwaitingApprovalList from "@/components/AwaitingApprovalCards";
import StatusFilter2 from "@/components/StatusFilter2";
import VehicleFilter from "@/components/VehicleFilter";
import ApprovedDriversList from "@/components/ApprovedDriversList";

const Drivers: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

  const handleNewDriver = () => {
    console.log("Motorista selecionado")
  }

  return (
    <AuthenticatedLayout>
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

              <div className={styles.searchComponents}>
                <SearchComponent />
                <div className={styles.filterComponents}>
                  <StatusFilter2 />
                  <VehicleFilter />
                </div>
              </div>

              <div className={styles.awaitingApprovalContainer}>
                <h2>Aguardando Aprovação</h2>
                <AwaitingApprovalList />
              </div>

              <ApprovedDriversList />
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Drivers;
