import { useRouter } from 'next/router';
import React, { useState } from 'react';
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
import { useOccurrenceById } from '@/hooks/occurrence/useOccurrenceById';
import { useUpdateOccurrence } from '@/hooks/occurrence/useUpdateOccurrence';
import { Occurrence } from '@/utils/Interfaces/Occurrence';
import Notification from '@/components/Notification';
import { removeTypename } from '@/utils/utils';
import { OccurrenceStatus } from "@/utils/enums/occurrenceStatusEnum";

const OccurrenceDetails: React.FC = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error, refetch } = useOccurrenceById(id as string);
  const { updateOccurrence } = useUpdateOccurrence();
  const routeName = `Ocorrência ${id}`;

  // Estados de UI
  const [showResponseBox, setShowResponseBox] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(true);
  const [responseMessage, setResponseMessage] = useState<string>('');

  // Estados de carregamento e feedback
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [isSendingResponse, setIsSendingResponse] = useState<boolean>(false);
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

  const handleSendResponse = async () => {
    if (!id || !responseMessage.trim()) {
      setSendError('A resposta não pode estar vazia.');
      return;
    }

    setIsSendingResponse(true);
    setSendError(null);

    try {
      // Remover __typename das mensagens existentes
      const cleanedMessages = data?.messages.map(message => removeTypename(message)) || [];

      // Adicionar a nova mensagem sem __typename
      const updatedMessages = [
        ...cleanedMessages,
        {
          message: responseMessage,
          boardUser: "Admin User",
          admin: true,
          createdDate: new Date().toISOString(),
        }
      ];

      await updateOccurrence({
        variables: {
          id: id as string,
          input: {
            messages: updatedMessages,
            updateAcknowledge: true,
          },
        },
      });

      // Refetch para atualizar os dados
      await refetch();
      setShowResponseBox(false);
      setShowActionButtons(true);
      setResponseMessage('');
      setSuccessMessage('Resposta enviada com sucesso.');
    } catch (err) {
      setSendError('Erro ao enviar resposta.');
      console.error(err);
    } finally {
      setIsSendingResponse(false);
    }
  };

  // Função para resolver a ocorrência
  const handleResolveOccurrence = async () => {
    if (!id) {
      setSendError('ID da ocorrência não encontrado.');
      return;
    }

    setIsResolving(true);
    setSendError(null);

    try {
      await updateOccurrence({
        variables: {
          id: id as string,
          input: {
            occurrenceStatus: OccurrenceStatus.RESOLVED,
          },
        },
      });

      // Refetch para atualizar os dados
      await refetch();

      setSuccessMessage('Ocorrência resolvida com sucesso.');
    } catch (err) {
      setSendError('Erro ao resolver a ocorrência.');
      console.error(err);
    } finally {
      setIsResolving(false);
    }
  };

  if (loading) {
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
                <div className={styles.loadingContainer}>
                  <Loading />
                </div>
              </Body>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  if (error || !data) {
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
                <div className={styles.errorContainer}>
                  <p>Erro ao carregar ocorrência: {error?.message}</p>
                </div>
              </Body>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  const occurrence: Occurrence = data;

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

              <div className={styles.occurrenceDetailsContainer}>
                <div className={styles.informations}>
                  <div className={styles.row}>
                    <p>OCORRÊNCIA: <span>{occurrence.id}</span></p>
                    <p>Data: <span>{new Date(occurrence.creationDate).toLocaleDateString()}</span></p>
                    <p>Frete número: <span>#{occurrence.id}</span></p>
                    <p>CTE: <span>{occurrence.id}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Rota: <span>{occurrence.route || occurrence.type}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Nome do Motorista: <span>{occurrence.driverName || occurrence.userId}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Tipo de Ocorrência: <span>{occurrence.occurrenceType || occurrence.type}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Arquivo do motorista</p>
                  </div>

                  <div className={styles.rowPictures}>
                    {occurrence.attachments?.map((item, index) => (
                      <Image
                        key={index}
                        src={item.url}
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
                          <p>{occurrence.observations || occurrence.messages[0]?.message}</p>
                        </div>
                      )
                  }

                  {showActionButtons &&
                    <div className={styles.actionButtonsContainer}>
                      <Botao
                        text={isResolving ? "Resolvend..." : "Resolver ocorrência"}
                        onClick={handleResolveOccurrence}
                        className={styles.btnDark}
                        disabled={isResolving || isSendingResponse}
                      />
                      <Botao
                        text="Responder motorista"
                        onClick={() => {
                          setShowResponseBox(true);
                          setShowActionButtons(false);
                        }}
                        className={styles.btnLight}
                        disabled={isResolving || isSendingResponse}
                      />
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
                          value={responseMessage}
                          onChange={(e) => setResponseMessage(e.target.value)}
                          disabled={isSendingResponse}
                        />
                      </div>

                      <div className={styles.actionButtonsContainer}>
                        <Botao
                          text={isSendingResponse ? "Enviando..." : "Enviar"}
                          onClick={handleSendResponse}
                          disabled={isSendingResponse || !responseMessage.trim()}
                          className={styles.btnDark}
                        />
                        <Botao
                          text="Cancelar"
                          onClick={() => {
                            setShowResponseBox(false);
                            setShowActionButtons(true);
                          }}
                          className={styles.btnLight}
                          disabled={isSendingResponse || isResolving}
                        />
                      </div>

                      {sendError && <p className={styles.errorText}>{sendError}</p>}
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
