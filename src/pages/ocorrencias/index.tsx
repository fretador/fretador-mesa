import React, { useState } from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Ocorrencias.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import SearchComponent from "@/components/SearchButton";
import PendingOccurrencesCards from "@/components/PendingOccurrencesCards";
import { Driver } from "@/utils/types/Driver";
import PendingOccurrencesCard from "@/components/PendingOccurrencesCard";

const Ocurrencies: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").replace("e", "ê").toUpperCase();

  const [awaitingApprovalDrivers, setAwaitingApprovalDrivers] = useState<Driver[]>([]);
  const [Drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
                <SearchComponent onSearch={() => {}} />
              </div>

              <div className={styles.pendingOccurrencesContainer}>
                <h2>Novos</h2>
                <PendingOccurrencesCards
                  loading={loading}
                  error={error}
                />
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Ocurrencies;
