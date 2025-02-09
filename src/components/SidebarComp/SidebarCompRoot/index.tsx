import { useAppDispatch, useAppSelector } from "@/store/store";
import { BoardUser } from "@/utils/Interfaces/BoardUser";
import { ReactNode } from "react";
import styles from "./SidebarCompRoot.module.css";
import { toggleSidebar } from "@/store/slices/sidebarSlice";

interface SideBarProps {
  children: ReactNode;
  user: BoardUser;
  className?: string;
}

const SidebarCompRoot: React.FC<SideBarProps> = ({
  children,
  user,
  className,
}) => {
  const dispatch = useAppDispatch();
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <nav
      className={`${styles.sidebar} ${
        isRetracted ? styles.retracted : styles.not_retracted
      } ${className || ""}`}
      data-testid="side-bar"
    >
      {children}
      <div
        className={`${styles.tab} ${
          isRetracted ? styles.sidebarRetracted : styles.sidebarExpanded
        } ${isRetracted ? styles.transparentTab : ""}`}
        onClick={handleToggle}
      >
        <div
          className={`${styles.tabContent} ${
            isRetracted ? styles.retractedClipPath : styles.expandedClipPath
          }`}
        ></div>
      </div>
    </nav>
  );
};

export default SidebarCompRoot;
