import React from "react";
import styles from "./index.module.css";
import Botao from "@/components/Botao";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1>Hello World</h1>
      <Botao onClick={() => {}} text={"Clique aqui"} />
    </div>
  );
};

export default Home;
