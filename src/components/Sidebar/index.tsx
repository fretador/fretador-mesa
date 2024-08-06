import React, { useState } from "react";
import Image from "next/image";
import {
  HomeIcon,
  TruckIcon,
  PersonAddIcon,
  PeopleIcon,
  WarningIcon,
  FinanceIcon,
  SettingsIcon,
  SupportIcon,
  HelpIcon,
  LogoutIcon,
} from "@/utils/icons";
import FretadorIcon from "@/assets/images/fretadorIcon.svg";
import defaultAvatar from "@/assets/images/avatar.jpg";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  user: string;
  avatarUrl?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ user, avatarUrl }) => {
  const [isRetracted, setIsRetracted] = useState(false);

  const toggleSidebar = () => {
    setIsRetracted(!isRetracted);
  };

  return (
    <nav
      className={`${styles.sidebar} ${
        isRetracted ? styles.retracted : "not-retracted"
      }`}
      data-testid="side-bar"
    >
      <div className={styles.header}>
        <FretadorIcon className={styles.logo} />
        <button onClick={toggleSidebar} data-testid="toggle-button">
          {isRetracted ? ">" : "<"}
        </button>
      </div>
      <div className={styles.userSection}>
        <Image
          src={avatarUrl || defaultAvatar}
          alt="User avatar"
          width={48}
          height={48}
          className={styles.avatar}
        />
        {!isRetracted && <p data-testid="user-greeting">Olá, {user}!</p>}
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <HomeIcon className={styles.icon} data-testid="icon-home" />
          {!isRetracted && <span data-testid="text-home">Home</span>}
        </li>
        <li className={styles.navItem}>
          <TruckIcon className={styles.icon} data-testid="icon-truck" />
          {!isRetracted && <span data-testid="text-truck">Meus Fretes</span>}
        </li>
        <li className={styles.navItem}>
          <PersonAddIcon className={styles.icon} data-testid="icon-drivers" />
          {!isRetracted && <span data-testid="text-drivers">Motoristas</span>}
        </li>
        <li className={styles.navItem}>
          <PeopleIcon className={styles.icon} data-testid="icon-clients" />
          {!isRetracted && <span data-testid="text-clients">Clientes</span>}
        </li>
        <li className={styles.navItem}>
          <WarningIcon className={styles.icon} data-testid="icon-incidents" />
          {!isRetracted && (
            <span data-testid="text-incidents">Ocorrências</span>
          )}
        </li>
        <li className={styles.navItem}>
          <FinanceIcon className={styles.icon} data-testid="icon-finance" />
          {!isRetracted && <span data-testid="text-finance">Financeiro</span>}
        </li>
        <li className={styles.navItem}>
          <SettingsIcon className={styles.icon} data-testid="icon-settings" />
          {!isRetracted && (
            <span data-testid="text-settings">Configurações</span>
          )}
        </li>
        <li className={styles.navItem}>
          <SupportIcon className={styles.icon} data-testid="icon-support" />
          {!isRetracted && <span data-testid="text-support">Atendimento</span>}
        </li>
        <li className={styles.navItem}>
          <HelpIcon className={styles.icon} data-testid="icon-help" />
          {!isRetracted && <span data-testid="text-help">Ajuda</span>}
        </li>
        <li className={styles.navItem}>
          <LogoutIcon className={styles.icon} data-testid="icon-logout" />
          {!isRetracted && <span data-testid="text-logout">Deslogar</span>}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
