import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOARDUSER_NOTIFICATIONS } from "@/graphql/queries/notificationQueries";
import { ACKNOWLEDGE_NOTIFICATION } from "@/graphql/mutations/notificationMutations";
import styles from "./NotificationsList.module.css";

interface NotificationsListProps {
  userId?: string;
  groupKey?: string;
}

export function NotificationsList({ userId, groupKey }: NotificationsListProps) {
  const [includeAcknowledged, setIncludeAcknowledged] = React.useState(false);
  const [entityTypeFilter, setEntityTypeFilter] = React.useState("");

  const { data, loading, error, refetch } = useQuery(GET_BOARDUSER_NOTIFICATIONS, {
    variables: {
      userId,
      groupKey,
      includeAcknowledged,
      entityType: entityTypeFilter || undefined,
    },
    fetchPolicy: "cache-and-network",
  });

  const [ackMutation] = useMutation(ACKNOWLEDGE_NOTIFICATION);

  if (loading) return <p>Carregando notificações...</p>;
  if (error) return <p>Erro ao buscar notificações.</p>;

  const notifications = data?.notifications || [];

  const handleAcknowledge = async (notifId: string) => {
    try {
      await ackMutation({ variables: { notificationId: notifId } });
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
          return (
            <li
              key={notif._id}
              className={`${styles.notificationItem} ${isAcknowledged ? styles.acknowledged : ""}`}
            >
              <strong>{notif.type}</strong> - {notif.entityType}/{notif.entityId}
              <br />
              <button
                disabled={isAcknowledged}
                onClick={() => handleAcknowledge(notif._id)}
              >
                {isAcknowledged ? "Reconhecida" : "Reconhecer"}
              </button>
              {" | "}
              <a href={`/${notif.entityType}s/${notif.entityId}`}>Ver detalhes</a>
              <br />
              <small>
                Criada em: {new Date(notif.createdAt).toLocaleString()}
              </small>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
