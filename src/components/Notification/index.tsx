// src/components/Notification.tsx
import React, { useEffect, useState } from "react";
import styles from "./Notification.module.css";

interface NotificationProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
    }, 3000); // Notificação fecha automaticamente após 3 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  return (
    <div
      className={`${styles.notification} ${styles[type]} ${isClosing ? styles.slideOut : styles.slideIn}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <p>{message}</p>
      <button onClick={handleClose} className={styles.closeButton}>X</button>
    </div>
  );
};

export default Notification;
