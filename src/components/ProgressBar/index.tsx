
import React from 'react';
import styles from './ProgressBar.module.css';

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
      <div className={styles.progressBar}>
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`${styles.stageDot} ${index === currentStage ? styles.activeDot : ''}`}
            style={{ right: `${(index / (stages.length - 1)) *95}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
