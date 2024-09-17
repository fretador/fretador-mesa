import React from "react";
<<<<<<< HEAD
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import { ShippingType } from "@/utils/enums/shippingTypeEnum";
import styles from "./ShippingTypeSection.module.css";

const ShippingTypeSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

=======
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
>>>>>>> dce10fb (conflict)
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Tipo de Embarque</h2>
      <div className={`${styles.radioGroup} ${styles.inlineRadioGroup}`}>
<<<<<<< HEAD
        {Object.values(ShippingType).map((type) => (
          <label key={type}>
            <input
              type="radio"
              {...register("shippingType", {
                required: "Tipo de embarque é obrigatório",
              })}
              value={type}
            />
            {type}
          </label>
        ))}
      </div>
      {errors.shippingType && (
        <p className={styles.errorMessage}>{errors.shippingType.message}</p>
      )}
=======
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
>>>>>>> dce10fb (conflict)
    </section>
  );
};

export default ShippingTypeSection;
