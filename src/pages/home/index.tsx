import React from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Home.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import { useQuery } from '@apollo/client';
import { GET_FREIGHT_STATISTICS, GET_OCCURRENCES_STATUS_COUNT, GET_NEW_DRIVERS_COUNT } from '@/graphql/queries/graphQueries';
import { GetFreightStatisticsData, GetOccurrencesStatusCountData, GetNewDriversCountData } from '@/utils/types/graphTypes';
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import FreightSummary from "@/components/Graphics/FreightSummary";
import AddNewFreightButton from "@/components/AddNewFreightButton";
import DailyFlow from "@/components/Graphics/DailyFlow";
import WeeklyFlow from "@/components/Graphics/WeeklyFlow";
import HighlightDashboard from "@/components/HighlightDashboard";
import PendingVouchers from "@/components/PendingVouchers";

const Home: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const routeName = router.pathname.replace("/", "").toUpperCase();

  const freightsStatusCount = useQuery<GetFreightStatisticsData>(GET_FREIGHT_STATISTICS);
  const occurrencesStatusCount = useQuery<GetOccurrencesStatusCountData>(GET_OCCURRENCES_STATUS_COUNT);
  const newDriversCount = useQuery<GetNewDriversCountData>(GET_NEW_DRIVERS_COUNT);

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
              <div className={styles.highlightDashboardContainer}>
                <HighlightDashboard
                  number={freightsStatusCount.data?.getFreightStatistics.freightsInProgress || 0}
                  title="fretes em andamento"
                  src=""
                />
                <HighlightDashboard
                  number={occurrencesStatusCount.data?.getOccurrencesStatusCount.unresolved || 0}
                  title="ocorrências"
                  src=""
                />
                <HighlightDashboard
                  number={newDriversCount.data?.getNewDriversCount.newDrivers || 0}
                  title="novos cadastros"
                  src=""
                />
                <HighlightDashboard
                  number={freightsStatusCount.data?.getFreightStatistics.freightsOpen || 0}
                  title="cargas em aberto"
                  src=""
                />
              </div>

              <div className={styles.daylyAndWeeklyCharts}>
                <WeeklyFlow />
                <DailyFlow />
              </div>

              <div className={styles.pieCharts}>
                <PendingVouchers />
                <FreightSummary />
              </div>

              <div className={styles.addFreightButton}>
                <AddNewFreightButton />
              </div>

            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Home;
