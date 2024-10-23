import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import styles from './Atendimentos.module.css';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Body from '@/components/Body';
import { useAppSelector } from '@/store/store';
import Botao from '@/components/Botao';
import Image from 'next/image';
import { BackIcon } from '@/utils/icons';
import { mockRepliedMessages } from '@/components/RepliedMessagesList';

interface Service {
  id: string,
  serviceNumber: string,
  serviceDate: string,
  cte: string,
  subject: string,
  serviceStatus: string,
  driverName: string,
  driverPhotoUrl: string,
  route: string,
  attachments: string[],
  driverMessage: string
}

const ServiceDetails = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState<Service | null>(null)
  const routeName = `Atendimento ${id}`;
  const [showResponseBox, setShowResponseBox] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(true)

  const backButtonContent = (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <BackIcon /> <p style={{ fontWeight: "700" }}>Voltar</p>
    </div>
  );

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    if (id) {
      const foundService = mockRepliedMessages.find(
        (mrm) => mrm.id === id
      );
      setService(foundService || null);
    }
  }, [id]);

  if (!service) {
    return <p>Carregando...</p>;
  }

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
                <Botao text={backButtonContent} className={styles.backButton} onClick={handleGoBack} />
              </div>

              <div className={styles.serviceDetailsContainer}>
                <div className={styles.informations}>
                  <div className={styles.row}>
                    <p>Data: <span>{service.serviceDate}</span></p>
                    <p>Atendimento número: <span>{service.serviceNumber}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Assunto: <span>{service.subject}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Nome do Motorista: <span>{service.driverName}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Comentário</p>
                  </div>

                  <div className={styles.textContainer}>
                    <p>{service.driverMessage}</p>
                  </div>

                  {showActionButtons &&
                    <div className={styles.actionButtonsContainer}>
                      <Botao text="Responder" onClick={() => {
                        setShowResponseBox(true)
                        setShowActionButtons(false)
                      }} className={styles.btnDark} />
                      <Botao text="Encerrar" onClick={() => console.log('Encerrou')} className={styles.btnLight} />
                    </div>
                  }

                  {showResponseBox && (
                    <div className={styles.responseContainer}>

                      <div className={styles.row}>
                        <p>Resposta ao motorista</p>
                      </div>

                      <div className={styles.textAreaContainer}>
                        <textarea
                          className={styles.responseTextArea}
                          placeholder="Digite sua resposta aqui"
                        />
                      </div>


                      <div className={styles.actionButtonsContainer}>
                        <Botao
                          text="Enviar"
                          onClick={() => {
                            console.log('Resposta enviada');
                            setShowResponseBox(false);
                            setShowActionButtons(true)
                          }}
                          className={styles.btnDark}
                        />
                        <Botao
                          text="Cancelar"
                          onClick={() => {
                            setShowResponseBox(false)
                            setShowActionButtons(true)
                          }}
                          className={styles.btnLight}
                        />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </Body>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default ServiceDetails;