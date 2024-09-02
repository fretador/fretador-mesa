import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import styles from './FreightSummary.module.css'

interface FreightSummaryProps {
  values: number[];
}

const FreightSummary = ({values}: FreightSummaryProps) => {
  return (
    <div className={styles.container}>
      <h4>RESUMO DOS FRETES</h4>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: values[0], label: 'Em andamento', color: '#3797bd' },
              { id: 1, value: values[1], label: 'Em aberto', color: '#ED9C03' },
              { id: 2, value: values[2], label: 'Finalizado', color: '#2f88ff' },
            ],
          },
        ]}
        width={460}
      />
    </div>
    
  )
}

export default FreightSummary