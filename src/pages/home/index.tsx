import React from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Home.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
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

  const values = [10,20,30]

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
                <HighlightDashboard number="40" title="fretes em andamento" src="" />
                <HighlightDashboard number="12" title="ocorrências" src="" />
                <HighlightDashboard number="21" title="novos cadastros" src="" />
                <HighlightDashboard number="16" title="cargas em aberto" src="" />
              </div>

              <div className={styles.daylyAndWeeklyCharts}>
                <WeeklyFlow />
                <DailyFlow cancelledFreights={400} newFreights={60} />
              </div>

              <div className={styles.pieCharts}>
                <PendingVouchers />
                <FreightSummary values={values} />
                {/* <FreightSummary values={values} /> */}
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
