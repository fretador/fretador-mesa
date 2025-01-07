import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOARDUSER_NOTIFICATIONS } from "@/graphql/queries/notificationQueries";
import { ACKNOWLEDGE_NOTIFICATION } from "@/graphql/mutations/notificationMutations";
import styles from "./NotificationsList.module.css";
import { formatDateTime } from "@/utils/dates";

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
  groupKey?: string;
}

export function NotificationsList({ userId, groupKey }: NotificationsListProps) {
  const [includeAcknowledged, setIncludeAcknowledged] = React.useState(false);
  const [entityTypeFilter, setEntityTypeFilter] = React.useState("");

  const { data, loading, error, refetch } = useQuery(GET_BOARDUSER_NOTIFICATIONS, {
    variables: {
      filter: {
        userId,
        groupKey,
        includeAcknowledged,
        entityType: entityTypeFilter || undefined,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const [ackMutation] = useMutation(ACKNOWLEDGE_NOTIFICATION);

  if (loading) return <p>Carregando notificações...</p>;
  if (error) return <p>Erro ao buscar notificações.</p>;

  const notifications = data?.notifications || [];

  const handleAcknowledge = async (notifId: string) => {
    try {
      await ackMutation({
        variables: {
          notificationId: notifId,
          userId: userId,
        },
      });
      refetch();
    } catch (err) {
      console.error("Erro ao reconhecer notificação:", err);
    }
  };

  return (
    <div className={styles.notificationsListContainer}>
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
        {notifications.map((notif: any) => {
          const isAcknowledged = notif.recipients.some(
            (r: any) => r.userId === userId && r.acknowledged
          );

          const translatedType = translateNotificationType(notif.type);
          const { label, route } = translateEntity(notif.entityType);

          return (
            <li
              key={notif._id}
              className={`${styles.notificationItem} ${isAcknowledged ? styles.acknowledged : ""
                }`}
            >
              <strong>{translatedType}</strong> - {label}/{notif.entityId}
              <br />
              <button
                disabled={isAcknowledged}
                onClick={() => handleAcknowledge(notif._id)}
              >
                {isAcknowledged ? "Reconhecida" : "Reconhecer"}
              </button>
              {" | "}
              <a href={`/${route}/${notif.entityId}`}>Ver detalhes</a>
              <br />
              <small>
                Criada em:{" "}
                {isValidDate(notif.createdAt)
                  ? formatDateTime(notif.createdAt)
                  : "Data indisponível"}
              </small>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
