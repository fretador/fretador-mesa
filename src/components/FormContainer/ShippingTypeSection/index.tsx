import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { CreateFreightInput } from "@/utils/interfaces/inputs/CreateFreightInput";
import { ShippingType } from "@/utils/enums/shippingTypeEnum";
import styles from "./ShippingTypeSection.module.css";
import { RadioTrueIcon, RadioFalseIcon } from "@/utils/icons";

const shippingTypeLabels: Record<ShippingType, string> = {
  [ShippingType.COLETA]: "Coleta",
  [ShippingType.ENTREGA]: "Entrega",
  [ShippingType.IDA_VOLTA]: "Ida e Volta",
};

const ShippingTypeSection: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Tipo de Embarque</h2>
      <Controller
        name="shippingType"
        control={control}
        rules={{ required: "Tipo de embarque é obrigatório" }}
        defaultValue={ShippingType.COLETA}
        render={({ field }) => (
          <div className={styles.iconGroup}>
            {Object.values(ShippingType).map((type) => (
              <div
                key={type}
                className={styles.iconOption}
                onClick={() => field.onChange(type)}
              >
                {field.value === type ? (
                  <RadioTrueIcon
                    className={styles.icon}
                    width={24}
                    height={24}
                  />
                ) : (
                  <RadioFalseIcon
                    className={styles.icon}
                    width={24}
                    height={24}
                  />
                )}
                <input
                  type="radio"
                  name="shippingType"
                  value={type}
                  checked={field.value === type}
                  className={styles.hiddenRadio}
                  onChange={() => {}}
                />
                <span className={styles.iconText}>
                  {shippingTypeLabels[type]}
                </span>
              </div>
            ))}
          </div>
        )}
      />
      {errors.shippingType && (
        <p className={styles.errorMessage}>{errors.shippingType.message}</p>
      )}
    </section>
  );
};

export default ShippingTypeSection;
