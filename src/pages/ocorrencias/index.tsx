// src/pages/ocorrencias.tsx
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
import AnsweredOccurrencesList from "@/components/AnsweredOccurrencesList";
import { useOccurrences } from "@/hooks/occurrence/useOccurrences";

const Ocurrencies: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").replace("e", "ê").toUpperCase();

  const [page, setPage] = useState<number>(1);
  const limit = 20;

  const { data, loading, error, refetch } = useOccurrences({
    page,
    limit,
    filter: {},
  });

  const handleSearch = (searchTerm: string) => {
    refetch({
      page: 1,
      limit,
      filter: {
        searchTerm: searchTerm || undefined,
      },
    });
  };

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
                <SearchComponent onSearch={handleSearch} />
              </div>

              <div className={styles.pendingOccurrencesContainer}>
                <h2>Novos</h2>
                <PendingOccurrencesCards
                  loading={loading}
                  error={error ? error.message : null}
                  occurrences={data?.edges.map(edge => edge.node) || []}
                />
              </div>

              <AnsweredOccurrencesList
                loading={loading}
                error={error ? error.message : null}
                occurrences={data?.edges.map(edge => edge.node) || []}
              />
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Ocurrencies;
