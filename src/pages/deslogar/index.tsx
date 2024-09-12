import React from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Deslogar.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import { useAuthController } from "@/controllers/authController";

const Logout: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").toUpperCase();

  useAuthController().logoutUser();

  return (
    <div className={styles.container}>
      <Sidebar />
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
            <h1>Deslogando...</h1>
            <p>Você está sendo deslogado do sistema.</p>
            <button onClick={() => router.push("/")}>Voltar para a Página Inicial</button>
          </Body>
        </div>
      </div>
    </div>
  );
};

export default Logout;
