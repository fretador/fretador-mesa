import React from "react";
import styles from "./botao.module.css";

interface BotaoProps {
  text: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Botao: React.FC<BotaoProps> = ({
  text,
  onClick,
  type = "button",
  className,
  disabled = false
}) => {
  return (
    <button
      className={`${styles.botao} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Botao;
