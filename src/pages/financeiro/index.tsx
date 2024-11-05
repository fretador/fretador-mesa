import React, { useState, useEffect, useCallback } from "react";
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
import { FinancialService } from "@/services/financialService";
import { Freight } from "@/utils/types/Freight";
import { FreightStatus } from "@/utils/enums/freightStatusEnum";
import { FinancialFilterInput } from "@/utils/types/FinancialFilterInput";
import { usePaymentUpdate } from "@/contexts/PaymentUpdateContext";

const Financial: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();
  const { needsUpdate, setNeedsUpdate } = usePaymentUpdate();

  const [entriesData, setEntriesData] = useState<Freight[]>([]);
  const [lastPaymentsData, setLastPaymentsData] = useState<Freight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FinancialFilterInput>({});

  const fetchEntriesData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await FinancialService.getFreightsForFinancial(
        { ...filters, status: [FreightStatus.FINANCIAL_REQUIRED] },
        1,
        20
      );
      setEntriesData(result.data);
    } catch (error: any) {
      setError(error?.message ?? "Erro ao carregar fretes de entrada");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchLastPaymentsData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await FinancialService.getFreightsForFinancial(
        { ...filters, status: [FreightStatus.FINANCIAL_APPROVED] },
        1,
        10
      );
      console.log("Atualizando lastPaymentsData", result.data);
      setLastPaymentsData(result.data);
    } catch (error: any) {
      setError(error?.message ?? "Erro ao carregar últimos pagamentos");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleApplyFilters = useCallback((newFilters: FinancialFilterInput) => {
    setFilters(newFilters);
    fetchEntriesData();
    fetchLastPaymentsData();
  }, [fetchEntriesData, fetchLastPaymentsData]);

  const handleSearch = useCallback((term: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchText: term,
    }));
    fetchEntriesData();
    fetchLastPaymentsData();
  }, [fetchEntriesData, fetchLastPaymentsData]);

  useEffect(() => {
    fetchEntriesData();
    fetchLastPaymentsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    if (needsUpdate) {
      console.log("needsUpdate true, atualizando lista de últimos pagamentos");

      setTimeout(() => {
        fetchLastPaymentsData();
        setNeedsUpdate(false);
      }, 100); // Espera 100ms antes de atualizar, ajuda a evitar problemas de sincronização
    }
  }, [needsUpdate, fetchLastPaymentsData, setNeedsUpdate]);

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
                <EntriesCards data={entriesData} loading={loading} />
              </div>

              <div className={styles.lastPaymentsContainer}>
                <LastPaymentsList data={lastPaymentsData} loading={loading} />
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Financial;
