import React, { useEffect, useState, KeyboardEvent } from "react";
import ModalRoot from "../../ModalRoot";
import styles from "./AssignFreight.module.css";

interface Driver {
  cpf: string;
  name: string;
  plate: string;
}

interface AssignFreightModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const mockDrivers: Driver[] = [
  {
    cpf: "000.000.000-00",
    name: "João da Silva Pereira",
    plate: "KKK-0A12",
  },
  { cpf: "000.000.000-01", name: "Marcos Alves", plate: "KKK-0A12" },
  { cpf: "000.000.000-02", name: "José Neto", plate: "KKK-0A12" },
  {
    cpf: "000.000.000-03",
    name: "Carlos Aparecido Maia",
    plate: "KKK-0A12",
  },
];

const removeCPFFormatting = (cpf: string): string => {
  return cpf.replace(/[.-]/g, "");
};

const formatCPF = (cpf: string): string => {
  const cleaned = removeCPFFormatting(cpf);
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return cleaned.replace(/^(\d{3})(\d{0,3})/, "$1.$2");
  if (cleaned.length <= 9)
    return cleaned.replace(/^(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
  return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
};

const AssignFreightModal: React.FC<AssignFreightModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [cpfInput, setCpfInput] = useState("");
  const [suggestions, setSuggestions] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  useEffect(() => {
    if (cpfInput.length >= 2) {
      const unformattedInput = removeCPFFormatting(cpfInput);
      const filteredSuggestions = mockDrivers.filter((driver) =>
        removeCPFFormatting(driver.cpf).includes(unformattedInput)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
      setSelectedDriver(null);
    }
  }, [cpfInput]);

  const handleCpfInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setCpfInput(formatCPF(newValue));
    if (newValue === "") {
      setSelectedDriver(null);
    }
  };

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver);
    setCpfInput(driver.cpf);
    setSuggestions([]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && suggestions.length === 1) {
      handleDriverSelect(suggestions[0]);
    }
  };

  const clearSelectedDriver = () => {
    setSelectedDriver(null);
    setCpfInput("");
    setSuggestions([]);
  };

  const handleConfirm = () => {
    clearSelectedDriver();
    onRequestClose();
  };

  return (
    <ModalRoot isOpen={isOpen} onRequestClose={clearSelectedDriver}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Direcionar Frete</h2>
        </header>
        <div className={styles.modalBody}>
          <label className={styles.label} htmlFor="cpfInput">
            CPF Motorista
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="cpfInput"
              value={cpfInput}
              onChange={handleCpfInputChange}
              onKeyDown={handleKeyDown}
              className={styles.input}
              placeholder="Digite o CPF do motorista"
              maxLength={14}
            />
            {suggestions.length > 0 && !selectedDriver && (
              <ul className={styles.suggestions}>
                {suggestions.map((driver, index) => (
                  <li
                    key={index}
                    onClick={() => handleDriverSelect(driver)}
                    className={styles.suggestionItem}
                  >
                    {driver.cpf} - {driver.name} - Placa {driver.plate}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selectedDriver && (
            <div className={styles.driverDetails}>
              <h3>Dados do Motorista</h3>
              <p>Motorista: {selectedDriver.name}</p>
              <p>Veículo: {selectedDriver.plate}</p>
              {/* TODO: add when app 2.0 will be ready */}
              {/* <p>Placa 1: {selectedDriver.plate}</p> */}
              {/* <p>Placa 2: {selectedDriver.plate}</p> */}
            </div>
          )}
        </div>
        <button className={styles.confirmButton} onClick={handleConfirm}>
          Confirmar
        </button>
      </div>
    </ModalRoot>
  );
};

export default AssignFreightModal;
