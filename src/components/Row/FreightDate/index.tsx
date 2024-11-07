import React from "react";

interface FreightDateProps {
  date: string;
  style?: React.CSSProperties;
}

const FreightDate = ({ date, style }: FreightDateProps) => {
  return <p style={style}>{date}</p>;
};

export default FreightDate;
