<<<<<<< HEAD
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
=======
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import styles from "./VehicleSelectionSection.module.css";

interface VehicleSelectionSectionProps {
  register: UseFormRegister<CreateFreightInput>;
}

const VehicleSelectionSection: React.FC<VehicleSelectionSectionProps> = ({
  register,
}) => {
  const [selectedLeves, setSelectedLeves] = useState({
    todosLeves: false,
    utilitario: false,
    tresQuartos: false,
    hr: false,
    toco: false,
  });

  const [selectedMedios, setSelectedMedios] = useState({
    todosMedios: false,
    truck: false,
    biTruck: false,
  });

  const [selectedPesados, setSelectedPesados] = useState({
    todosPesados: false,
    carreta: false,
    carretaTrucada: false,
    carretaLS: false,
    carretaVanderleia: false,
    bitrem: false,
    rodotrem: false,
  });

  // Funções para atualizar a seleção de veículos leves
  const handleLevesChange = (key: string, checked: boolean) => {
    const updatedLeves = { ...selectedLeves, [key]: checked };
    setSelectedLeves(updatedLeves);

    // Se qualquer veículo individual for desmarcado, "Todos os leves" deve ser desmarcado
    const isAllLevesSelected =
      updatedLeves.utilitario &&
      updatedLeves.tresQuartos &&
      updatedLeves.hr &&
      updatedLeves.toco;

    setSelectedLeves((prev) => ({
      ...prev,
      todosLeves: isAllLevesSelected,
    }));
  };

  const handleTodosLevesChange = (checked: boolean) => {
    setSelectedLeves({
      todosLeves: checked,
      utilitario: checked,
      tresQuartos: checked,
      hr: checked,
      toco: checked,
    });
  };

  // Funções para atualizar a seleção de veículos médios
  const handleMediosChange = (key: string, checked: boolean) => {
    const updatedMedios = { ...selectedMedios, [key]: checked };
    setSelectedMedios(updatedMedios);

    const isAllMediosSelected = updatedMedios.truck && updatedMedios.biTruck;
    setSelectedMedios((prev) => ({
      ...prev,
      todosMedios: isAllMediosSelected,
    }));
  };

  const handleTodosMediosChange = (checked: boolean) => {
    setSelectedMedios({
      todosMedios: checked,
      truck: checked,
      biTruck: checked,
    });
  };

  // Funções para atualizar a seleção de veículos pesados
  const handlePesadosChange = (key: string, checked: boolean) => {
    const updatedPesados = { ...selectedPesados, [key]: checked };
    setSelectedPesados(updatedPesados);

    const isAllPesadosSelected =
      updatedPesados.carreta &&
      updatedPesados.carretaTrucada &&
      updatedPesados.carretaLS &&
      updatedPesados.carretaVanderleia &&
      updatedPesados.bitrem &&
      updatedPesados.rodotrem;

    setSelectedPesados((prev) => ({
      ...prev,
      todosPesados: isAllPesadosSelected,
    }));
  };

  const handleTodosPesadosChange = (checked: boolean) => {
    setSelectedPesados({
      todosPesados: checked,
      carreta: checked,
      carretaTrucada: checked,
      carretaLS: checked,
      carretaVanderleia: checked,
      bitrem: checked,
      rodotrem: checked,
    });
>>>>>>> dce10fb (conflict)
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Veículo</h2>
      <p className={styles.subtitle}>Escolha quantos veículos quiser</p>

      <div className={styles.vehicleCheckboxes}>
<<<<<<< HEAD
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
=======
        {/* Leves */}
        <div className={styles.checkboxColumn}>
          <h4>Leves</h4>
          <label>
            <input
              type="checkbox"
              checked={selectedLeves.todosLeves}
              onChange={(e) => handleTodosLevesChange(e.target.checked)}
            />
            Todos os leves
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedLeves.utilitario}
              onChange={(e) =>
                handleLevesChange("utilitario", e.target.checked)
              }
            />
            Utilitário
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedLeves.tresQuartos}
              onChange={(e) =>
                handleLevesChange("tresQuartos", e.target.checked)
              }
            />
            3/4
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedLeves.hr}
              onChange={(e) => handleLevesChange("hr", e.target.checked)}
            />
            HR
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedLeves.toco}
              onChange={(e) => handleLevesChange("toco", e.target.checked)}
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
              checked={selectedMedios.todosMedios}
              onChange={(e) => handleTodosMediosChange(e.target.checked)}
            />
            Todos os médios
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedMedios.truck}
              onChange={(e) => handleMediosChange("truck", e.target.checked)}
            />
            Truck
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedMedios.biTruck}
              onChange={(e) => handleMediosChange("biTruck", e.target.checked)}
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
              checked={selectedPesados.todosPesados}
              onChange={(e) => handleTodosPesadosChange(e.target.checked)}
            />
            Todos os pesados
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedPesados.carreta}
              onChange={(e) => handlePesadosChange("carreta", e.target.checked)}
            />
            Carreta
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedPesados.carretaTrucada}
              onChange={(e) =>
                handlePesadosChange("carretaTrucada", e.target.checked)
              }
            />
            Carreta Trucada
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedPesados.carretaLS}
              onChange={(e) =>
                handlePesadosChange("carretaLS", e.target.checked)
              }
            />
            Carreta LS
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedPesados.carretaVanderleia}
              onChange={(e) =>
                handlePesadosChange("carretaVanderleia", e.target.checked)
              }
            />
            Carreta Vanderleia
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedPesados.bitrem}
              onChange={(e) => handlePesadosChange("bitrem", e.target.checked)}
            />
            Bitrem
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedPesados.rodotrem}
              onChange={(e) =>
                handlePesadosChange("rodotrem", e.target.checked)
              }
            />
            Rodotrem
          </label>
        </div>
>>>>>>> dce10fb (conflict)
      </div>

      {errors.eligibleVehicles && (
        <p className={styles.errorMessage}>{errors.eligibleVehicles.message}</p>
      )}
    </section>
  );
};

export default VehicleSelectionSection;
