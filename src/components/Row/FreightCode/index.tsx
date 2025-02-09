import React from 'react';
import styles from './FreightCode.module.css';

interface FreightCodeProps {
  code: string;
  style?: React.CSSProperties;
}

const FreightCode: React.FC<FreightCodeProps> = ({ code, style }) => {
  return (
      <p style={style}>#{code}</p>
  );
};

export default FreightCode;