import React from "react";
import styles from './AlterarSenha.module.css'
import LoginForm from "@/components/LoginForm";
import CustomImage from "@/components/CustomImage";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";

const ChangePassword = () => {
  return (
    <AuthenticatedLayout>
      <main className={styles.main}>

        <div className={styles.contentContainer}>

          <div className={styles.titleContainer}>
            <p className={styles.title}>Alterar senha Fretador</p>
          </div>

          <ChangePasswordForm />

          <div className={styles.footer}>
            <CustomImage
              src="/assets/images/logo-fretador.png"
              alt="Logo Fretador"
              width={241}
              height={91}
              className={styles.logoImage}
            />

            <div className={styles.footerTextContainer}>
              <p className={styles.footerText}>Quer saber mais sobre a plataforma? <a href="https://www.fretador.com.br/contato" target="_blank" rel="noopener">Fale conosco.</a></p>
            </div>
          </div>

        </div>

        <div className={styles.backgroundContainer}>
        </div>

      </main>
    </AuthenticatedLayout>
  )
}

export default ChangePassword