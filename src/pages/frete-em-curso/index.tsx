import React, { useState, useEffect } from "react";
import Botao from "@/components/Botao";
import Body from "@/components/Body";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import styles from "./Freteemcurso.module.css";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import SearchComponent from "@/components/SearchButton";
import FreightInCurseHeader from "@/components/FreightInCurseHeader";
import { SeparatorIcon } from "@/utils/icons";
import ProgressBar from "@/components/ProgressBar";
import FreightInCurseOptions from "@/components/FreightInCurseOptions";
import FreightStep from "@/components/FreightStep";
import LocationMap from "@/components/LocationMap"; // Adicione esta linha

const FreightInProgress: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();

  const routeName = router.pathname.replace("/", "").replaceAll("-", " ").toUpperCase();

  // Definir o estado do estágio atual do frete
  const [currentStage, setCurrentStage] = useState(0); // Inicializa com o estágio 0

  // Simular a atualização do estágio atual do frete com dados mockados
  useEffect(() => {
    // Simula a atualização do estágio após 2 segundos
    setTimeout(() => {
      setCurrentStage(3); // Atualiza para o estágio 3 (Em rota)
    }, 2000);
  }, []);

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
              <div>
                <SearchComponent />
              </div>

              <div className={styles.freightInCurseContainer}>
                <FreightInCurseHeader
                  freightCode="14123"
                  statusFreight="em trânsito"
                  driverName="Gilberto Marcha Lenta"
                  cityOrigin="São Paulo"
                  stateOrigin="SP"
                  cityDestiny="Itarema"
                  stateDestiny="CE"
                />

                <SeparatorIcon />

                {/* Adicionar a barra de progresso aqui */}
                <ProgressBar currentStage={currentStage} />

                <SeparatorIcon />

                <div className={styles.freightInCurseOptionsContainer}>
                  <h2>Dados do embarque:</h2>
                  <FreightInCurseOptions />
                </div>
              </div>

              <FreightStep
                theme="dark"
                date="07/06/2024"
                hour="15:02:23"
                content="Frete solicitado pelo motorista"
              />

              <FreightStep
                theme="light"
                date="07/06/2024"
                hour="15:02:23"
                content="Autorizar embarque?"
                authorizeBoarding={true}
              />

              <FreightStep
                theme="dark"
                date="07/06/2024"
                hour="15:02:23"
                content="Motorista iniciou a viagem"
                actionButton={true}
                actionButtonText="rastrear"
                handleActionButton={() => console.log('Botão de ação clicado')}
              />

              <FreightStep
                theme="light"
                date="07/06/2024"
                hour="15:02:23"
                content="Anexo enviado pelo motorista"
                actionButton={true}
                actionButtonText="ver anexos"
                handleActionButton={() => console.log('Botão de ação clicado')}
                hasAttachment={true}
                attachmentPath="/driver-mock.png"
              />

              {/* Adicionar o componente LocationMap aqui */}
              <LocationMap />
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default FreightInProgress;
