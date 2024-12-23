import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './Clientes.module.css';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Body from '@/components/Body';
import { useAppSelector } from '@/store/store';
import Botao from '@/components/Botao';
import { BackIcon } from '@/utils/icons';
import ClientData from '@/components/ClientDetails';
import ClientFreightsHistory from '@/components/ClientFreightsHistory';

const ClientDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const routeName = `Cliente #${id}`;

  const backButtonContent = (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <BackIcon /> <p style={{ fontWeight: '700' }}>Voltar</p>
    </div>
  );

  const handleGoBack = () => {
    router.back();
  };

  const [activeTab, setActiveTab] = useState("dados");

  const renderContent = () => {
    switch (activeTab) {
      case "dados":
        return (
          <div>
            <ClientData handleLatestShipmentsButton={() => setActiveTab("historico")} />
          </div>
        );
      case "historico":
        return (
          <div>
            <ClientFreightsHistory />
          </div>
        );
      default:
        return null;
    }
  };

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
              <div className={styles.backButtonContainer}>
                <Botao
                  text={backButtonContent}
                  className={styles.backButton}
                  onClick={handleGoBack}
                />
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
                    Dados do cliente
                  </button>
                  <button
                    onClick={() => setActiveTab("historico")}
                    className={
                      activeTab === "historico"
                        ? styles.activeTabButton
                        : styles.tabButton
                    }
                  >
                    Histórico de embarque
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

export default ClientDetails;
