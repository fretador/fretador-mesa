import React from "react";
import { useRouter } from "next/router";
import FreightInProgress from "@/pages/frete-em-curso/index";
import SmallLoading from "@/components/SmallLoading";
import RegisteredDriver from ".";

const DriverPage: React.FC = () => {
  const router = useRouter();
  const { driverId } = router.query;

  if (!driverId) {
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

  return <RegisteredDriver />;
};

export default DriverPage;
