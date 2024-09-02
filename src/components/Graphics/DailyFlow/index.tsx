import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import styles from './DailyFlow.module.css'


interface DailyFlowProps {
  newFreights: number;
  cancelledFreights: number;
}

const DailyFlow = ({ newFreights, cancelledFreights }: DailyFlowProps) => {
  const remainingValue = 100 - newFreights;

  const totalFretes = 500; // esse valor deverá vir do backend
  const percentage = (cancelledFreights / totalFretes) * 100;
  const remainingPercentage = 100 - percentage;

  return (
    <div className={styles.container}>
      <p>FLUXO DIÁRIO</p>

      <div className={styles.graphicsContainer}>

        {/* Cancelled Freights Graphic */}
        <div className={styles.graphic}>
          <h4>Fretes Cancelados</h4>
          <PieChart
              colors={['#d9d9d9', '#1B556D']}
              series={[
                {
                  data: [
                    { id: 0, value: remainingPercentage },
                    { id: 1, value: percentage },
                  ],
                  innerRadius: 48,
                  outerRadius: 70,
                  paddingAngle: 3,
                  cornerRadius: 5,
                  startAngle: 0,
                  cx: 100,
                },
              ]}
              width={200}
              height={170}
          />
          <p>{percentage}%</p>
        </div>

        {/* New Freights Grpahic */}
        <div className={styles.graphic}>
          <h4>Novos Fretes</h4>
          <PieChart
            colors={['#1B556D', '#d9d9d9']}
            series={[
              {
                data: [
                  { id: 0, value: newFreights },
                  { id: 1, value: remainingValue },
                ],
                innerRadius: 48,
                outerRadius: 70,
                paddingAngle: 3,
                cornerRadius: 5,
                startAngle: 0,
                cx: 100
              },
            ]}
            width={200}
            height={170}
          />
          <p>{newFreights}</p>
        </div>

      </div>
      
    </div>
    
  );
}

export default DailyFlow;