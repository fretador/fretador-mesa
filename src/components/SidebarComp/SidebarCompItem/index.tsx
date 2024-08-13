import React from "react";
import styles from "./SidebarCompItem.module.css";

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isRetracted: boolean;
  isFocused: boolean;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  text,
  isRetracted,
  isFocused,
  badge,
}) => {
  return (
    <li
      className={`${styles.navItem} ${isRetracted ? styles.retracted : ""} ${
        isFocused ? styles.focused : ""
      }`}
    >
      <span className={styles.icon}>{icon}</span>
      {!isRetracted && <span className={styles.text}>{text}</span>}
      {badge !== undefined && badge > 0 && (
        <span className={styles.badge}>{badge}</span>
      )}
    </li>
  );
};

export default NavItem;
