import React from "react";
import styles from "./botao.module.css";

interface BotaoProps {
  text: string;
  onClick: () => void;
}

const Botao: React.FC<BotaoProps> = ({ text, onClick }) => {
  return (
    <button className={styles.botao} onClick={onClick}>
      {text}
    </button>
  );
};

export default Botao;
