import React from "react";
import styles from './HighlightDashboard.module.css'
import { ArrowRightIcon } from "@/utils/icons";

type TitleOption = "fretes em andamento" | "ocorrências" | "novos cadastros" | "cargas em aberto"

interface ElementsProps {
  number: string,
  title: TitleOption,
  src: string
}

const HighlightDashboard = ({number, title, src}: ElementsProps) => {

  const numberClassName =
    title === "fretes em andamento"
      ? styles.freightInProgress
      : title === "ocorrências"
      ? styles.occurrences
      : title === "novos cadastros"
      ? styles.newRegistrations
      : title === "cargas em aberto"
      ? styles.openLoads
      : ''

  return (
    <div className={styles.container}>
      <p className={`${numberClassName} ${styles.number}`}>{number}</p>

      <div className={styles.textsContainer}>

        <p className={styles.title}>{title}</p>
        <div className={styles.buttonContainer}>
          <a href={src} className={styles.src}>Ver</a>
          <ArrowRightIcon />
        </div>

      </div>
    </div>
  )
}

export default HighlightDashboard