import React from "react";
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import { ShippingType } from "@/utils/enums/shippingTypeEnum";
import styles from "./ShippingTypeSection.module.css";

const shippingTypeLabels: Record<ShippingType, string> = {
  [ShippingType.COLETA]: "Coleta",
  [ShippingType.ENTREGA]: "Entrega",
  [ShippingType.IDA_VOLTA]: "Ida e Volta",
};

const ShippingTypeSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Tipo de Embarque</h2>
      <div className={`${styles.radioGroup} ${styles.inlineRadioGroup}`}>
        {Object.values(ShippingType).map((type) => (
          <label key={type}>
            <input
              type="radio"
              {...register("shippingType", {
                required: "Tipo de embarque é obrigatório",
              })}
              value={type}
            />
            {shippingTypeLabels[type]}
          </label>
        ))}
      </div>
      {errors.shippingType && (
        <p className={styles.errorMessage}>{errors.shippingType.message}</p>
      )}
    </section>
  );
};

export default ShippingTypeSection;
