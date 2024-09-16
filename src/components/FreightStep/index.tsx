import React from "react";
import styles from './FreightStep.module.css';
import Botao from "../Botao";

type ActionButtonTextType = "rastrear" | "ver ocorrência" | "ver anexos";

interface BaseFreightStepProps {
  theme: 'dark' | 'light',
  date: string,
  hour: string,
  content: string,
  authorizeBoarding?: boolean,
  actionButton?: boolean
}

// Interfaces condicionais para fazer com que o actionButtonText e o handleActionButton só seja obrigatório se o actionButton for true

interface ActionButtonTrueProps extends BaseFreightStepProps {
  actionButton: true,
  actionButtonText: ActionButtonTextType,
  handleActionButton: () => void
}

interface ActionButtonFalseProps extends BaseFreightStepProps {
  actionButton?: false,
  actionButtonText?: never,
  handleActionButton?: never
}

type FreightStepProps = ActionButtonTrueProps | ActionButtonFalseProps;

const FreightStep = ({
  theme,
  date,
  hour,
  content,
  authorizeBoarding = false,
  actionButton = false,
  actionButtonText,
  handleActionButton
}: FreightStepProps) => {

  const backgroundColor = theme === 'dark' ? '#D3DFE4' : '#FDFDFD';

  const handleYesButton = () => {
    console.log('Funcionário da mesa autorizou o embarque')
  }

  const handleNoButton = () => {
    console.log('Funcionário da mesa não autorizou o embarque')
  }

  return (
    <div
      className={styles.container}
      style={{ backgroundColor }}
    >
      <div className={styles.dateAndHourContainer}>
        <p className={styles.date}>{date}</p>
        <p className={styles.hour}>{hour}</p>
      </div>

      <div className={styles.verticalSeparator}></div>

      <div className={styles.mainContentContainer}>
        <p>{content}</p>
      </div>

      {authorizeBoarding && (
        <div className={styles.authorizeBoardingButtons}>
          <Botao text="SIM" className={styles.authorizeBoardingButtonYes} onClick={handleYesButton} />
          <Botao text="NÃO" className={styles.authorizeBoardingButtonNo} onClick={handleNoButton} />
        </div>
      )}

      {actionButton && (
        <div className={styles.actionButtonContainer}>
          <Botao text={actionButtonText!} onClick={handleActionButton!} />
        </div>
      )}
    </div>
  );
};

export default FreightStep;
