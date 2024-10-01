import React, { useEffect, useState, KeyboardEvent } from "react";
import ModalRoot from "../../ModalRoot";
import Loading from "../../Loading";
import styles from "./AssignFreight.module.css";
import { DriverService } from "@/services/driverService";
import { Driver } from "@/utils/types/Driver";

interface AssignFreightModalProps {
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

const AssignFreightModal: React.FC<AssignFreightModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [allDrivers, setAllDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar motoristas quando o modal é aberto
  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await DriverService.getDrivers(1, 5000, {});
        const transformedDrivers = DriverService.transformDrivers(response.data);
        
        // Verifique se todos os motoristas têm as propriedades necessárias
        const validDrivers = transformedDrivers.map(driver => ({
          ...driver,
          owner: {
            ...driver.owner,
            cnh: (driver.owner as { cnh?: string }).cnh || '',
            document: (driver.owner as { document?: string }).document || '',
            address: (driver.owner as any).address || '',
            contact: (driver.owner as any).contact || '',
          }
        }));
        
        setAllDrivers(validDrivers);
      } catch (err) {
        setError("Falha ao buscar motoristas. Por favor, tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) fetchDrivers();
  }, [isOpen]);

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
    if (selectedDriver) {
      onConfirm([selectedDriver.id]);
      onRequestClose();
    } else {
      onConfirm([]);
      onRequestClose();
    }
  };

  return (
    <ModalRoot isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Direcionar Frete</h2>
        </header>
        <div className={styles.modalBody}>
          {isLoading && <Loading />}
          {error && <p className={styles.error}>{error}</p>}
          <label className={styles.label} htmlFor="searchInput">
            CPF ou nome do motorista
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
              <p>Veículo: {selectedDriver.vehicle.type}</p>
            </div>
          )}
        </div>
        <button
          className={styles.confirmButton}
          onClick={handleConfirm}
          disabled={isLoading}
        >
          Confirmar
        </button>
      </div>
    </ModalRoot>
  );
};

export default AssignFreightModal;
