import React from "react";
import styles from "./FreightStep.module.css";
import Botao from "../Botao";
import Image from "next/image";

interface BaseFreightStepProps {
  theme: "dark" | "light";
  date: string;
  content: string;
  disabled?: boolean;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  actionButtonText?: string;
  handleActionButton?: () => void;
}

interface FreightStepWithAttachment extends BaseFreightStepProps {
  hasAttachment: true;
  attachmentPath: string;
}

interface FreightStepWithoutAttachment extends BaseFreightStepProps {
  hasAttachment?: false;
  attachmentPath?: never;
}

type FreightStepProps =
  | FreightStepWithAttachment
  | FreightStepWithoutAttachment;

const FreightStep: React.FC<FreightStepProps> = ({
  theme,
  date,
  content,
  disabled = false,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  actionButtonText,
  handleActionButton,
  hasAttachment = false,
  attachmentPath,
}) => {
  const backgroundColor = theme === "dark" ? "#D3DFE4" : "#FAFDFD";

  const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString("pt-BR");
    const formattedTime = dateObject.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDate(date);

  return (
    <div
      className={`${styles.container} ${disabled ? styles.disabled : ""}`}
      style={{ backgroundColor }}
    >
      <div className={styles.dateAndHourContainer}>
        <p className={styles.date}>{formattedDate}</p>
        <p className={styles.hour}>{formattedTime}</p>
      </div>

      <div className={styles.verticalSeparator}></div>

      <div className={styles.mainContentContainer}>
        <p>{content}</p>
      </div>

      <div className={styles.actionsContainer}>
        {primaryButtonLabel && (
          <Botao
            text={primaryButtonLabel}
            className={styles.primaryButton}
            onClick={onPrimaryButtonClick}
            disabled={disabled}
          />
        )}
        {secondaryButtonLabel && (
          <Botao
            text={secondaryButtonLabel}
            className={styles.secondaryButton}
            onClick={onSecondaryButtonClick}
            disabled={disabled}
          />
        )}
        {actionButtonText && (
          <Botao
            text={actionButtonText}
            className={styles.actionButton}
            onClick={handleActionButton}
            disabled={disabled}
          />
        )}
      </div>

      {hasAttachment && attachmentPath && (
        <div className={styles.attachmentContainer}>
          <Image
            src="/attachment-icon.png" // Substitua pelo caminho do seu ícone de anexo
            alt="Ícone de anexo"
            width={24}
            height={24}
          />
          <a
            href={attachmentPath}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.attachmentLink}
          >
            Ver anexo
          </a>
        </div>
      )}
    </div>
  );
};

export default FreightStep;
