import React from "react";
<<<<<<< HEAD
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./ObservationsSection.module.css";

const ObservationsSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

=======
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
>>>>>>> dce10fb (conflict)
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
<<<<<<< HEAD
            errors.observations ? styles.errorInput : ""
=======
            errors.observations ? styles.error : ""
>>>>>>> dce10fb (conflict)
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
