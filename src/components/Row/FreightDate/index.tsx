import styles from "./FreightDate.module.css";
import React from "react";

interface FreightDateProps {
  date: string;
}

const FreightDate = ({ date }: FreightDateProps) => {
  return <p>{date}</p>;
};

export default FreightDate;
