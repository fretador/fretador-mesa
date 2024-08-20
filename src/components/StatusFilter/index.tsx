import React, { useState } from "react";
import styles from "./StatusFilter.module.css";

// Custom Search Icon component
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.searchIcon}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const StatusFilter = ({ onApply, onCancel }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const statuses = [
    { key: "DISPONIVEL", label: "Disponível" },
    { key: "EM_TRANSITO", label: "Em Trânsito" },
    { key: "FINISHED", label: "Finalizado" },
    { key: "APPROVED", label: "Aprovar" },
  ];

  const handleStatusToggle = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleApply = () => {
    onApply({ searchTerm, selectedStatuses });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Filtrar Status</h3>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <SearchIcon />
      </div>
      {statuses.map((status) => (
        <div key={status.key} className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id={status.key}
            checked={selectedStatuses.includes(status.key)}
            onChange={() => handleStatusToggle(status.key)}
            className={styles.checkbox}
          />
          <label htmlFor={status.key} className={styles.checkboxLabel}>
            {status.label}
          </label>
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <button onClick={handleApply} className={styles.applyButton}>
          Aplicar
        </button>
        <button onClick={onCancel} className={styles.cancelButton}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default StatusFilter;
