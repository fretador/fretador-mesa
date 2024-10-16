import React from 'react';
import styles from './ServiceSubject.module.css';

interface ServiceSubjectProps {
  subject: string;
}

const ServiceSubject = ({ subject }: ServiceSubjectProps) => {
  return (
      <p className={styles.subjectText}>{subject}</p>
  );
};

export default ServiceSubject;