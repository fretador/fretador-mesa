import React from "react";
import { UseFormRegister } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
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
        <label>
          <input
            type="radio"
            {...register("shippingType")}
            value="Coleta"
            onChange={handleInputChange}
          />
          Coleta
        </label>
        <label>
          <input
            type="radio"
            {...register("shippingType")}
            value="Entrega"
            onChange={handleInputChange}
          />
          Entrega
        </label>
        <label>
          <input
            type="radio"
            {...register("shippingType")}
            value="Ida"
            onChange={handleInputChange}
          />
          Ida / Volta
        </label>
      </div>
    </section>
  );
};

export default ShippingTypeSection;
