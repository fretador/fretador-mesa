import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  return (
    <nav className={styles.sidebar}>
      <h1>Fretador</h1>
      <ul>
        <li>Home</li>
        <li>Cadastros</li>
        <li>Relatórios</li>
        <li>Configurações</li>
      </ul>
    </nav>
  );
};

export default Sidebar;
