import React from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Home.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import SearchComponent from "@/components/SearchButton";
import FreightSummary from "@/components/Graphics/FreightSummary";
import StatusFilter2 from "@/components/StatusFilter2";
import AddNewFreightButton from "@/components/AddNewFreightButton";
import DailyFlow from "@/components/Graphics/DailyFlow";

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
              {/* <div className={styles.searchComponents}>
                <SearchComponent />
                <StatusFilter2 />
              </div> */}

              <div style={{display: 'flex', gap: '20px', marginBottom: '24px'}}>
                <FreightSummary values={values} />
                <FreightSummary values={values} />
              </div>

              <div>
                <DailyFlow cancelledFreights={400} newFreights={60} />
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
