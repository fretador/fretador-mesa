import React from "react";
import { useTotalNotifications } from "@/hooks/notification/useTotalNotifications";
import { NotificationsList } from "../NotificationsList";
import styles from "./NotificationsBell.module.css";
import { BoardUserProfile } from "@/utils/enums/boardUserProfileEnums";

interface NotificationsBellProps {
  userId?: string;
  groupKey?: BoardUserProfile;
}

export function NotificationsBell({ userId, groupKey }: NotificationsBellProps) {
  const [open, setOpen] = React.useState(false);

  const { total, loading, error } = useTotalNotifications({
    filter: { userId },
  });

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