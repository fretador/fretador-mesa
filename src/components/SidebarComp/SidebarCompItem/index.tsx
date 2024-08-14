import React from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ç/g, "c")
      .replace(/ñ/g, "n")
      .toLowerCase();
  };

  const handleNavigation = () => {
    const route = `/${removeAccents(text)}`;
    router.push(route);
  };

  return (
    <li
      className={`${styles.navItem} ${isRetracted ? styles.retracted : ""} ${
        isFocused ? styles.focused : ""
      }`}
      onClick={handleNavigation}
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
