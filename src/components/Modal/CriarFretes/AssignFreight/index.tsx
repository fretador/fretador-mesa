import React, { useEffect, useState, KeyboardEvent } from "react";
import styles from "./AssignFreight.module.css";
import { Driver } from "@/utils/Interfaces/Driver";
import { useLazyQuery } from "@apollo/client";
import { GET_DRIVERS_QUERY } from "@/graphql/queries/driverQueries";
import { gerarDadosBancarios } from "@/utils/mocks/bankDataGenerator";
import {
  generateRandomPlate,
  generateRandomVehicleData,
} from "@/utils/mocks/vehicleDataGenerator";
import { DriverNode } from "@/utils/Interfaces/DriverNode";
import SmallLoading from "@/components/SmallLoading";
import Modal from "../..";

interface AssignFreightProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: (driverIds: string[]) => void;
}

const removeCPFFormatting = (cpf: string): string => {
  return (cpf || "").replace(/[.-]/g, "");
};

const formatCPF = (cpf: string): string => {
  const cleaned = removeCPFFormatting(cpf).padEnd(11, "0");
  return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

const AssignFreight: React.FC<AssignFreightProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [allDrivers, setAllDrivers] = useState<Driver[]>([]);

  const [fetchDrivers, { data: driversData, loading: isLoading, error }] =
    useLazyQuery(GET_DRIVERS_QUERY);

  // Função para transformar os dados dos motoristas
  const transformDrivers = (data: Driver[]): Driver[] => {
    return data.map((driver) => {
      const firstName = driver.name ? driver.name.split(" ")[0].toLowerCase() : "Motorista não identificado";
      const generatedEmail = `${firstName}@fretador.com.br`;
      const { agencia, conta, banco } = gerarDadosBancarios(driver.cpf);
      const randomVehicleData = generateRandomVehicleData(driver.cpf);

      return {
        ...driver,
        email: driver.email || generatedEmail,
        owner: {
          name: driver.name,
          cpf: driver.cpf,
          phoneNumber: driver.phoneNumber,
          email: generatedEmail,
          bankName: banco,
          bankAgency: agencia,
          bankAccount: conta,
          pix: driver.email || generatedEmail,
          isDriverAsOwner: true,
        },
        attachments: {
          userPhoto: driver.userPhoto?.imageUrl,
          cnh: driver.cnhPhoto?.imageUrl,
          proofResidencePhoto: driver.proofResidencePhoto?.imageUrl,
          rg: driver.rgPhoto?.imageUrl,
          vehiclePhoto: driver.vehicle?.vehiclePhoto?.imageUrl,
          anttPhoto: driver.vehicle?.anttPhoto?.imageUrl,
          documentPhoto: driver.vehicle?.documentPhoto?.imageUrl,
        },
        vehicle: {
          ...driver.vehicle,
          plate: generateRandomPlate(),
          ...randomVehicleData,
        },
      };
    });
  };

  // Buscar motoristas quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      fetchDrivers({
        variables: {
          page: 1,
          limit: 5000,
          filter: {},
        },
        fetchPolicy: "cache-first",
      });
    }
  }, [isOpen, fetchDrivers]);

  // Atualizar allDrivers quando driversData estiver disponível
  useEffect(() => {
    if (driversData && driversData.drivers) {
      const drivers = driversData.drivers.edges.map((edge: DriverNode) => edge.node);
      const transformedDrivers = transformDrivers(drivers);
      setAllDrivers(transformedDrivers);
    }
  }, [driversData]);

  // Atualizar sugestões com base na entrada
  useEffect(() => {
    if (searchInput.length >= 2 && !selectedDriver) {
      const unformattedInput = removeCPFFormatting(searchInput);
      const isNumber = /^\d*$/.test(unformattedInput);

      const filteredSuggestions = allDrivers.filter((driver) =>
        isNumber
          ? removeCPFFormatting(driver.cpf).includes(unformattedInput)
          : driver.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchInput, allDrivers, selectedDriver]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    setSearchInput(newValue);

    if (newValue === "") {
      clearSelectedDriver();
    }
  };

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver);
    setSearchInput(`${formatCPF(driver.cpf)} - ${driver.name}`);
    setSuggestions([]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      const newValue = searchInput.slice(0, -1);
      setSearchInput(newValue);
    } else if (event.key === "Enter" && suggestions.length === 1) {
      handleDriverSelect(suggestions[0]);
    }
  };

  const clearSelectedDriver = () => {
    setSelectedDriver(null);
    setSearchInput("");
    setSuggestions([]);
  };

  const handleConfirm = () => {
    if (selectedDriver?.id) {
      console.log("Motorista selecionado no modal:", selectedDriver.id);

      // Chama onConfirm primeiro
      onConfirm([selectedDriver.id]);

      // Espera um pequeno tempo para garantir que onConfirm seja processado
      setTimeout(() => {
        onRequestClose();
        console.log("Modal fechado após confirmação.");
      }, 100); // 100ms de espera, ajustável conforme necessário
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      modalTitle="Direcionar frete"
      modalDescription=""
      hasTwoButtons={true}
      buttonOneTitle="Confirmar"
      buttonOneAction={handleConfirm}
      buttonTwoTitle="Cancelar"
      buttonTwoAction={onRequestClose}
    >
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <SmallLoading />
        </div>
      ) : (
        <div>
          {error && (
            <p className={styles.error}>
              Falha ao buscar motoristas. Por favor, tente novamente.
            </p>
          )}
          <label className={styles.labelDescription} htmlFor="searchInput">
            Digite o CPF ou o nome do motorista
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="searchInput"
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
              className={styles.input}
              placeholder="Digite o CPF ou nome do motorista"
              disabled={isLoading}
            />
            {suggestions.length > 0 && !selectedDriver && (
              <ul className={styles.suggestions}>
                {suggestions.map((driver, index) => (
                  <li
                    key={index}
                    onClick={() => handleDriverSelect(driver)}
                    className={styles.suggestionItem}
                  >
                    {formatCPF(driver.cpf)} - {driver.name} - Placa{" "}
                    {driver.vehicle.plate}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selectedDriver && (
            <div className={styles.driverDetails}>
              <h3>Dados do Motorista</h3>
              <p>Motorista: {selectedDriver.name}</p>
              <p>Veículo: {selectedDriver.vehicle.vehicleType}</p>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default AssignFreight;
