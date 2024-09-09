import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./PickupDeliverySection.module.css"; // Importação dos estilos específicos para esse componente

interface PickupDeliverySectionProps {
  register: UseFormRegister<CreateFreightInput>;
  errors: FieldErrors<CreateFreightInput>;
  handleInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  inputValues: Partial<CreateFreightInput>;
}

const PickupDeliverySection: React.FC<PickupDeliverySectionProps> = ({
  register,
  errors,
  handleInputChange,
  inputValues,
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Dados da Coleta / Entrega</h2>

      <div className={styles.inputWrapper}>
        <label htmlFor="pickupDeliveryData" className={styles.label}>
          Data do Carregamento
        </label>
        <input
          id="pickupDeliveryData"
          type="date"
          {...register("pickupDeliveryData")}
          onChange={handleInputChange}
          className={`${styles.input} ${
            errors.pickupDeliveryData ? styles.error : ""
          }`}
        />
        {errors.pickupDeliveryData && (
          <p className={styles.errorMessage}>
            {errors.pickupDeliveryData.message}
          </p>
        )}
      </div>

      <div className={styles.rowInputs}>
        <div className={styles.inputWrapper}>
          <label htmlFor="origin" className={styles.label}>
            Origem
          </label>
          <input
            id="origin"
            type="text"
            {...register("origin")}
            onChange={handleInputChange}
            className={`${styles.input} ${errors.origin ? styles.error : ""}`}
            placeholder="Indique a origem ou CNPJ do remetente"
          />
          {inputValues.origin && <p>Valor atual: {inputValues.origin}</p>}
          {errors.origin && (
            <p className={styles.errorMessage}>{errors.origin.message}</p>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="destination" className={styles.label}>
            Destino
          </label>
          <input
            id="destination"
            type="text"
            {...register("destination")}
            onChange={handleInputChange}
            className={`${styles.input} ${
              errors.destination ? styles.error : ""
            }`}
            placeholder="Insira o destino ou o CNPJ do destinatário"
          />
          {inputValues.destination && (
            <p>Valor atual: {inputValues.destination}</p>
          )}
          {errors.destination && (
            <p className={styles.errorMessage}>{errors.destination.message}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PickupDeliverySection;
