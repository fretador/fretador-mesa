import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./ObservationsSection.module.css";

interface ObservationsSectionProps {
  register: UseFormRegister<CreateFreightInput>;
  errors: FieldErrors<CreateFreightInput>;
}

const ObservationsSection: React.FC<ObservationsSectionProps> = ({
  register,
  errors,
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Observações</h2>

      <div className={styles.inputGroup}>
        <label htmlFor="observations" className={styles.label}>
          Adicione Informações Relevantes sobre a Carga
        </label>
        <textarea
          id="observations"
          {...register("observations")}
          className={`${styles.textarea} ${
            errors.observations ? styles.error : ""
          }`}
          placeholder="Adicione informações relevantes ou observações"
        />
        {errors.observations && (
          <p className={styles.errorMessage}>{errors.observations.message}</p>
        )}
      </div>
    </section>
  );
};

export default ObservationsSection;
