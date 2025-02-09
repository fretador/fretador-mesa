import React from "react";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
// import FormQuote from "@/components/FormQuote";
import styles from "./Cotacao.module.css";

const CreateQuote: React.FC = () => {
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
            <Header title={"Cotar Frete"} />
          </div>
          <div className={styles.content}>
            <Body>
              <h1>Cotação</h1>
              {/* Substituímos o formulário pelo FormContainer */}
              {/* <FormQuote /> */}
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CreateQuote;
