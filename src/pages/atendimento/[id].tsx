import { useEffect, useState } from 'react';
import styles from './Atendimentos.module.css';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Body from '@/components/Body';
import { useAppSelector } from '@/store/store';
import Botao from '@/components/Botao';
import { BackIcon } from '@/utils/icons';
import { useSupportTicket } from '@/hooks/support/useSupportTicket';
import { useSendChatMessage } from '@/hooks/support/useSendChatMessage';
import { useCloseSupportTicket } from '@/hooks/support/useCloseSupportTicket';
import { useChatMessages } from '@/hooks/support/useChatMessages';
import { TicketStatusEnum } from '@/utils/enums/TicketStatusEnum';
import { formatDateToBrazilian } from '@/utils/dates';
import { useRouter } from 'next/router';
import { SenderTypeEnum } from '@/utils/enums/SenderTypeEnum';
import { ChatMessage } from '@/utils/interfaces/ChatMessage';

const ServiceDetails = () => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);
  const router = useRouter();
  const { id } = router.query;
  const [messageText, setMessageText] = useState('');

  const { ticket, loading, error, refetch } = useSupportTicket(id as string);
  const { sendMessage, sending, error: sendError } = useSendChatMessage(id as string);
  const { closeTicket, closing, error: closeError } = useCloseSupportTicket();
  const { newMessage } = useChatMessages(id as string);

  const [showResponseBox, setShowResponseBox] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(true);

  useEffect(() => {
    if (newMessage) {
      refetch();
    }
  }, [newMessage, refetch]);

  const handleSend = async () => {
    if (messageText.trim()) {
      try {
        await sendMessage({
          variables: {
            input: {
              ticketId: id as string,
              text: messageText,
              sender: SenderTypeEnum.SUPPORT
            }
          }
        });
        setMessageText('');
        setShowResponseBox(false);
        setShowActionButtons(true);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    }
  };

  const handleCloseTicket = async () => {
    try {
      await closeTicket({
        variables: { ticketId: id as string }
      });
      router.push('/atendimento');
    } catch (error) {
      console.error("Erro ao fechar ticket:", error);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "CLOSED": return "Finalizado";
      case "IN_PROGRESS": return "Em andamento";
      default: return "Aberto";
    }
  };

  if (error) return <p className={styles.error}>Erro ao carregar ticket: {error.message}</p>;

  return (
    <AuthenticatedLayout>
      <div className={styles.container}>
        <div>
          <Sidebar />
        </div>

        <div className={isRetracted ? styles.retractedContentWrapper : styles.contentWrapper}>
          <div className={styles.header}>
            <Header title={`Atendimento #${ticket?.id.slice(-8)}`} />
          </div>
          <div className={styles.content}>
            <Body>
              <div className={styles.backButtonContainer}>
                <Botao
                  text={
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <BackIcon /> <p style={{ fontWeight: "700" }}>Voltar</p>
                    </div>
                  }
                  className={styles.backButton}
                  onClick={() => router.push('/atendimento')}
                />
              </div>

              <div className={styles.serviceDetailsContainer}>
                <div className={styles.informations}>
                  <div className={styles.row}>
                    <p>Data: <span>{formatDateToBrazilian(ticket?.createdAt || '')}</span></p>
                    <p>Número do Ticket: <span>#{ticket?.id}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Assunto: <span>{ticket?.subject}</span></p>
                  </div>

                  <div className={styles.row}>
                    <p>Status: <span>{getStatusLabel(ticket?.status || '')}</span></p>
                  </div>

                  <div className={styles.chatHistory}>
                    <h3>Histórico de Mensagens</h3>
                    {ticket?.messages?.map((msg: ChatMessage) => (
                      <div
                        key={msg.id}
                        className={`${styles.messageBubble} ${msg.sender === "SUPPORT" ? styles.supportMessage : styles.userMessage
                          }`}
                      >
                        <p>{msg.text}</p>
                        <small>{formatDateToBrazilian(msg.createdAt)}</small>
                      </div>
                    ))}
                  </div>

                  {showActionButtons && !showResponseBox && ticket?.status !== TicketStatusEnum.CLOSED && (
                    <div className={styles.actionButtonsContainer}>
                      <Botao
                        text="Responder"
                        onClick={() => setShowResponseBox(true)}
                        className={styles.btnDark}
                        disabled={sending}
                      />
                      <Botao
                        text="Encerrar Ticket"
                        onClick={handleCloseTicket}
                        className={styles.btnLight}
                        disabled={closing}
                      />
                    </div>
                  )}

                  {showResponseBox && (
                    <div className={styles.responseContainer}>
                      <div className={styles.textAreaContainer}>
                        <textarea
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className={styles.responseTextArea}
                          placeholder="Digite sua resposta aqui"
                          disabled={sending}
                        />
                      </div>

                      <div className={styles.actionButtonsContainer}>
                        <Botao
                          text={sending ? "Enviando..." : "Enviar"}
                          onClick={handleSend}
                          className={styles.btnDark}
                          disabled={sending || !messageText.trim()}
                        />
                        <Botao
                          text="Cancelar"
                          onClick={() => {
                            setShowResponseBox(false);
                            setShowActionButtons(true);
                          }}
                          className={styles.btnLight}
                        />
                      </div>
                    </div>
                  )}

                  {(sendError || closeError) && (
                    <div className={styles.errorMessage}>
                      {sendError?.message || closeError?.message}
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

export default ServiceDetails;