import React from 'react';
import styles from './ServiceNumber.module.css';

interface ServiceNumberProps {
  number: string;
}

const ServiceNumber = ({ number }: ServiceNumberProps) => {
  return (
      <p>{number}</p>
  );
};

export default ServiceNumber;