import React, { useState } from "react";
import styles from './BalanceFilter.module.css'
import { ArrowDownIcon, MagnifierIcon } from "@/utils/icons";

const BalanceFilter = () => {

  const [showFilter, setShowFilter] = useState(false);
  const toggleFilter = () => {
    setShowFilter((prevState) => !prevState);
  };

  const options =
    [
      { value: "IN_PROGRESS", label: "Em Curso" },
      { value: "DOCUMENTS_RECEIVED", label: "Documentos Recebidos" },
      { value: "CANCELLED", label: "Cancelado" },
      { value: "FINISHED", label: "Finalizado" },
    ]

  return (
    <div className={styles.container}>
      <div className={styles.openCloseFilter} onClick={toggleFilter}>
        <p className={styles.title}>Filtrar Saldo</p>
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

export default BalanceFilter