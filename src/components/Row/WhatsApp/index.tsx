import React from "react";
import styles from './Whatsapp.module.css';

interface WhatsAppProps {
  whatsApp: string
}

const WhatsApp = ({whatsApp}: WhatsAppProps) => {

  const formattedWhatsApp = `${whatsApp.slice(0, 2)}-${whatsApp.slice(2, 3)}.${whatsApp.slice(3, 7)}-${whatsApp.slice(7)}`;

  return (
    <p>{formattedWhatsApp}</p>
  )
}

export default WhatsApp;
