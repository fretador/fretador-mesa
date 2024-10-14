import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import styles from './Ocorrencias.module.css';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Body from '@/components/Body';
import { useAppSelector } from '@/store/store';
import { BackIcon, Playicon } from '@/utils/icons';
import Botao from '@/components/Botao';
import Image from 'next/image';

interface Occurrence {
  freightCode: string;
  freightDate: string;
  occurrenceType: string;
  occurrenceStatus: string;
  driverName: string;
  driverPhotoUrl: string;
  id: string,
  cte: string,
  route: string,
  attachments: [string],
  observations: string
}

const mockOccurrences = [
  {
    id: "01",
    freightCode: "12345678",
    freightDate: "01/01/2024",
    cte: "1234",
    occurrenceType: "Veículo Parado",
    occurrenceStatus: "respondido",
    driverName: "Zé do Frete",
    driverPhotoUrl: "/driver-mock.png",
    route: "RJ X SP",
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "audio"
  },
  {
    id: "02",
    freightCode: "87654321",
    freightDate: "02/01/2024",
    cte: "1234",
    occurrenceType: "Carga Avariada",
    occurrenceStatus: "em aberto",
    driverName: "Maria da Estrada",
    driverPhotoUrl: "/driver-mock.png",
    route: "CE X SP",
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "texto"
  },
  {
    id: "03",
    freightCode: "11223344",
    freightDate: "03/01/2024",
    cte: "1234",
    occurrenceType: "Atraso na Entrega",
    occurrenceStatus: "reaberto",
    driverName: "João Pé na Estrada",
    driverPhotoUrl: "/driver-mock.png",
    route: "SP X RO",
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "audio"
  },
  {
    id: "04",
    freightCode: "11223366",
    freightDate: "03/01/2024",
    cte: "1234",
    occurrenceType: "Atraso na Entrega",
    occurrenceStatus: "finalizado",
    driverName: "João Pé na Estrada",
    driverPhotoUrl: "/driver-mock.png",
    route: "RS X SP",
    attachments: ["/driver-mock.png", "/driver-mock.png", "/driver-mock.png"],
    observations: "text"
  },
];

const OccurrenceDetails = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const [occurrence, setOccurrence] = useState<Occurrence | null>(null);
  const routeName = `Ocorrência ${id}`;
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
      const foundOccurrence = mockOccurrences.find(
        (occ) => occ.id === id
      );
      setOccurrence(foundOccurrence || null);
    }
  }, [id]);

  if (!occurrence) {
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

              <div className={styles.occurrenceDetailsContainer}>
                <div className={styles.informations}>
                  <div className={styles.row}>
                    <p>OCORRÊNCIA: <span>{occurrence.id}</span></p>
                    <p>Data: <span>{occurrence.freightDate}</span></p>
                    <p>Frete número: <span>#{occurrence.freightCode}</span></p>
                    <p>CTE: <span>{occurrence.cte}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Rota: <span>{occurrence.route}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Nome do Motorista: <span>{occurrence.driverName}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Tipo de Ocorrência: <span>{occurrence.occurrenceType}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Arquivo do motorista</p>
                  </div>

                  <div className={styles.rowPictures}>
                    {occurrence.attachments.map((item, index) => (
                      <Image 
                        key={index}
                        src={item}
                        alt={"Arquivo do motorista"}
                        width={142}
                        height={154}
                      />
                    ))}
                  </div>

                  <div className={styles.row}>
                    <p>Observação adicional</p>
                  </div>

                  {
                    occurrence.observations === "audio" ? (
                      <div className={styles.audioContainer}>
                        <div className={styles.audioBar}></div>
                        <div className={styles.playIcon}>
                          <Playicon />
                        </div>
                      </div>
                    ) :
                    (
                      <div className={styles.textContainer}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis eius, exercitationem iure autem nam quos natus distinctio omnis dignissimos quasi quis asperiores nostrum labore maxime libero sit. Deleniti, voluptas blanditiis!</p>
                      </div>
                    )
                  }

                  {showActionButtons &&
                    <div className={styles.actionButtonsContainer}>
                      <Botao text="Resolver ocorrência" onClick={() => console.log('Resolveu')} className={styles.btnDark} />
                      <Botao text="Responder motorista" onClick={() => {
                        setShowResponseBox(true)
                        setShowActionButtons(false)
                      }} className={styles.btnLight} />
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
   
  );
};

export default OccurrenceDetails;
