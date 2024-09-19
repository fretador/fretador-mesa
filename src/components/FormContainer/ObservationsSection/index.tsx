import React from "react";
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./ObservationsSection.module.css";

const ObservationsSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Observações</h2>

      <div className={styles.inputGroup}>
        <textarea
          id="observations"
          {...register("observations")}
          className={`${styles.textarea} ${
            errors.observations ? styles.errorInput : ""
          }`}
          placeholder="Deixe as descrições do frete aqui."
        />
        {errors.observations && (
          <p className={styles.errorMessage}>{errors.observations.message}</p>
        )}
      </div>
    </section>
  );
};

export default ObservationsSection;
