import React from "react";
import styles from "./FreightStep.module.css";
import Botao from "../Botao";
import { AttachmentDarkIcon, AttachmentLightIcon } from "@/utils/icons";
import { UpdateData } from "@/utils/Interfaces/UpdateData";

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
  updateData?: UpdateData;
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
  updateData,
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

  // Função para extrair o nome até o símbolo '_'
  const getDisplayName = (name: string) => {
    const index = name.indexOf("_");
    return index !== -1 ? name.substring(0, index) : name;
  };

  // Seleciona o ícone de anexo com base no tema
  const AttachmentIcon =
    theme === "dark" ? AttachmentDarkIcon : AttachmentLightIcon;

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

        {/* Renderizar documentos se updateData existir */}
        {updateData && updateData.documents && updateData.documents.length > 0 && (
          <div className={styles.documentsContainer}>
            {updateData.documents.map((doc, idx) => (
              <div key={idx} className={styles.documentItem}>
                <AttachmentIcon width={24} height={24} />
                <span className={styles.documentName}>
                  {getDisplayName(doc.name)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.actionsContainer}>
        {primaryButtonLabel && (
          <Botao
            text={primaryButtonLabel}
            className={styles.primaryButton}
            onClick={onPrimaryButtonClick}
          />
        )}
        {secondaryButtonLabel && (
          <Botao
            text={secondaryButtonLabel}
            className={styles.secondaryButton}
            onClick={onSecondaryButtonClick}
          />
        )}
        {actionButtonText && (
          <Botao
            text={actionButtonText}
            className={styles.actionButton}
            onClick={handleActionButton}
          />
        )}
      </div>

      {hasAttachment && attachmentPath && (
        <div className={styles.attachmentContainer}>
          <AttachmentIcon width={24} height={24} />
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
