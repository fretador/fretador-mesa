import React from "react";
import styles from './RecuperarSenha.module.css'
import CustomImage from "@/components/CustomImage";
import RecoverPasswordForm from "@/components/RecoverPasswordForm";

const RecoverPassword = () => {

  return (
    <main className={styles.main}>

      <div className={styles.contentContainer}>

        <div className={styles.titleContainer}>
          <p className={styles.title}>Bem-vindo a Fretador!</p>
          <p className={styles.subtitle}>Recuperar senha</p>
        </div>

        <RecoverPasswordForm />

        <div className={styles.footer}>
          <CustomImage
            src="/assets/images/logo-fretador.png"
            alt="Logo Fretador"
            width={241}
            height={91}
            className={styles.logoImage}
          />

          <div className={styles.footerTextContainer}>
            <p className={styles.footerText}>Quer saber mais sobre a plataforma? <a href="">Fale conosco.</a></p>
          </div>
        </div>

      </div>

      <div className={styles.backgroundContainer}>
      </div>

    </main>
  )
}

export default RecoverPassword
