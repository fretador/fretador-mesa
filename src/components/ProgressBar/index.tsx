import React from 'react';
import styles from './ProgressBar.module.css';
import { ArrivalAtDestinationIcon, BalanceIcon, CarryingLoadIcon, InRouteIcon, PickupOrderIcon, SendingReceiptsIcon } from '@/utils/icons';

interface ProgressBarProps {
  currentStage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStage }) => {
  const stages = [
    'Ordem de Coleta',
    'Carregando a Carga',
    'Em rota',
    'Chegada no Destino',
    'Envio de Comprovantes',
    'Saldo'
  ];

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.iconsContainer}>
        {stages.map((stage, index) => (
          <div key={index} className={styles.iconContainer} style={index === 3 ? { width: '92px' } : {}}>
            {index === 0 && <PickupOrderIcon fill={currentStage >= 0 ? '#1C952C' : '#5D5A5A'} />}
            {index === 1 && <CarryingLoadIcon fill={currentStage >= 1 ? '#1C952C' : '#5D5A5A'} />}
            {index === 2 && <InRouteIcon fill={currentStage >= 2 ? '#1C952C' : '#5D5A5A'} />}
            {index === 3 && <ArrivalAtDestinationIcon fill={currentStage >= 3 ? '#1C952C' : '#5D5A5A'} stroke={currentStage >= 3 ? '#1C952C' : '#5D5A5A'} />}
            {index === 4 && <SendingReceiptsIcon fill={currentStage >= 4 ? '#1C952C' : '#5D5A5A'} />}
            {index === 5 && <BalanceIcon fill={currentStage >= 5 ? '#1C952C' : '#5D5A5A'} />}
            <p className={index <= currentStage ? styles.activeText : ''}>{stage.toUpperCase()}</p>
          </div>
        ))}
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${(currentStage / (stages.length - 1)) * 100}%`,
          }}
        ></div>
        {stages.map((_, index) => (
          <div
            key={index}
            className={`${styles.stageDot} ${
              index < currentStage ? styles.prevDot : ''
            } ${index === currentStage ? styles.activeDot : ''}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
