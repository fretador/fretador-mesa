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
      </div>
    </section>
  );
};

export default VehicleSelectionSection;
