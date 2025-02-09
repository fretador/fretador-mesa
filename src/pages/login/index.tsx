import React from "react";
import styles from './Login.module.css'
import LoginForm from "@/components/LoginForm";
import CustomImage from "@/components/CustomImage";

const Login = () => {
  return (
    <main className={styles.main}>

      <div className={styles.contentContainer}>

        <div className={styles.titleContainer}>
          <p className={styles.title}>Bem-vindo a Fretador!</p>
        </div>

        <LoginForm />

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
  )
}

export default Login