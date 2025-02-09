import React, { useState } from "react";
import styles from "./VehicleFilter.module.css";
import { ArrowDownIcon, MagnifierIcon } from "@/utils/icons";

interface VehicleFilterProps {
  onApply: (searchTerm: string, selectedStatuses: string[]) => void;
  onCancel: () => void;
}

const VehicleFilter: React.FC<VehicleFilterProps> = ({ onApply, onCancel }) => {
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
        <p className={styles.title}>Filtrar Veículo</p>
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
            id="leve"
            name="leve"
            checked={selectedStatuses.includes("LEVE")}
            onChange={() => handleStatusChange("LEVE")}
          />
          <label htmlFor="leve">Leve</label>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="medio"
            name="medio"
            checked={selectedStatuses.includes("MEDIO")}
            onChange={() => handleStatusChange("MEDIO")}
          />
          <label htmlFor="medio">Médio</label>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="pesado"
            name="pesado"
            checked={selectedStatuses.includes("PESADO")}
            onChange={() => handleStatusChange("PESADO")}
          />
          <label htmlFor="pesado">Pesado</label>
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

export default VehicleFilter;
