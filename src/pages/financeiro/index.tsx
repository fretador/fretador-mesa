import React from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Financeiro.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import SearchComponent from "@/components/SearchButton";
import EntriesCards from "@/components/EntriesCards";
import LastPaymentsList from "@/components/LastPayments";
import FinancialFilter from "@/components/FinancialFilter";

const Financial: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();

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
                <SearchComponent onSearch={() => { }} />
                <FinancialFilter />
              </div>

              <div className={styles.entriesContainer}>
                <h2>Entradas</h2>
                <EntriesCards />
              </div>

              <div className={styles.lastPaymentsContainer}>
                <LastPaymentsList />
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Financial;
