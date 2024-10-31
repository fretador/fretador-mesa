import React, { useEffect } from "react";
import styles from "./Deslogar.module.css";
import { useRouter } from "next/router";
import { useAuthController } from "@/controllers/authController";
import Botao from "@/components/Botao";
import { FretadorIcon } from "@/utils/icons";
import Image from "next/image";

const Logout: React.FC = () => {
  const router = useRouter();
  const authController = useAuthController();

  useEffect(() => {
    authController.logoutUser();
  }, [authController]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image src={"./assets/images/logo-fretador.png"} alt="logo-fretador" width={0} height={0} sizes="100vw" style={{ width: '50%', height: 'auto' }} />
        <h2>Sessão Encerrada</h2>
        <p></p>
        <Botao text="Fazer Login" onClick={() => router.push("/")} className={styles.button} />
      </div>
    </div>
  );
};

export default Logout;
