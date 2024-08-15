import React from 'react';
import styles from './FreightCode.module.css';

interface FreightCodeProps {
  code: string;
}

const FreightCode: React.FC<FreightCodeProps> = ({ code }) => {
  return (
    <div>
      <p>{code}</p>
    </div>
  );
};

export default FreightCode;