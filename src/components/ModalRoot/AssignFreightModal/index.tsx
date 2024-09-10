import React, { useState } from 'react';
import ModalRoot from '../../ModalRoot';
import styles from './AssignFreight.module.css';

interface Driver {
  cpf: string;
  name: string;
  plate: string;
}

interface AssignFreightModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const AssignFreightModal: React.FC<AssignFreightModalProps> = ({ isOpen, onRequestClose }) => {
  const [cpfInput, setCpfInput] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Função para buscar motoristas (substitua pela sua lógica real)
  const fetchDrivers = async (cpf: string) => {
    // Lógica para buscar motoristas do backend com base no CPF digitado
    // ...
    // Exemplo de dados mockados (substitua pelos dados reais)
    const mockDrivers: Driver[] = [
      { cpf: '000.000.000-00', name: 'João da Silva Pereira', plate: 'KKK-0A12' },
      { cpf: '000.000.000-01', name: 'Marcos Alves', plate: 'KKK-0A12' },
      { cpf: '000.000.000-02', name: 'José Neto', plate: 'KKK-0A12' },
      { cpf: '000.000.000-03', name: 'Carlos Aparecido Maia', plate: 'KKK-0A12' },
    ];

    // Filtrar motoristas com base no CPF digitado
    const filtered = mockDrivers.filter(driver =>
      driver.cpf.includes(cpf)
    );
    setFilteredDrivers(filtered.slice(0, 4)); // Limitar a 4 resultados
  };

  const handleCpfInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cpf = event.target.value;
    setCpfInput(cpf);
    fetchDrivers(cpf);
  };

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver);
    setFilteredDrivers([]);
  };

  const clearSelectedDriver = () => {
    setSelectedDriver(null);
    setCpfInput('');
    setFilteredDrivers([]);
  };

  const handleConfirm = () => {
    clearSelectedDriver();
    onRequestClose();
  };

  return (
    <ModalRoot isOpen={isOpen} onRequestClose={clearSelectedDriver}>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <header className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Direcionar Frete</h2>
          </header>
          <div className={styles.modalBody}>
            <label className={styles.label} htmlFor="cpfInput">
              CPF Motorista
            </label>
            <input
              type="text"
              id="cpfInput"
              value={cpfInput}
              onChange={handleCpfInputChange}
              className={styles.input}
              placeholder="Digite o CPF do motorista"
            />
            {/* Renderizar resultados do autocomplete */}
            <div className={styles.autocompleteResults}>
              {filteredDrivers.map(driver => (
                <div
                  key={driver.cpf}
                  onClick={() => handleDriverSelect(driver)}
                  className={styles.driverBox}
                >
                  <p>{driver.cpf} - {driver.name} - Placa {driver.plate}</p>
                </div>
              ))}
            </div>
            {selectedDriver && (
              <div className={styles.driverDetails}>
                <h3>Dados do Motorista</h3>
                <p>Motorista: {selectedDriver.name}</p>
                <p>Veículo: {selectedDriver.plate}</p>
                <p>Placa: {selectedDriver.plate}</p>
                <p>Placa do Cavalo: {selectedDriver.plate}</p>
              </div>
            )}
          </div>
          <button className={styles.confirmButton} onClick={handleConfirm}>Confirmar</button>
        </div>
      </div>
    </ModalRoot>
  );
};

export default AssignFreightModal;
