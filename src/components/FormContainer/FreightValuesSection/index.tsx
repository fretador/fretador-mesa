import React from "react";
<<<<<<< HEAD
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./FreightValuesSection.module.css";

const FreightValueSection: React.FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

  const handlePedagioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "true";
    setValue("pedagioIncluso", value);
  };

  return (
    <section className={styles.section}>
      <div className={styles.rowInputs}>
        {/* Valor do Frete */}
        <div className={styles.inputGroup}>
          <label htmlFor="value" className={styles.label}>
            Valor do Frete (R$)
          </label>
          <input
            id="value"
            type="number"
            step="0.01"
            {...register("value", {
              valueAsNumber: true,
              required: "Valor do frete é obrigatório",
            })}
            className={`${styles.input} ${
              errors.value ? styles.errorInput : ""
            }`}
            placeholder="Valor do frete"
          />
          {errors.value && (
            <p className={styles.errorMessage}>{errors.value.message}</p>
          )}
        </div>

        {/* Pedágio Incluso */}
        {/* Pedágio Incluso */}
=======
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./FreightValuesSection.module.css";

interface FreightValueSectionProps {
  register: UseFormRegister<CreateFreightInput>;
  errors: FieldErrors<CreateFreightInput>;
}

const FreightValueSection: React.FC<FreightValueSectionProps> = ({
  register,
  errors,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.rowInputs}>
        <div className={styles.inputGroup}>
          <label htmlFor="freightValue" className={styles.label}>
            Valor do Frete (R$)
          </label>
          <input
            id="freightValue"
            type="number"
            step="0.01"
            {...register("freightValue", { valueAsNumber: true })}
            className={`${styles.input} ${
              errors.freightValue ? styles.error : ""
            }`}
            placeholder="Valor do frete"
          />
          {errors.freightValue && (
            <p className={styles.errorMessage}>{errors.freightValue.message}</p>
          )}
        </div>

>>>>>>> dce10fb (conflict)
        <div className={styles.inputGroup}>
          <label className={styles.label}>Pedágio Incluso?</label>
          <div className={styles.radioGroup}>
            <label>
<<<<<<< HEAD
              <input
                type="radio"
                {...register("pedagioIncluso", {
                  required: true,
                  setValueAs: (value) => value === "true",
                })}
                value="true"
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                {...register("pedagioIncluso", {
                  required: true,
                  setValueAs: (value) => value === "true",
                })}
                value="false"
              />
              Não
            </label>
          </div>
          {errors.pedagioIncluso && (
            <p className={styles.errorMessage}>
              {errors.pedagioIncluso.message}
            </p>
          )}
        </div>

        {/* Forma de Pagamento */}
=======
              <input type="radio" {...register("pedagioIncluso")} value="Sim" />
              Sim
            </label>
            <label>
              <input type="radio" {...register("pedagioIncluso")} value="Não" />
              Não
            </label>
          </div>
        </div>

>>>>>>> dce10fb (conflict)
        <div className={styles.inputGroup}>
          <label htmlFor="formaPagamento" className={styles.label}>
            Forma de Pagamento (opcional)
          </label>
          <input
            id="formaPagamento"
            type="text"
            {...register("formaPagamento")}
<<<<<<< HEAD
            className={`${styles.input} ${
              errors.formaPagamento ? styles.errorInput : ""
            }`}
=======
            className={styles.input}
>>>>>>> dce10fb (conflict)
            placeholder="Pix, Depósito, Pamcard, etc..."
          />
          {errors.formaPagamento && (
            <p className={styles.errorMessage}>
              {errors.formaPagamento.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FreightValueSection;
