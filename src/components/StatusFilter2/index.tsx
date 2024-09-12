import React, { useState } from "react";
import styles from "./StatusFilter2.module.css";
import { ArrowDownIcon, MagnifierIcon } from "@/utils/icons";

interface StatusFilter2Props {
  onApply: (searchTerm: string, selectedStatuses: string[]) => void;
  onCancel: () => void;
}

const StatusFilter2: React.FC<StatusFilter2Props> = ({ onApply, onCancel }) => {
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
            id="available"
            name="available"
            checked={selectedStatuses.includes("DISPONIVEL")}
            onChange={() => handleStatusChange("DISPONIVEL")}
          />
          <label htmlFor="available">Disponível</label>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="onTheWay"
            name="onTheWay"
            checked={selectedStatuses.includes("EM_TRANSITO")}
            onChange={() => handleStatusChange("EM_TRANSITO")}
          />
          <label htmlFor="onTheWay">Em Trânsito</label>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="finished"
            name="finished"
            checked={selectedStatuses.includes("FINISHED")}
            onChange={() => handleStatusChange("FINISHED")}
          />
          <label htmlFor="finished">Finalizado</label>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="approve"
            name="approve"
            checked={selectedStatuses.includes("APPROVED")}
            onChange={() => handleStatusChange("APPROVED")}
          />
          <label htmlFor="approve">Aprovar</label>
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

export default StatusFilter2;
