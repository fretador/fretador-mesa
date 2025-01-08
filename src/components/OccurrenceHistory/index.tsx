import React from "react";
import styles from './OccurrenceHistory.module.css'
import RowTitle from "../RowTitle";

const OccurrenceHistory: React.FC = () => {
  return (
    <div className={styles.cards}>
      <RowTitle
        OccurrenceDate="Data"
        OccurrenceNumber="Ocorrência"
        OccurrenceType="Tipo de ocorrência"
        Cte="CTE"
        Route="Rota"
        OccurrenceStatus="Status"
        titleStyles={{ color: '#1B556D' }}
      />

      <p style={{textAlign: 'center', marginTop: '42px'}}>Sem dados para mostrar. Componente a desenvolver.</p>
    </div>
  )
}

export default OccurrenceHistory