import React, { useState, useEffect } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./VehicleSelectionSection.module.css";

interface VehicleSelectionSectionProps {
  register: UseFormRegister<CreateFreightInput>;
  setValue: UseFormSetValue<CreateFreightInput>;
}

const VehicleSelectionSection: React.FC<VehicleSelectionSectionProps> = ({
  register,
  setValue,
}) => {
  const [eligibleVehicles, setEligibleVehicles] = useState({
    leve: {
      utilitario: { eligible: false },
      "3/4": { eligible: false },
      HR: { eligible: false },
      Toco: { eligible: false },
    },
    medio: {
      truck: { eligible: false },
      "bi-truck": { eligible: false },
    },
    pesado: {
      carreta: { eligible: false },
      carretaLS: { eligible: false },
      carretaTrucada: { eligible: false },
      carretaVanderleia: { eligible: false },
      bitrem: { eligible: false },
      rodotrem: { eligible: false },
    },
  });

  useEffect(() => {
    setValue("eligibleVehicles" as keyof CreateFreightInput, eligibleVehicles);
  }, [eligibleVehicles, setValue]);

  const handleVehicleChange = (
    category: string,
    type: string,
    checked: boolean
  ) => {
    setEligibleVehicles((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [type]: { eligible: checked },
      },
    }));
  };

  const handleAllCategoryChange = (category: string, checked: boolean) => {
    setEligibleVehicles((prev) => ({
      ...prev,
      [category]: Object.keys(prev[category]).reduce((acc, type) => {
        acc[type] = { eligible: checked };
        return acc;
      }, {}),
    }));
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Veículo</h2>
      <p className={styles.subtitle}>Escolha quantos veículos quiser</p>

      <div className={styles.vehicleCheckboxes}>
        {/* Leves */}
        <div className={styles.checkboxColumn}>
          <h4>Leves</h4>
          <label>
            <input
              type="checkbox"
              checked={Object.values(eligibleVehicles.leve).every(
                (v) => v.eligible
              )}
              onChange={(e) =>
                handleAllCategoryChange("leve", e.target.checked)
              }
            />
            Todos os leves
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.leve.utilitario.eligible}
              onChange={(e) =>
                handleVehicleChange("leve", "utilitario", e.target.checked)
              }
            />
            Utilitário
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.leve["3/4"].eligible}
              onChange={(e) =>
                handleVehicleChange("leve", "3/4", e.target.checked)
              }
            />
            3/4
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.leve.HR.eligible}
              onChange={(e) =>
                handleVehicleChange("leve", "HR", e.target.checked)
              }
            />
            HR
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.leve.Toco.eligible}
              onChange={(e) =>
                handleVehicleChange("leve", "Toco", e.target.checked)
              }
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
              checked={Object.values(eligibleVehicles.medio).every(
                (v) => v.eligible
              )}
              onChange={(e) =>
                handleAllCategoryChange("medio", e.target.checked)
              }
            />
            Todos os médios
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.medio.truck.eligible}
              onChange={(e) =>
                handleVehicleChange("medio", "truck", e.target.checked)
              }
            />
            Truck
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.medio["bi-truck"].eligible}
              onChange={(e) =>
                handleVehicleChange("medio", "bi-truck", e.target.checked)
              }
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
              checked={Object.values(eligibleVehicles.pesado).every(
                (v) => v.eligible
              )}
              onChange={(e) =>
                handleAllCategoryChange("pesado", e.target.checked)
              }
            />
            Todos os pesados
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.pesado.carreta.eligible}
              onChange={(e) =>
                handleVehicleChange("pesado", "carreta", e.target.checked)
              }
            />
            Carreta
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.pesado.carretaTrucada.eligible}
              onChange={(e) =>
                handleVehicleChange(
                  "pesado",
                  "carretaTrucada",
                  e.target.checked
                )
              }
            />
            Carreta Trucada
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.pesado.carretaLS.eligible}
              onChange={(e) =>
                handleVehicleChange("pesado", "carretaLS", e.target.checked)
              }
            />
            Carreta LS
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.pesado.carretaVanderleia.eligible}
              onChange={(e) =>
                handleVehicleChange(
                  "pesado",
                  "carretaVanderleia",
                  e.target.checked
                )
              }
            />
            Carreta Vanderleia
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.pesado.bitrem.eligible}
              onChange={(e) =>
                handleVehicleChange("pesado", "bitrem", e.target.checked)
              }
            />
            Bitrem
          </label>
          <label>
            <input
              type="checkbox"
              checked={eligibleVehicles.pesado.rodotrem.eligible}
              onChange={(e) =>
                handleVehicleChange("pesado", "rodotrem", e.target.checked)
              }
            />
            Rodotrem
          </label>
        </div>
      </div>
    </section>
  );
};

export default VehicleSelectionSection;
