import FreightStatus from '../FreightStatus';
import styles from './RowRoot.module.css';
import React, { ReactNode, cloneElement, Children, ReactElement } from 'react';

type FreightStatusOption = "DISPONIVEL" | "APROVAR" | "EM CURSO" | "FINALIZADO" | "";

interface RowRootProps {
  children: ReactNode;
  freightStatus?: FreightStatusOption;
}

interface FreightStatusProps {
  freightStatus?: FreightStatusOption;
}

const RowRoot = ({ children, freightStatus = '' }: RowRootProps) => {
  const getBackgroundColor = (status: FreightStatusOption) => {
    switch (status) {
      case 'DISPONIVEL':
        return 'rgba(186, 133, 1, 0.3)';
      case 'APROVAR':
        return 'rgba(163, 56, 48, 0.3)';
      case 'EM CURSO':
        return 'rgba(28, 149, 44, 0.3)';
      case 'FINALIZADO':
        return 'rgba(57, 55, 55, 0.3)';
      default:
        return '#FAFDFD';
    }
  };

  const backgroundColor = getBackgroundColor(freightStatus);

  return (
    <div className={styles.container} style={{ backgroundColor }}>
      <div className={styles.content}>
        {Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === FreightStatus) {
              return cloneElement(child, { freightStatus } as FreightStatusProps);
            }
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default RowRoot;