import React from "react";
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./CargoDetailsSection.module.css";

const CargoDetailsSection: React.FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

  const handleBooleanRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "needsTarp" | "needsTracker"
  ) => {
    const booleanValue = e.target.value === "true";
    setValue(fieldName, booleanValue);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Dados da Carga</h2>

      <div className={styles.rowRadioGroups}>
        {/* Tipo de Carga */}
        <div className={styles.radioGroup}>
          <label className={styles.label}>Tipo de Carga</label>
          <div className={styles.radioOptions}>
            <label>
              <input
                type="radio"
                {...register("cargoLoadType", { required: true })}
                value="FULL"
              />
              Completa
            </label>
            <label>
              <input
                type="radio"
                {...register("cargoLoadType", { required: true })}
                value="PARTIAL"
              />
              Complemento
            </label>
          </div>
          {errors.cargoLoadType && (
            <p className={styles.errorMessage}>
              {errors.cargoLoadType.message}
            </p>
          )}
        </div>

        {/* Precisa de Lona */}
        <div className={styles.radioGroup}>
          <label className={styles.label}>Precisa de Lona?</label>
          <div className={styles.radioOptions}>
            <label>
              <input
                type="radio"
                {...register("needsTarp", {
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
                {...register("needsTarp", {
                  required: true,
                  setValueAs: (value) => value === "true",
                })}
                value="false"
              />
              Não
            </label>
          </div>
          {errors.needsTarp && (
            <p className={styles.errorMessage}>{errors.needsTarp.message}</p>
          )}
        </div>

        {/* Precisa de Rastreador */}
        <div className={styles.radioGroup}>
          <label className={styles.label}>Precisa de Rastreador?</label>
          <div className={styles.radioOptions}>
            <label>
              <input
                type="radio"
                {...register("needsTracker", {
                  required: true,
                  setValueAs: (value) => value === true,
                })}
                value="true"
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                {...register("needsTracker", {
                  required: true,
                  setValueAs: (value) => value === "true",
                })}
                value="false"
              />
              Não
            </label>
          </div>
          {errors.needsTracker && (
            <p className={styles.errorMessage}>{errors.needsTracker.message}</p>
          )}
        </div>
      </div>

      <div className={styles.rowInputs}>
        <div className={styles.inputGroup}>
          <label htmlFor="product" className={styles.label}>
            Produto
          </label>
          <input
            id="product"
            type="text"
            {...register("product", { required: true })}
            className={`${styles.input} ${
              errors.product ? styles.errorInput : ""
            }`}
            placeholder="Qual produto será carregado?"
          />
          {errors.product && (
            <p className={styles.errorMessage}>{errors.product.message}</p>
          )}
        </div>

        {/* Dropdown de Espécie */}
        <div className={styles.inputGroup}>
          <label htmlFor="cargoType" className={styles.label}>
            Espécie
          </label>
          <select
            id="cargoType"
            {...register("cargoType", { required: true })}
            className={`${styles.input} ${
              errors.cargoType ? styles.errorInput : ""
            }`}
          >
            <option value="">Selecione a espécie de carga</option>
            {/* Valores correspondentes ao enum CargoType */}
            <option value="Animais">Animais</option>
            <option value="Big Bag">Big Bag</option>
            <option value="Caixas">Caixas</option>
            <option value="Container">Container</option>
            <option value="Diversos">Diversos</option>
            <option value="Fardos">Fardos</option>
            <option value="Fracionada">Fracionada</option>
            <option value="Granel">Granel</option>
            <option value="Metro Cúbico">Metro Cúbico</option>
            <option value="Milheiro">Milheiro</option>
            <option value="Mudança">Mudança</option>
            <option value="Paletes">Paletes</option>
            <option value="Passageiro">Passageiro</option>
            <option value="Sacos">Sacos</option>
            <option value="Tambor">Tambor</option>
            <option value="Unidades">Unidades</option>
          </select>
          {errors.cargoType && (
            <p className={styles.errorMessage}>{errors.cargoType.message}</p>
          )}
        </div>
      </div>

      <div className={styles.rowInputs}>
        <div className={styles.inputGroup}>
          <label htmlFor="totalWeight" className={styles.label}>
            Peso Total (kg)
          </label>
          <input
            id="totalWeight"
            type="number"
            {...register("totalWeight", {
              valueAsNumber: true,
              required: true,
            })}
            className={`${styles.input} ${
              errors.totalWeight ? styles.errorInput : ""
            }`}
            placeholder="Kg"
          />
          {errors.totalWeight && (
            <p className={styles.errorMessage}>{errors.totalWeight.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="volumes" className={styles.label}>
            Volumes (opcional)
          </label>
          <input
            id="volumes"
            type="number"
            {...register("volumes", { valueAsNumber: true })}
            className={`${styles.input} ${
              errors.volumes ? styles.errorInput : ""
            }`}
            placeholder="Número de volumes"
          />
          {errors.volumes && (
            <p className={styles.errorMessage}>{errors.volumes.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="cubage" className={styles.label}>
            Cubagem (m³, opcional)
          </label>
          <input
            id="cubage"
            type="number"
            step="0.01"
            {...register("cubage", { valueAsNumber: true })}
            className={`${styles.input} ${
              errors.cubage ? styles.errorInput : ""
            }`}
            placeholder="M³"
          />
          {errors.cubage && (
            <p className={styles.errorMessage}>{errors.cubage.message}</p>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="moreDetails" className={styles.label}>
            Mais Detalhes
          </label>
          <input
            id="moreDetails"
            type="text"
            {...register("moreDetails")}
            className={`${styles.input} ${
              errors.moreDetails ? styles.errorInput : ""
            }`}
            placeholder="Outras informações relevantes"
          />
          {errors.moreDetails && (
            <p className={styles.errorMessage}>{errors.moreDetails.message}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CargoDetailsSection;
