import React from "react";
import { UseFormRegister } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./VehicleSelectionSection.module.css"; // Estilos específicos

interface VehicleSelectionSectionProps {
  register: UseFormRegister<CreateFreightInput>;
  handleInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const VehicleSelectionSection: React.FC<VehicleSelectionSectionProps> = ({
  register,
  handleInputChange,
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Seleção de Veículos</h2>
      <h3 className={styles.subtitle}>
        Escolha quantos veículos forem necessários
      </h3>

      <div className={styles.vehicleCheckboxes}>
        {/* Leves */}
        <div className={styles.checkboxColumn}>
          <h4>Leves</h4>
          <label>
            <input
              type="checkbox"
              {...register("vehicleUtilitario")}
              onChange={handleInputChange}
            />
            Utilitário
          </label>
          <label>
            <input
              type="checkbox"
              {...register("vehicleTresQuartos")}
              onChange={handleInputChange}
            />
            3/4
          </label>
          <label>
            <input
              type="checkbox"
              {...register("vehicleToco")}
              onChange={handleInputChange}
            />
            Toco
          </label>
        </div>

        {/* Médios */}
        <div className={styles.checkboxColumn}>
          <h4>Médios</h4>
          <label>
            <input
              type="checkbox"
              {...register("vehicleTruck")}
              onChange={handleInputChange}
            />
            Truck
          </label>
          <label>
            <input
              type="checkbox"
              {...register("vehicleBiTruck")}
              onChange={handleInputChange}
            />
            Bi-truck
          </label>
        </div>

        {/* Pesados */}
        <div className={styles.checkboxColumn}>
          <h4>Pesados</h4>
          <label>
            <input
              type="checkbox"
              {...register("vehicleCarretaSimples")}
              onChange={handleInputChange}
            />
            Carreta Simples
          </label>
          <label>
            <input
              type="checkbox"
              {...register("vehicleCarretaLS")}
              onChange={handleInputChange}
            />
            Carreta LS
          </label>
          <label>
            <input
              type="checkbox"
              {...register("vehicleVanderleia")}
              onChange={handleInputChange}
            />
            Carreta Vanderleia
          </label>
        </div>
      </div>
    </section>
  );
};

export default VehicleSelectionSection;
