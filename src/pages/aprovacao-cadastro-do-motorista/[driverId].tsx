import React from "react";
import { useRouter } from "next/router";
import DriverApproval from ".";
import SmallLoading from "@/components/SmallLoading";

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

  return <DriverApproval />;
};

export default DriverPage;
