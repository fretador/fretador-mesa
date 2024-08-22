import React, { useState } from "react";
import styles from "./StatusFilter2.module.css"
import { ArrowDownIcon, MagnifierIcon } from "@/utils/icons";

const StatusFilter2 = () => {

  const [showFilter, setShowFilter] = useState(false)

  const toggleFilter = () => {
    setShowFilter(prevState => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.openCloseFilter} onClick={toggleFilter}>
        <p className={styles.title}>Filtrar Status</p>
        <ArrowDownIcon className={`${styles.arrowDown} ${showFilter ? styles.rotated : ""}`} />
      </div>

      <div className={`${styles.filterOptions} ${showFilter ? styles.show : ""}`}>
        <div className={styles.searchContainer}>
          <MagnifierIcon className={styles.magnifierIcon} />
          <input type="text" placeholder="Buscar" className={styles.searchInputField} />
        </div>

        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="available" name="available" />
          <label htmlFor="available">Disponível</label>
        </div>

        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="onTheWay" name="onTheWay" />
          <label htmlFor="onTheWay">Em Trânsito</label>
        </div>

        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="finished" name="finished" />
          <label htmlFor="finished">Finalizado</label>
        </div>

        <div className={styles.checkboxContainer}>
          <input type="checkbox" id="approve" name="approve" />
          <label htmlFor="approve">Aprovar</label>
        </div>


        <div className={styles.btnsContainer}>
          <button className={styles.btnApply}>Aplicar</button>
          <button className={styles.btnCancel}>Cancelar</button>
        </div>
      </div>

    </div>
  )
}

export default StatusFilter2