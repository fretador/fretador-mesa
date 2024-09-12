import React from "react";
import styles from "./SidebarCompSeparator.module.css";

interface SeparatorProps {
  isRetracted: boolean;
}

const Separator: React.FC<SeparatorProps> = ({ isRetracted }) => {
  return (
    <div
      className={styles.separator_container}
      data-testid="separator-container"
    >
      {!isRetracted && <hr className={styles.separator} />}
    </div>
  );
};

export default Separator;
