import React from "react";
import PickupDeliverySection from "@/components/FormContainer/PickupDeliverySection";
import CargoDetailsSection from "@/components/FormContainer/CargoDetailsSection";
import VehicleSelectionSection from "@/components/FormContainer/VehicleSelectionSection";
import BodyworkSelectionSection from "../FormContainer/BodyworkSelectionSection";
import ShippingTypeSection from "../FormContainer/ShippingTypeSection";
import FreightValueSection from "../FormContainer/FreightValuesSection";
import ObservationsSection from "../FormContainer/ObservationsSection";
import styles from "./FreightForm.module.css";
import FreightSubmissionButtons from "../FormContainer/FreightSubmissionButton";
import EditFreightButton from "../EditFreightButton";

interface FreightFormProps {
  showFreightSubmissionButton?: boolean;
  showEditFreightButton?: boolean;
  onSubmit?: any
}

const FreightForm: React.FC<FreightFormProps> = ({
  showFreightSubmissionButton = false,
  showEditFreightButton = false,
  onSubmit
}) => {

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.content}>
        <PickupDeliverySection />
        <CargoDetailsSection />
        <VehicleSelectionSection />
        <BodyworkSelectionSection />
        <ShippingTypeSection />
        <FreightValueSection />
        <ObservationsSection />

        {showFreightSubmissionButton && <FreightSubmissionButtons onDirectToDriver={function (driverId?: string): void {
          throw new Error("Function not implemented.");
        } } onCreateOffer={function (): void {
          throw new Error("Function not implemented.");
        } } />}
        {showEditFreightButton && <EditFreightButton />}
      </div>
    </form>
  );
};

export default FreightForm;
