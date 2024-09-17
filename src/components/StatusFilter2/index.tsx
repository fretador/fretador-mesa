import React, { useState } from "react";
import styles from "./StatusFilter2.module.css";
import { ArrowDownIcon, MagnifierIcon } from "@/utils/icons";

interface StatusDriversFilterProps {
  onApply: (searchTerm: string, selectedStatuses: string[]) => void;
  onCancel: () => void;
}

const StatusDriversFilter: React.FC<StatusDriversFilterProps> = ({ onApply, onCancel }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prevStatuses) =>
      prevStatuses.includes(status)
        ? prevStatuses.filter((s) => s !== status)
        : [...prevStatuses, status]
    );
  };

  const handleApply = () => {
    onApply(searchTerm, selectedStatuses);
    setShowFilter(false);
  };

  const handleCancel = () => {
    setSearchTerm("");
    setSelectedStatuses([]);
    onCancel();
    setShowFilter(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.openCloseFilter} onClick={toggleFilter}>
        <p className={styles.title}>Filtrar Status</p>
        <ArrowDownIcon
          className={`${styles.arrowDown} ${showFilter ? styles.rotated : ""}`}
        />
      </div>

      <div
        className={`${styles.filterOptions} ${showFilter ? styles.show : ""}`}
      >
        <div className={styles.searchContainer}>
          <MagnifierIcon className={styles.magnifierIcon} />
          <input
            type="text"
            placeholder="Buscar"
            className={styles.searchInputField}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="approved"
            name="approved"
            checked={selectedStatuses.includes("APPROVED")}
            onChange={() => handleStatusChange("APPROVED")}
          />
          <label htmlFor="approved">Aprovado</label>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="pending"
            name="pending"
            checked={selectedStatuses.includes("PENDING")}
            onChange={() => handleStatusChange("PENDING")}
          />
          <label htmlFor="pending">Pendente</label>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="denied"
            name="denied"
            checked={selectedStatuses.includes("DENIED")}
            onChange={() => handleStatusChange("DENIED")}
          />
          <label htmlFor="denied">Negado</label>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="waiting"
            name="waiting"
            checked={selectedStatuses.includes("WAITING")}
            onChange={() => handleStatusChange("WAITING")}
          />
          <label htmlFor="waiting">Aguardando</label>
        </div>

        <div className={styles.btnsContainer}>
          <button className={styles.btnApply} onClick={handleApply}>
            Aplicar
          </button>
          <button className={styles.btnCancel} onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusDriversFilter;
