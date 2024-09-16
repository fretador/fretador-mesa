import React from "react";
import { UseFormRegister } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import { ShippingType } from "@/utils/enums/shippingTypeEnum";
import styles from "./ShippingTypeSection.module.css";

interface ShippingTypeSectionProps {
  register: UseFormRegister<CreateFreightInput>;
  handleInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const ShippingTypeSection: React.FC<ShippingTypeSectionProps> = ({
  register,
  handleInputChange,
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Tipo de Embarque</h2>
      <div className={`${styles.radioGroup} ${styles.inlineRadioGroup}`}>
        {Object.values(ShippingType).map((type) => (
          <label key={type}>
            <input
              type="radio"
              {...register("shippingType")}
              value={type}
              onChange={handleInputChange}
            />
            {type}
          </label>
        ))}
      </div>
    </section>
  );
};

export default ShippingTypeSection;
