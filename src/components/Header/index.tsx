import React from "react";
import styles from "./Header.module.css";
import { NotificationsBell } from "@/components/NotificationsBell";
import { useAppSelector } from "@/store/store";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const boardUser = useAppSelector((state) => state.auth.boardUser);

  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      <div className={styles.bellContainer}>
        <NotificationsBell userId={boardUser?.id?.toString()} />
      </div>
    </header>
  );
};

export default Header;
