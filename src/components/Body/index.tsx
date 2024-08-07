import React, { ReactNode } from "react";
import styles from "./Body.module.css";

interface BodyProps {
  children: ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <div className={styles.body}>{children}</div>;
};

export default Body;
