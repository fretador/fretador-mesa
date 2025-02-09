import React from "react";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import FormContainer from "@/components/FormContainer"; // Importa o FormContainer
import styles from "./CriarFretes.module.css";

const CreateFreight: React.FC = () => {
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
            <Header title={"Cadastrar Nova Carga"} />
          </div>
          <div className={styles.content}>
            <Body>
              {/* Substituímos o formulário pelo FormContainer */}
              <FormContainer />
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CreateFreight;
