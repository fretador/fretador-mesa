import React, { useState } from "react";
import styles from './FinancialFilter.module.css';
import { ArrowDownIcon, MagnifierIcon } from "@/utils/icons";
import { FinancialFilterInput } from "@/utils/Interfaces/FinancialFilterInput";
import { RequestFinancialType } from "@/utils/enums/requestFinancialTypeEnum";

interface FinancialFilterProps {
  onApplyFilters: (filters: FinancialFilterInput) => void;
}

const FinancialFilter: React.FC<FinancialFilterProps> = ({ onApplyFilters }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const toggleFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const options = [
    { value: RequestFinancialType.ADVANCE, label: "Adiantamentos" },
    { value: RequestFinancialType.BALANCE, label: "Saldos" },
    { value: RequestFinancialType.EXPENSES, label: "Despesas" },
    { value: RequestFinancialType.PARTIAL_BALANCE, label: "Saldo Parcial" },
  ];

  const handleCheckboxChange = (value: string) => {
    setSelectedTypes((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  const handleApplyFilters = () => {
    const filters: FinancialFilterInput = {
      type: selectedTypes.length > 0 ? selectedTypes : undefined,
      searchText: searchText.trim() || undefined,
    };
    onApplyFilters(filters);
    setShowFilter(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.openCloseFilter} onClick={toggleFilter}>
        <p className={styles.title}>Filtrar</p>
        <ArrowDownIcon
          className={`${styles.arrowDown} ${showFilter ? styles.rotated : ""}`}
        />
      </div>

      <div className={`${styles.filterOptions} ${showFilter ? styles.show : ""}`}>
        <div className={styles.searchContainer}>
          <MagnifierIcon className={styles.magnifierIcon} />
          <input
            type="text"
            placeholder="Buscar"
            className={styles.searchInputField}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className={styles.checkboxList}>
          {options.map((option) => (
            <div className={styles.checkboxContainer} key={option.value}>
              <input
                type="checkbox"
                id={option.value}
                name={option.value}
                checked={selectedTypes.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>

        <div className={styles.btnsContainer}>
          <button className={styles.btnApply} onClick={handleApplyFilters}>
            Aplicar
          </button>
          <button className={styles.btnCancel} onClick={() => setShowFilter(false)}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialFilter;
