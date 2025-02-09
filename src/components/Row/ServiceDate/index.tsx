import styles from "./ServiceDate.module.css";
import React from "react";

interface ServiceDateProps {
  date: string;
}

const ServiceDate = ({ date }: ServiceDateProps) => {
  return <p>{date}</p>;
};

export default ServiceDate;
