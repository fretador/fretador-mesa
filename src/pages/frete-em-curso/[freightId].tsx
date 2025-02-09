import React from "react";
import { useRouter } from "next/router";
import FreightInProgress from "@/pages/frete-em-curso/index";
import SmallLoading from "@/components/SmallLoading";

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
        <SmallLoading />
      </div>
    );
  }

  return <FreightInProgress freightId={freightId as string} />;
};

export default FreightPage;
