import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TOTAL_NOTIFICATIONS } from "@/graphql/queries/notificationQueries";
import { NotificationsList } from "../NotificationsList";
import styles from "./NotificationsBell.module.css";

interface NotificationsBellProps {
  userId?: string;
  groupKey?: string;
}

export function NotificationsBell({ userId, groupKey }: NotificationsBellProps) {
  const [open, setOpen] = React.useState(false);

  const { data, loading, error } = useQuery(GET_TOTAL_NOTIFICATIONS, {
    variables: {
      filter: { userId },
    },
    fetchPolicy: "cache-and-network",
  });

  const total = data?.notifications?.length || 0;

  const handleToggle = () => {
    setOpen(!open);
  };

  if (error) {
    console.error("Erro ao buscar contagem de notificações:", error);
  }

  return (
    <div className={styles.notificationsBellContainer}>
      <button
        className={styles.bellButton}
        onClick={handleToggle}
        disabled={loading}
        aria-label="Abrir notificações"
      >
        <span>🔔</span>
        {total > 0 && <span className={styles.bellCount}>{total}</span>}
      </button>
      {open && (
        <div className={styles.notificationsDropdown}>
          <NotificationsList userId={userId} groupKey={groupKey} />
        </div>
      )}
    </div>
  );
}
