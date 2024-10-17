import React, { useState } from "react";
import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Ajuda.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import { MagniFyingGlassIcon } from "@/utils/icons";
import Image from "next/image";
import QuestionList from "@/components/QuestionsList";

const Help: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log("Buscando pergunta", searchValue);
  };

  const routeName = router.pathname.replace("/", "").toUpperCase();

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
            <div className={styles.mainContent}>
              <h2>Central de Ajuda</h2>

              <div className={styles.searchAndImageContainer}>
                <div className={styles.searchAndButtonsContainer}>
                  <div className={styles.searchContainer}>
                    <input
                      type="text"
                      className={styles.searchInput}
                      placeholder="Buscar"
                      onChange={handleInputChange}
                      value={searchValue}
                      // onKeyDown={handleSearchSubmit}
                    />
                    <MagniFyingGlassIcon className={styles.searchIcon} />
                  </div>
                  <div className={styles.buttonsContainer}>
                    <Botao text="Registrar ticket" className={styles.btnDark} onClick={() => console.log('Registrou ticket')} />
                    <Botao text="Meus tickets" className={styles.btnLight} onClick={() => console.log('Visualizou tickets')} />
                  </div>
                </div>

                <div className={styles.questionMarkImageContainer}>
                  <Image src={"./assets/images/interrogacao.png"} width={260} height={260} alt="interrogação" />
                </div>
              </div>

              <h2>Dúvidas frequentes</h2>

              <div className={styles.scrollView}>
                <QuestionList />
              </div>


            </div>
          </Body>
        </div>
      </div>
    </div>
  );
};

export default Help;
