import React, { useState } from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Atendimentos.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import SearchComponent from "@/components/SearchButton";
import NewMessagesCards from "@/components/NewMessagesCards";
import RepliedMessagesList from "@/components/RepliedMessagesList";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

const Service: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

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
              
              <div className={styles.newMessagesContainer}>
                <h2>Novos</h2>
                <NewMessagesCards
                  loading={loading}
                  error={error}
                />
              </div>

              <RepliedMessagesList loading={loading} error={error} />

            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Service;
