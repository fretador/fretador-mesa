import React, { useState } from "react";
import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Atendimentos.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import SearchComponent from "@/components/SearchButton";
import NewMessagesCard from "@/components/NewMessagesCard";
import NewMessagesCards from "@/components/NewMessagesCards";

const Service: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
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

          </Body>
        </div>
      </div>
    </div>
  );
};

export default Service;
