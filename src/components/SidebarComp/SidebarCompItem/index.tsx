import React from "react";
import { useRouter } from "next/router";
import styles from "./SidebarCompItem.module.css";

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  isRetracted: boolean;
  isFocused: boolean;
  badge?: number;
  onClick?: () => void; // Nova prop opcional para o onClick adicional
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  text,
  isRetracted,
  isFocused,
  badge,
  onClick, // Nova prop recebida
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

  // Função que combina a navegação com o onClick adicional
  const handleNavigation = () => {
    const route = `/${removeAccents(text)}`;
    router.push(route);
  };

  // Função que combina os dois onClick handlers (navegação e o adicional)
  const handleClick = () => {
    handleNavigation(); // Primeiro, executa a navegação
    if (onClick) {
      onClick(); // Se o onClick adicional existir, executa ele
    }
  };

  return (
    <li
      className={`${styles.navItem} ${isRetracted ? styles.retracted : ""} ${
        isFocused ? styles.focused : ""
      }`}
      onClick={handleClick} // Usa a função combinada no onClick
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
