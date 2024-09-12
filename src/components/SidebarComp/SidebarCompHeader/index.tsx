import React from "react";

import styles from "./SidebarCompHeader.module.css";
import { useAppSelector } from "@/store/store";
import FretadorIcon from "@/assets/images/fretadorIcon.svg";
import defaultAvatar from "@/assets/images/avatar.jpg";
import { BoardUser } from "@/utils/Interfaces/BoardUsers";
import CustomImage from "@/components/CustomImage";

interface SidebarCompHeaderProps {
  user: BoardUser;
}

const SidebarCompHeader: React.FC<SidebarCompHeaderProps> = ({ user }) => {
  const isRetracted = useAppSelector((state) => state.sidebar.isRetracted);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <FretadorIcon className={styles.logo} />
      </div>
      <div className={styles.userSection}>
        <CustomImage
          data-testid="custom-image"
          src={user.profilePicture || defaultAvatar}
          alt="User avatar"
          width={48}
          height={48}
          className={isRetracted ? styles.retractedAvatar : styles.avatar}
          unoptimized
        />
        {!isRetracted && <p data-testid="user-greeting">Olá, {user.name}!</p>}
      </div>
    </div>
  );
};

export default SidebarCompHeader;
