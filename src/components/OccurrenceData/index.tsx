import React, { useState } from "react";
import styles from './OccurrenceData.module.css'
import Botao from "../Botao";
import Image from "next/image";
import { useOccurrenceById } from "@/hooks/occurrence/useOccurrenceById";
import { useUpdateOccurrence } from "@/hooks/occurrence/useUpdateOccurrence";
import { useRouter } from 'next/router';
import AuthenticatedLayout from "../AuthenticatedLayout";
import { useAppSelector } from "@/store/store";
import SmallLoading from "../SmallLoading";
import { Occurrence } from "@/utils/Interfaces/Occurrence";
import { Playicon } from "@/utils/icons";
import { removeTypename } from "@/utils/removeTypename";
import { OccurrenceStatus } from "@/utils/enums/occurrenceStatusEnum";

const OccurrenceData = () => {

  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const boardUser = useAppSelector((state) => state.auth.boardUser);
  const router = useRouter();
  const { id } = router.query;
  const routeName = `Ocorrência ${id}`;
  const { data, loading, error, refetch } = useOccurrenceById(id as string);
  const { updateOccurrence } = useUpdateOccurrence(id as string);

  // Estados de UI
  const [showResponseBox, setShowResponseBox] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(true);
  const [responseMessage, setResponseMessage] = useState<string>('');

  // Estados de carregamento e feedback
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [isSendingResponse, setIsSendingResponse] = useState<boolean>(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
          boardUser: { name: boardUser?.name, profile: boardUser?.profile },
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
            boardUser: { name: boardUser?.name, profile: boardUser?.profile },
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
        <div className={styles.loadingContainer}>
          <SmallLoading />
        </div>
      </AuthenticatedLayout>
    );
  }

  if (error || !data) {
    return (
      <AuthenticatedLayout>
        <div className={styles.errorContainer}>
          <p>Erro ao carregar ocorrência: {error?.message}</p>
        </div>
      </AuthenticatedLayout>
    );
  }

  const occurrence: Occurrence = data;

  return (
    <div className={styles.occurrenceDetailsContainer}>
      <div className={styles.informations}>
        <div className={styles.row}>
          <p>OCORRÊNCIA: <span>{occurrence.id}</span></p>
          <p>Data: <span>{new Date(occurrence.creationDate).toLocaleDateString()}</span></p>
          <p>Frete número: <span>#{occurrence.freightCode}</span></p>
          <p>CTE: <span>{occurrence.numCte}</span></p>
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
  )
}

export default OccurrenceData