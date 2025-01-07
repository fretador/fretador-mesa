import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './Ocorrencias.module.css';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Body from '@/components/Body';
import { useAppSelector } from '@/store/store';
import { BackIcon } from '@/utils/icons';
import Botao from '@/components/Botao';
import Notification from '@/components/Notification';
import OccurrenceData from '@/components/OccurrenceData';
import OccurrenceHistory from '@/components/OccurrenceHistory';

const OccurrenceDetails: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const routeName = `Ocorrência ${id}`;
  const [activeTab, setActiveTab] = useState("dados");
  const [sendError, setSendError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const backButtonContent = (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <BackIcon /> <p style={{ fontWeight: "700" }}>Voltar</p>
    </div>
  );

  const handleGoBack = () => {
    router.back();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dados":
        return (
          <div>
            <OccurrenceData />
          </div>
        );
      case "historico":
        return (
          <div>
            <OccurrenceHistory />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AuthenticatedLayout>
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
              {/* Renderização do Notification fora das condições */}
              {successMessage && (
                <Notification
                  message={successMessage}
                  type="success"
                  onClose={() => setSuccessMessage(null)}
                />
              )}
              {sendError && (
                <Notification
                  message={sendError}
                  type="error"
                  onClose={() => setSendError(null)}
                />
              )}

              <div className={styles.backButtonContainer}>
                <Botao text={backButtonContent} className={styles.backButton} onClick={handleGoBack} />
              </div>

              <div className={styles.mainContentContainer}>
                <div className={styles.menu}>
                  <button
                    onClick={() => setActiveTab("dados")}
                    className={
                      activeTab === "dados"
                        ? styles.activeTabButton
                        : styles.tabButton
                    }
                  >
                    Ocorrência
                  </button>
                  <button
                    onClick={() => setActiveTab("historico")}
                    className={
                      activeTab === "historico"
                        ? styles.activeTabButton
                        : styles.tabButton
                    }
                  >
                    Histórico de ocorrências do motorista
                  </button>
                </div>
                <div className={styles.content}>{renderContent()}</div>
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default OccurrenceDetails;
