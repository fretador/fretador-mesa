import { FreightStatus } from "@/utils/enums/freightStatusEnum"; // Importando o enum correto
import styles from "./RowRoot.module.css";
import React, { ReactNode, cloneElement, Children, ReactElement } from "react";

interface RowRootProps {
  children: ReactNode;
  freightStatus?: FreightStatus; // Usar o enum FreightStatus
  customBackgroundColor?: string;
  onClick?: () => void;
}

interface FreightStatusProps {
  freightStatus: FreightStatus; // Assumir que sempre será fornecido um status válido
}

const RowRoot = ({
  children,
  freightStatus = FreightStatus.WAITING,
  customBackgroundColor,
  onClick,
}: RowRootProps) => {
  const getBackgroundColor = (status: FreightStatus) => {
    switch (status) {
      case FreightStatus.WAITING:
        return "rgba(255, 193, 7, 0.3)";
      case FreightStatus.TARGETED:
        return "rgba(186, 133, 1, 0.3)";
      case FreightStatus.REQUESTED:
        return "rgba(186, 133, 1, 0.3)";
      case FreightStatus.APPROVED:
        return "rgba(163, 56, 48, 0.3)";
      case FreightStatus.PICKUP_ORDER_SENT:
        return "rgba(28, 149, 44, 0.3)";
      case FreightStatus.OPERATION_REQUIRED:
        return "rgba(28, 149, 44, 0.3)";
      case FreightStatus.OPERATION_APPROVED:
        return "rgba(28, 149, 44, 0.3)";
      case FreightStatus.ADMIN_REQUIRED:
        return "rgba(28, 149, 44, 0.3)";
      case FreightStatus.ADMIN_APPROVED:
        return "rgba(28, 149, 44, 0.3)";
      case FreightStatus.FINISHED:
        return "rgba(57, 55, 55, 0.3)";
      case FreightStatus.CANCELED:
        return "rgba(255, 193, 7, 0.3)";
      default:
        return "#FAFDFD";
    }
  };

  const backgroundColor =
    customBackgroundColor || getBackgroundColor(freightStatus);

  return (
    <div
      className={styles.container}
      style={{ backgroundColor, cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      <div className={styles.content}>
        {Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            if (
              typeof child.type === "function" &&
              child.type.name === "FreightStatus"
            ) {
              return cloneElement(child, {
                freightStatus: freightStatus || FreightStatus.WAITING,
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
