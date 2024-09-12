import FreightStatus from "../FreightStatus";
import styles from "./RowRoot.module.css";
import React, { ReactNode, cloneElement, Children, ReactElement } from "react";

type FreightStatusOption =
  | "DISPONIVEL"
  | "APROVAR"
  | "EM CURSO"
  | "FINALIZADO"
  | "AVAILABLE"
  | "APPROVED"
  | "IN_PROGRESS"
  | "FINISHED"
  | "WAITING"
  | "";

interface RowRootProps {
  children: ReactNode;
  freightStatus?: FreightStatusOption; // Permitir undefined
  customBackgroundColor?: string;
}

interface FreightStatusProps {
  freightStatus: FreightStatusOption; // Assumir que sempre será fornecido um status válido
}

const RowRoot = ({ children, freightStatus = "", customBackgroundColor }: RowRootProps) => {
  const getBackgroundColor = (status: FreightStatusOption) => {
    switch (status) {
      case "DISPONIVEL":
      case "AVAILABLE":
        return "rgba(186, 133, 1, 0.3)";
      case "APROVAR":
      case "APPROVED":
        return "rgba(163, 56, 48, 0.3)";
      case "EM CURSO":
      case "IN_PROGRESS":
        return "rgba(28, 149, 44, 0.3)";
      case "FINALIZADO":
      case "FINISHED":
        return "rgba(57, 55, 55, 0.3)";
      case "WAITING":
        return "rgba(255, 193, 7, 0.3)";
      default:
        return "#FAFDFD";
    }
  };

  const backgroundColor = customBackgroundColor || getBackgroundColor(freightStatus);

  return (
    <div className={styles.container} style={{ backgroundColor }}>
      <div className={styles.content}>
        {Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === FreightStatus) {
              return cloneElement(child, {
                freightStatus: freightStatus || "DISPONIVEL", // Garantir um valor válido
              } as FreightStatusProps);
            }
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default RowRoot;
