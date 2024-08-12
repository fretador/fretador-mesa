import { useAppSelector } from "@/store/store";
import { BoardUser } from "@/utils/Interfaces/BoardUsers";
import { ReactNode } from "react";
import styles from "./SidebarCompRoot.module.css";

interface SideBarProps {
  children: ReactNode;
  user: BoardUser;
}

const SidebarCompRoot: React.FC<SideBarProps> = ({ children, user }) => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);

  return (
    <nav
      className={`${styles.sidebar} ${
        isRetracted ? styles.retracted : styles.not_retracted
      }`}
      data-testid="side-bar"
    >
      {children}
    </nav>
  );
};

export default SidebarCompRoot;
