import React from "react";
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

        <div className={styles.inputGroup}>
          <label className={styles.label}>Pedágio Incluso?</label>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" {...register("pedagioIncluso")} value="Sim" />
              Sim
            </label>
            <label>
              <input type="radio" {...register("pedagioIncluso")} value="Não" />
              Não
            </label>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="formaPagamento" className={styles.label}>
            Forma de Pagamento (opcional)
          </label>
          <input
            id="formaPagamento"
            type="text"
            {...register("formaPagamento")}
            className={styles.input}
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
