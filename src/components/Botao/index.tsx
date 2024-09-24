import React from "react";
import styles from "./botao.module.css";

interface BotaoProps {
  text: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Botao: React.FC<BotaoProps> = ({
  text,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <button
      className={`${styles.botao} ${className}`}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default Botao;
