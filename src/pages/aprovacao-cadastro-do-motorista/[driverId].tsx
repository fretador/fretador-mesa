import React from "react";
import { useRouter } from "next/router";
import FreightInProgress from "@/pages/frete-em-curso/index";
import Loading from "@/components/Loading";
import DriverApproval from ".";

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
        <Loading />
      </div>
    );
  }

  return <DriverApproval />;
};

export default DriverPage;
