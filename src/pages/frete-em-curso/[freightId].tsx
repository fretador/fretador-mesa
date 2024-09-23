import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FreightInProgress from "@/pages/frete-em-curso/index";

const FreightPage: React.FC = () => {
  const router = useRouter();
  const { freightId } = router.query; // Pega o freightId da URL

  if (!freightId) {
    return <p>Carregando...</p>; // Enquanto o freightId não estiver disponível
  }

  return <FreightInProgress freightId={freightId as string} />; // Passa o freightId para o componente
};

export default FreightPage;
