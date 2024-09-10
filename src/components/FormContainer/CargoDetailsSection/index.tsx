import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./CargoDetailsSection.module.css"; // Importação dos estilos específicos

interface CargoDetailsSectionProps {
  register: UseFormRegister<CreateFreightInput>;
  errors: FieldErrors<CreateFreightInput>;
  handleInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const CargoDetailsSection: React.FC<CargoDetailsSectionProps> = ({
  register,
  errors,
  handleInputChange,
}) => {
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
                {...register("cargoLoadType")}
                value="completa"
                onChange={handleInputChange}
              />
              Completa
            </label>
            <label>
              <input
                type="radio"
                {...register("cargoLoadType")}
                value="complemento"
                onChange={handleInputChange}
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

        {/* Lona */}
        <div className={styles.radioGroup}>
          <label className={styles.label}>Precisa de Lona?</label>
          <div className={styles.radioOptions}>
            <label>
              <input
                type="radio"
                {...register("needsTarp")}
                value="sim"
                onChange={handleInputChange}
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                {...register("needsTarp")}
                value="nao"
                onChange={handleInputChange}
              />
              Não
            </label>
          </div>
          {errors.needsTarp && (
            <p className={styles.errorMessage}>{errors.needsTarp.message}</p>
          )}
        </div>

        {/* Rastreador */}
        <div className={styles.radioGroup}>
          <label className={styles.label}>Precisa de Rastreador?</label>
          <div className={styles.radioOptions}>
            <label>
              <input
                type="radio"
                {...register("needsTracker")}
                value="sim"
                onChange={handleInputChange}
              />
              Sim
            </label>
            <label>
              <input
                type="radio"
                {...register("needsTracker")}
                value="nao"
                onChange={handleInputChange}
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
            {...register("product")}
            onChange={handleInputChange}
            className={`${styles.input} ${errors.product ? styles.error : ""}`}
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
            {...register("cargoType")}
            onChange={handleInputChange}
            className={`${styles.input} ${
              errors.cargoType ? styles.error : ""
            }`}
          >
            <option value="">Selecione a espécie de carga</option>
            <option value="Animais">Animais</option>
            <option value="Big Bag">Big Bag</option>
            <option value="Caixas">Caixas</option>
            <option value="Container">Container</option>
            <option value="Diversos">Diversos</option>
            <option value="Fardos">Fardos</option>
            <option value="Fracionada">Fracionada</option>
            <option value="Granel">Granel</option>
            <option value="Metro Cubico">Metro Cúbico</option>
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
            {...register("totalWeight", { valueAsNumber: true })}
            onChange={handleInputChange}
            className={`${styles.input} ${
              errors.totalWeight ? styles.error : ""
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
            onChange={handleInputChange}
            className={`${styles.input} ${errors.volumes ? styles.error : ""}`}
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
            onChange={handleInputChange}
            className={`${styles.input} ${errors.cubage ? styles.error : ""}`}
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
            onChange={handleInputChange}
            className={styles.input}
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
