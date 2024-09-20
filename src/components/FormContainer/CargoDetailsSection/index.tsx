import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./CargoDetailsSection.module.css";
import { RadioTrueIcon, RadioFalseIcon } from "@/utils/icons";
import { CargoLoadType } from "@/utils/enums/cargoLoadTypeEnum";

const CargoDetailsSection: React.FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Dados da Carga</h2>

      <div className={styles.rowRadioGroups}>
        {/* Tipo de Carga */}
        <div className={styles.radioGroup}>
          <label className={styles.label}>Tipo de Carga</label>
          <Controller
            name="cargoLoadType"
            control={control}
            rules={{ required: true }}
            defaultValue={CargoLoadType.FULL}
            render={({ field }) => (
              <div className={styles.iconGroup}>
                <div
                  className={styles.iconOption}
                  onClick={() => field.onChange("FULL")}
                >
                  {field.value === "FULL" ? (
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
                    name="cargoLoadType"
                    value="FULL"
                    checked={field.value === "FULL"}
                    className={styles.hiddenRadio}
                    onChange={() => {}}
                  />
                  <span className={styles.iconText}>Completa</span>
                </div>
                <div
                  className={styles.iconOption}
                  onClick={() => field.onChange("PARTIAL")}
                >
                  {field.value === "PARTIAL" ? (
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
                    name="cargoLoadType"
                    value="PARTIAL"
                    checked={field.value === "PARTIAL"}
                    className={styles.hiddenRadio}
                    onChange={() => {}}
                  />
                  <span className={styles.iconText}>Complemento</span>
                </div>
              </div>
            )}
          />
          {errors.cargoLoadType && (
            <p className={styles.errorMessage}>
              {errors.cargoLoadType.message}
            </p>
          )}
        </div>

        {/* Precisa de Lona */}
        <div className={styles.radioGroup}>
          <label className={styles.label}>Precisa de Lona?</label>
          <Controller
            name="needsTarp"
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
                    name="needsTarp"
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
                    name="needsTarp"
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
          {errors.needsTarp && (
            <p className={styles.errorMessage}>{errors.needsTarp.message}</p>
          )}
        </div>

        {/* Precisa de Rastreador */}
        <div className={styles.radioGroup}>
          <label className={styles.label}>Precisa de Rastreador?</label>
          <Controller
            name="needsTracker"
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
                    name="needsTracker"
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
                    name="needsTracker"
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
          {errors.needsTracker && (
            <p className={styles.errorMessage}>{errors.needsTracker.message}</p>
          )}
        </div>
      </div>

      <div className={styles.rowInputs}>
        <div className={styles.halfWidth}>
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
        </div>

        <div className={styles.halfWidth}>
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
              <option value="" className={styles.firstOption}>
                Selecione a espécie de carga
              </option>
              <option value="ANIMAIS">Animais</option>
              <option value="BIG_BAG">Big Bag</option>
              <option value="CAIXAS">Caixas</option>
              <option value="CONTAINER">Container</option>
              <option value="DIVERSO">Diversos</option>
              <option value="FARDOS">Fardos</option>
              <option value="FRACIONADA">Fracionada</option>
              <option value="GRANEL">Granel</option>
              <option value="METRO_CUBICO">Metro Cúbico</option>
              <option value="MILHEIRO">Milheiro</option>
              <option value="MUDANCA">Mudança</option>
              <option value="PALETES">Paletes</option>
              <option value="PASSAGEIRO">Passageiro</option>
              <option value="SACOS">Sacos</option>
              <option value="TAMBOR">Tambor</option>
              <option value="UNIDADES">Unidades</option>
            </select>
            {errors.cargoType && (
              <p className={styles.errorMessage}>{errors.cargoType.message}</p>
            )}
          </div>
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
            Cubagem (opcional)
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
