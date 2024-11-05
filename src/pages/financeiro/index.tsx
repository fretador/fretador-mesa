import React, { useState, useEffect } from "react";
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

const Financial: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();

  const [entriesData, setEntriesData] = useState<Freight[]>([]);
  const [lastPaymentsData, setLastPaymentsData] = useState<Freight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FinancialFilterInput>({});

  const fetchEntriesData = async () => {
    setLoading(true);
    try {
      const result = await FinancialService.getFreightsForFinancial(
        { ...filters, status: [FreightStatus.FINANCIAL_REQUIRED] },
        1,
        10
      );
      setEntriesData(result.data);
    } catch (error: any) {
      setError(error?.message ?? "Erro ao carregar fretes de entrada");
    } finally {
      setLoading(false);
    }
  };

  const fetchLastPaymentsData = async () => {
    setLoading(true);
    try {
      const result = await FinancialService.getFreightsForFinancial(
        { ...filters, status: [FreightStatus.FINANCIAL_APPROVED] },
        1,
        10
      );
      setLastPaymentsData(result.data);
    } catch (error: any) {
      setError(error?.message ?? "Erro ao carregar últimos pagamentos");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (newFilters: FinancialFilterInput) => {
    setFilters(newFilters);
    fetchEntriesData();
    fetchLastPaymentsData();
  };

  const handleSearch = (term: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchText: term,
    }));
    fetchEntriesData();
    fetchLastPaymentsData();
  };

  useEffect(() => {
    fetchEntriesData();
    fetchLastPaymentsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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
