import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./FreightValuesSection.module.css";
import { RadioTrueIcon, RadioFalseIcon } from "@/utils/icons";

const FreightValueSection: React.FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

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
        <div className={styles.inputGroup}>
          <label className={styles.label}>Pedágio Incluso?</label>
          <Controller
            name="pedagioIncluso"
            control={control}
            rules={{ required: true }}
            defaultValue={false}
            render={({ field }) => (
              <div className={styles.iconGroup}>
                <div
                  className={styles.iconOption}
                  onClick={() => field.onChange(true)}
                >
                  {field.value === true ? (
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
                    name="pedagioIncluso"
                    value="true"
                    checked={field.value === true}
                    className={styles.hiddenRadio}
                    onChange={() => {}}
                  />
                  <span className={styles.iconText}>Sim</span>
                </div>
                <div
                  className={styles.iconOption}
                  onClick={() => field.onChange(false)}
                >
                  {field.value === false ? (
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
                    name="pedagioIncluso"
                    value="false"
                    checked={field.value === false}
                    className={styles.hiddenRadio}
                    onChange={() => {}}
                  />
                  <span className={styles.iconText}>Não</span>
                </div>
              </div>
            )}
          />
          {errors.pedagioIncluso && (
            <p className={styles.errorMessage}>
              {errors.pedagioIncluso.message}
            </p>
          )}
        </div>

        {/* Forma de Pagamento */}
        <div className={styles.inputGroup}>
          <label htmlFor="formaPagamento" className={styles.label}>
            Forma de Pagamento (opcional)
          </label>
          <input
            id="formaPagamento"
            type="text"
            {...register("formaPagamento")}
            className={`${styles.input} ${
              errors.formaPagamento ? styles.errorInput : ""
            }`}
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
