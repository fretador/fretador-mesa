import React from "react";
import styles from "./SidebarCompList.module.css";

interface NavListProps {
  children: React.ReactNode;
}

const NavList: React.FC<NavListProps> = ({ children }) => {
  return <ul className={styles.navList}>{children}</ul>;
};

export default NavList;
