import React, { useState } from "react";
import { useQuery } from "@apollo/client";
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
import { GET_FREIGHTS_FOR_FINANCIAL } from "@/graphql/queries/financialQueries";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { FinancialFilterInput } from "@/utils/types/FinancialFilterInput";
import { FreightNode } from "@/utils/types/FreightNode";

const Financial: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();
  const [filters, setFilters] = useState<FinancialFilterInput>({});

  const { data: entriesData, loading: loadingEntries, error: errorEntries } = useQuery(
    GET_FREIGHTS_FOR_FINANCIAL,
    {
      variables: {
        page: 1,
        limit: 20,
        filter: { ...filters, status: [FreightStatus.FINANCIAL_REQUIRED] },
      },
      fetchPolicy: "network-only",
    }
  );

  const { data: lastPaymentsData, loading: loadingPayments, error: errorPayments } = useQuery(
    GET_FREIGHTS_FOR_FINANCIAL,
    {
      variables: {
        page: 1,
        limit: 10,
        filter: { ...filters, status: [FreightStatus.FINANCIAL_APPROVED] },
      },
      fetchPolicy: "network-only",
    }
  );

  const handleApplyFilters = (newFilters: FinancialFilterInput) => {
    setFilters(newFilters);
  };

  const handleSearch = (term: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchText: term,
    }));
  };

  return (
    <AuthenticatedLayout>
      <div className={styles.container}>
        <div>
          <Sidebar />
        </div>
        <div className={isRetracted ? styles.retractedContentWrapper : styles.contentWrapper}>
          <div className={styles.header}>
            <Header title={routeName} />
          </div>
          <div className={styles.content}>
            <Body>
              <div className={styles.searchComponents}>
                <SearchComponent onSearch={handleSearch} />
                <FinancialFilter onApplyFilters={handleApplyFilters} />
              </div>

              <div className={styles.entriesContainer}>
                <h2>Entradas</h2>
                <EntriesCards
                  data={entriesData?.freightsForFinancial.edges.map((edge: FreightNode) => edge.node) || []}
                  loading={loadingEntries}
                />
                {errorEntries && <p className={styles.error}>Erro ao carregar fretes de entrada</p>}
              </div>

              <div className={styles.lastPaymentsContainer}>
                <LastPaymentsList
                  data={lastPaymentsData?.freightsForFinancial.edges.map((edge: FreightNode) => edge.node) || []}
                  loading={loadingPayments}
                />
                {errorPayments && <p className={styles.error}>Erro ao carregar últimos pagamentos</p>}
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Financial;
