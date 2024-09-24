import React from "react";
import styles from "./FreightStep.module.css";
import Botao from "../Botao";
import Image from "next/image";

type ActionButtonTextType = "rastrear" | "ver ocorrência" | "ver anexos";

interface BaseFreightStepProps {
  theme: "dark" | "light";
  date: string | "";
  content: string;
  authorizeBoarding?: boolean;
  actionButton?: boolean;
}

// Condicional para o actionButton e o handleActionButton
interface ActionButtonTrueProps extends BaseFreightStepProps {
  actionButton: true;
  actionButtonText: ActionButtonTextType;
  handleActionButton: () => void;
}

interface ActionButtonFalseProps extends BaseFreightStepProps {
  actionButton?: false;
  actionButtonText?: never;
  handleActionButton?: never;
}

// Condicional para hasAttachment e attachmentPath
interface HasAttachmentTrueProps extends BaseFreightStepProps {
  hasAttachment: true;
  attachmentPath: string;
}

interface HasAttachmentFalseProps extends BaseFreightStepProps {
  hasAttachment?: false;
  attachmentPath?: never;
}

type FreightStepProps =
  | (ActionButtonTrueProps & HasAttachmentTrueProps)
  | (ActionButtonTrueProps & HasAttachmentFalseProps)
  | (ActionButtonFalseProps & HasAttachmentTrueProps)
  | (ActionButtonFalseProps & HasAttachmentFalseProps);

const FreightStep = ({
  theme,
  date,
  content,
  authorizeBoarding = false,
  actionButton = false,
  actionButtonText,
  handleActionButton,
  hasAttachment = false,
  attachmentPath,
}: FreightStepProps) => {
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

  const handleYesButton = () => {
    console.log("Funcionário da mesa autorizou o embarque");
  };

  const handleNoButton = () => {
    console.log("Funcionário da mesa não autorizou o embarque");
  };

  return (
    <>
      <div className={styles.container} style={{ backgroundColor }}>
        <div className={styles.dateAndHourContainer}>
          <p className={styles.date}>{formattedDate}</p>
          <p className={styles.hour}>{formattedTime}</p>
        </div>

        <div className={styles.verticalSeparator}></div>

        <div className={styles.mainContentContainer}>
          <p>{content}</p>
        </div>

        {authorizeBoarding && (
          <div className={styles.authorizeBoardingButtons}>
            <Botao
              text="SIM"
              className={styles.authorizeBoardingButtonYes}
              onClick={handleYesButton}
            />
            <Botao
              text="NÃO"
              className={styles.authorizeBoardingButtonNo}
              onClick={handleNoButton}
            />
          </div>
        )}

        {actionButton && (
          <div className={styles.actionButtonContainer}>
            <Botao text={actionButtonText!} onClick={handleActionButton!} />
          </div>
        )}
      </div>

      {hasAttachment && (
        <div className={styles.imagesContainer}>
          <Image
            src={attachmentPath!}
            alt="frete-em-curso-imagem"
            width={88}
            height={120}
          />
          {/* Adicione as outras imagens conforme necessário */}
        </div>
      )}
    </>
  );
};

export default FreightStep;
