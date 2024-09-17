import React, { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./VehicleSelectionSection.module.css";
import { VehicleCategory, VehicleType } from "@/utils/enums/vehicleEnums";

interface VehicleOption {
  category: VehicleCategory;
  types: { type: VehicleType; label: string }[];
}

const vehicleOptions: VehicleOption[] = [
  {
    category: VehicleCategory.LEVE,
    types: [
      { type: VehicleType.UTILITARIO, label: "Utilitário" },
      { type: VehicleType.TRES_QUARTOS, label: "3/4" },
      { type: VehicleType.HR, label: "HR" },
      { type: VehicleType.TOCO, label: "Toco" },
    ],
  },
  {
    category: VehicleCategory.MEDIO,
    types: [
      { type: VehicleType.TRUCK, label: "Truck" },
      { type: VehicleType.BITRUCK, label: "Bi-truck" },
    ],
  },
  {
    category: VehicleCategory.PESADO,
    types: [
      { type: VehicleType.CARRETA, label: "Carreta" },
      { type: VehicleType.CARRETA_LS, label: "Carreta LS" },
      { type: VehicleType.CARRETA_TRUCADA, label: "Carreta Trucada" },
      { type: VehicleType.CARRETA_VANDERLEIA, label: "Carreta Vanderleia" },
      { type: VehicleType.BITREM, label: "Bitrem" },
      { type: VehicleType.RODOTREM, label: "Rodotrem" },
    ],
  },
];

const VehicleSelectionSection: React.FC = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

  const eligibleVehicles = watch("eligibleVehicles");

  useEffect(() => {
    // Inicializar "eligibleVehicles" se estiver vazio
    if (eligibleVehicles.length === 0) {
      const initialVehicles = vehicleOptions.flatMap((categoryOption) =>
        categoryOption.types.map((vehicle) => ({
          category: categoryOption.category,
          type: vehicle.type,
          eligible: false,
        }))
      );
      setValue("eligibleVehicles", initialVehicles);
    }
  }, [eligibleVehicles, setValue]);

  const handleVehicleChange = (
    category: VehicleCategory,
    type: VehicleType,
    checked: boolean
  ) => {
    const updatedVehicles = eligibleVehicles.map((vehicle) =>
      vehicle.category === category && vehicle.type === type
        ? { ...vehicle, eligible: checked }
        : vehicle
    );
    setValue("eligibleVehicles", updatedVehicles);
  };

  const handleAllCategoryChange = (
    category: VehicleCategory,
    checked: boolean
  ) => {
    const updatedVehicles = eligibleVehicles.map((vehicle) =>
      vehicle.category === category
        ? { ...vehicle, eligible: checked }
        : vehicle
    );
    setValue("eligibleVehicles", updatedVehicles);
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Veículo</h2>
      <p className={styles.subtitle}>Escolha quantos veículos quiser</p>

      <div className={styles.vehicleCheckboxes}>
        {vehicleOptions.map((categoryOption) => {
          const vehiclesInCategory = eligibleVehicles.filter(
            (v) => v.category === categoryOption.category
          );
          const allChecked = vehiclesInCategory.every((v) => v.eligible);

          return (
            <div
              key={categoryOption.category}
              className={styles.checkboxColumn}
            >
              <h4>
                {categoryOption.category === VehicleCategory.LEVE
                  ? "Leves"
                  : categoryOption.category === VehicleCategory.MEDIO
                  ? "Médios"
                  : "Pesados"}
              </h4>
              <label>
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={(e) =>
                    handleAllCategoryChange(
                      categoryOption.category,
                      e.target.checked
                    )
                  }
                />
                Todos os{" "}
                {categoryOption.category === VehicleCategory.LEVE
                  ? "leves"
                  : categoryOption.category === VehicleCategory.MEDIO
                  ? "médios"
                  : "pesados"}
              </label>
              {categoryOption.types.map((vehicle) => {
                const vehicleState = eligibleVehicles.find(
                  (v) =>
                    v.category === categoryOption.category &&
                    v.type === vehicle.type
                );
                return (
                  <label key={vehicle.type}>
                    <input
                      type="checkbox"
                      checked={vehicleState?.eligible || false}
                      onChange={(e) =>
                        handleVehicleChange(
                          categoryOption.category,
                          vehicle.type,
                          e.target.checked
                        )
                      }
                    />
                    {vehicle.label}
                  </label>
                );
              })}
            </div>
          );
        })}
      </div>

      {errors.eligibleVehicles && (
        <p className={styles.errorMessage}>{errors.eligibleVehicles.message}</p>
      )}
    </section>
  );
};

export default VehicleSelectionSection;
