import React, { useState } from "react";
import styles from "./VehicleDetails.module.css";
import { PencilSolidIcon } from "@/utils/icons";
import { Vehicle } from "@/utils/interfaces/Vehicle";

interface VehicleDetailsProps {
  vehicle: Vehicle
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle }) => {

  // States para edição de dados do Veículo
  const [isVehicleEditing, setIsVehicleEditing] = useState(false);
  const [editableVehicle, setEditableVehicle] = useState({
    vehicle: vehicle.vehicleType,
    renavam: vehicle.renavam,
    plate: vehicle.plate,
    chassi: vehicle.chassi,
    antt: vehicle.antt,
    tracker: vehicle.tracker,
    owner: vehicle.ownerName,
    category: vehicle.vehicleCategory
  });

  const handleVehicleEditToggle = () => {
    setIsVehicleEditing(!isVehicleEditing);
  };

  const handleVehicleInputChange = (field: string, value: string) => {
    setEditableVehicle((prev) => ({ ...prev, [field]: value }));
  };

  // States para edição de dados da Carroceria
  const [isBodyWorkEditing, setIsBodyWorkEditing] = useState(false);
  const [editableBodyWork, setEditableBodyWork] = useState({
    category: vehicle.bodyworkCategory,
    type: vehicle.bodyworkType
  });

  const handleBodyWorkEditToggle = () => {
    setIsBodyWorkEditing(!isBodyWorkEditing);
  };

  const handleBodyWorkInputChange = (field: string, value: string) => {
    setEditableBodyWork((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Veículo */}
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p>Dados do Veículo</p>
          <div
            className={styles.pencilIcon}
            onClick={handleVehicleEditToggle}
          >
            <PencilSolidIcon fill={isVehicleEditing ? "#A33830" : '#1A556D'} />
          </div>
        </div>

        <div className={styles.informations}>
          <div className={styles.lineOne}>
            <p>
              Veículo:{" "}
              {isVehicleEditing ? (
                <input
                  type="text"
                  value={editableVehicle.vehicle}
                  onChange={(e) => handleVehicleInputChange("vehicle", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsVehicleEditing(false)}
                  onBlur={() => setIsVehicleEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableVehicle.vehicle}</span>
              )}
            </p>
            <p>
              RENAVAM:{" "}
              {isVehicleEditing ? (
                <input
                  type="text"
                  value={editableVehicle.renavam}
                  onChange={(e) => handleVehicleInputChange("renavam", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsVehicleEditing(false)}
                  onBlur={() => setIsVehicleEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableVehicle.renavam}</span>
              )}
            </p>
            <p>
              Placa:{" "}
              {isVehicleEditing ? (
                <input
                  type="text"
                  value={editableVehicle.plate}
                  onChange={(e) => handleVehicleInputChange("plate", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsVehicleEditing(false)}
                  onBlur={() => setIsVehicleEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableVehicle.plate}</span>
              )}
            </p>
            <p>
              Chassi:{" "}
              {isVehicleEditing ? (
                <input
                  type="text"
                  value={editableVehicle.chassi}
                  onChange={(e) => handleVehicleInputChange("chassi", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsVehicleEditing(false)}
                  onBlur={() => setIsVehicleEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableVehicle.chassi}</span>
              )}
            </p>
          </div>

          <div className={styles.lineTwo}>
            <p>
              ANTT:{" "}
              {isVehicleEditing ? (
                <input
                  type="text"
                  value={editableVehicle.antt}
                  onChange={(e) => handleVehicleInputChange("antt", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsVehicleEditing(false)}
                  onBlur={() => setIsVehicleEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableVehicle.antt}</span>
              )}
            </p>
            <p>
              Rastreador:{" "}
              {isVehicleEditing ? (
                <input
                  type="text"
                  value={editableVehicle.tracker}
                  onChange={(e) => handleVehicleInputChange("tracker", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsVehicleEditing(false)}
                  onBlur={() => setIsVehicleEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableVehicle.tracker}</span>
              )}
            </p>
            <p>
              Proprietário:{" "}
              {isVehicleEditing ? (
                <input
                  type="text"
                  value={editableVehicle.owner}
                  onChange={(e) => handleVehicleInputChange("owner", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsVehicleEditing(false)}
                  onBlur={() => setIsVehicleEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableVehicle.owner}</span>
              )}
            </p>
          </div>

          <div className={styles.lineThree}>
            <p>
              CPF/CNPJ: <span>{vehicle.ownerDocument}</span>
            </p>
            <p>
              Categoria:{" "}
              {isVehicleEditing ? (
                <input
                  type="text"
                  value={editableVehicle.category}
                  onChange={(e) => handleVehicleInputChange("category", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsVehicleEditing(false)}
                  onBlur={() => setIsVehicleEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableVehicle.category}</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Carroceria */}
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <p>Dados da Carroceria</p>
          <div
            className={styles.pencilIcon}
            onClick={handleBodyWorkEditToggle}
          >
            <PencilSolidIcon fill={isBodyWorkEditing ? "#A33830" : '#1A556D'} />
          </div>
        </div>

        <div className={styles.informations}>
          <div className={styles.lineOne}>
            <p>
              Categoria:{" "}
              {isBodyWorkEditing ? (
                <input
                  type="text"
                  value={editableBodyWork.category}
                  onChange={(e) => handleBodyWorkInputChange("category", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsBodyWorkEditing(false)}
                  onBlur={() => setIsBodyWorkEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableBodyWork.category}</span>
              )}
            </p>
            <p>
              Tipo:{" "}
              {isBodyWorkEditing ? (
                <input
                  type="text"
                  value={editableBodyWork.type}
                  onChange={(e) => handleBodyWorkInputChange("type", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && setIsBodyWorkEditing(false)}
                  onBlur={() => setIsBodyWorkEditing(false)}
                  className={styles.editInput}
                />
              ) : (
                <span>{editableBodyWork.type}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleDetails;
