import React from "react";
import { useNotificationsList } from "@/hooks/notification/useNotificationsList";
import { useAcknowledgeNotification } from "@/hooks/notification/useAcknowledgeNotification";
import styles from "./NotificationsList.module.css";
import { formatDateTime } from "@/utils/dates";
import { BoardUserProfile } from "@/utils/enums/boardUserProfileEnums";
import Botao from "../Botao";

function translateNotificationType(type: string): string {
  switch (type) {
    case "statusChange":
      return "Mudança de Status";
    case "fieldUpdate":
      return "Atualização de Campo";
    case "newMessage":
      return "Nova Mensagem";
    case "newFinancialEvent":
      return "Novo Evento Financeiro";
    case "newClientEvent":
      return "Novo Evento de Cliente";
    case "invoicePending":
      return "Fatura Pendente";
    case "alert":
      return "Alerta";
    case "clientEvent":
      return "Evento Cliente";
    default:
      return type;
  }
}

function translateEntity(entityType: string) {
  switch (entityType) {
    case "freight":
      return { label: "Frete", route: "frete-em-curso" };
    case "driver":
      return { label: "Motorista", route: "cadastro-do-motorista" };
    case "occurrence":
      return { label: "Ocorrência", route: "ocorrencias" };
    case "financial":
      return { label: "Financeiro", route: "financeiro" };
    case "client":
      return { label: "Cliente", route: "clientes" };
    default:
      return { label: entityType, route: entityType };
  }
}

function isValidDate(date: any) {
  if (!date) return false;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}

interface NotificationsListProps {
  userId?: string;
  groupKey?: BoardUserProfile;
}

export function NotificationsList({ userId, groupKey }: NotificationsListProps) {
  const [includeAcknowledged, setIncludeAcknowledged] = React.useState(false);
  const [entityTypeFilter, setEntityTypeFilter] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const { notifications, loading, error, refetch } = useNotificationsList({
    filter: {
      userId,
      groupKey,
      includeAcknowledged,
      entityType: entityTypeFilter || undefined,
    },
  });

  const { acknowledgeNotification, loading: ackLoading, error: ackError } = useAcknowledgeNotification(
    userId || "",
    groupKey
  );

  // Mensagens de carregamento e erro para a lista de notificações
  if (loading) return <p className={styles.loading}>Carregando notificações...</p>;
  if (error) return <p className={styles.error}>Erro ao buscar notificações.</p>;

  const handleAcknowledge = async (notifId: string) => {
    try {
      await acknowledgeNotification({
        notificationId: notifId,
        userId: userId!,
      });
      setSuccessMessage("Notificação reconhecida com sucesso!");
      refetch();
      setTimeout(() => setSuccessMessage(null), 3000); // Remove a mensagem após 3 segundos
    } catch (err) {
      console.error("Erro ao reconhecer notificação:", err);
    }
  };

  return (
    <div className={styles.notificationsListContainer}>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {ackLoading && <p className={styles.ackLoading}>Reconhecendo notificação...</p>}
      {ackError && <p className={styles.ackError}>Erro ao reconhecer notificação.</p>}

      <div className={styles.notificationsFilter}>
        <label>
          <input
            type="checkbox"
            checked={includeAcknowledged}
            onChange={(e) => setIncludeAcknowledged(e.target.checked)}
          />
          Incluir reconhecidas
        </label>

        <select
          value={entityTypeFilter}
          onChange={(e) => setEntityTypeFilter(e.target.value)}
        >
          <option value="">Todas as entidades</option>
          <option value="freight">Fretes</option>
          <option value="driver">Motoristas</option>
          <option value="occurrence">Ocorrências</option>
          <option value="financial">Financeiro</option>
          <option value="client">Clientes</option>
        </select>
      </div>

      <ul className={styles.notificationsList}>
        {notifications.map((notif) => {
          const isAcknowledged = notif.recipients.some(
            (r) => r.userId === userId && r.acknowledged
          );

          const translatedType = translateNotificationType(notif.type);
          const { label, route } = translateEntity(notif.entityType);

          return (
            <li
              key={notif.id}
              className={`${styles.notificationItem} ${isAcknowledged ? styles.acknowledged : ""
                }`}
            >
              {/* Header da Notificação */}
              <div className={styles.notificationHeader}>
                <strong>{translatedType}</strong> - {label}
              </div>

              {/* Corpo da Notificação */}
              <div className={styles.notificationBody}>
                {"Você tem uma nova notificação."}
              </div>

              {/* Ações da Notificação */}
              <div className={styles.notificationActions}>
                <Botao
                  disabled={isAcknowledged || ackLoading}
                  onClick={() => handleAcknowledge(notif.id)}
                  text={isAcknowledged ? "Reconhecida" : "Reconhecer"}
                />
                {" | "}
                <a href={`/${route}/${notif.entityId}`} className={styles.detailsLink}>
                  Ver detalhes
                </a>
              </div>

              {/* Legenda da Notificação */}
              <div className={styles.notificationFooter}>
                <small>
                  Criada em:{" "}
                  {isValidDate(notif.createdAt)
                    ? formatDateTime(notif.createdAt)
                    : "Data indisponível"}
                </small>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
