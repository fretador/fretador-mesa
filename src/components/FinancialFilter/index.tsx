import React, { useState } from "react";
import styles from './FinancialFilter.module.css'
import { ArrowDownIcon, MagnifierIcon } from "@/utils/icons";

const FinancialFilter = () => {

  const [showFilter, setShowFilter] = useState(false);
  const toggleFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const options =
    [
      { value: "", label: "Adiantamentos" },
      { value: "", label: "Saldos" },
    ]

  return (
    <div className={styles.container}>
      <div className={styles.openCloseFilter} onClick={toggleFilter}>
        <p className={styles.title}>Filtrar</p>
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
          />
        </div>

        <div className={styles.checkboxList}>
          {options.map((option) => (
            <div className={styles.checkboxContainer} key={option.value}>
              <input
                type="checkbox"
                id={option.value}
                name={option.value}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>

        <div className={styles.btnsContainer}>
          <button className={styles.btnApply} onClick={() => {}}>
            Aplicar
          </button>
          <button className={styles.btnCancel} onClick={() => {}}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default FinancialFilter