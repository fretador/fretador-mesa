import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FreightInProgress from "@/pages/frete-em-curso/index";
import Loading from "@/components/Loading";
import { useAppSelector } from "@/store/hooks";
import { FreightService } from "@/services/freight";
import { FreightStatus } from "@/types/freight";
import { getStageFromStatus } from "@/utils/freight";

const FreightPage: React.FC = () => {
  const router = useRouter();
  const { freightId } = router.query;

  if (!freightId) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loading />
      </div>
    );
  }

  return <FreightInProgress freightId={freightId as string} />;
};

export default FreightPage;
