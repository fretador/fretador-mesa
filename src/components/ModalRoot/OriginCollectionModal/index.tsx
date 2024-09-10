import React, { useState, useEffect } from "react";
import ModalRoot from "../../ModalRoot";
import styles from "./OriginCollectionModal.module.css";
import { brazilianCitiesStates } from "../../../utils/brazilian_cities_states";
import Botao from "@/components/Botao";
import { RadioTrueIcon, RadioFalseIcon } from "@/utils/icons";

interface OriginCollectionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: (city: string, state: string) => void;
  type: "Origem" | "Destino";
}

const OriginCollectionModal: React.FC<OriginCollectionModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  type,
}) => {
  const [cityInput, setCityInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [senderInfoOption, setSenderInfoOption] = useState("naoInformar");

  const placeholderText = `Indique a ${type} ou CNPJ do ${
    type === "Origem" ? "Remetente" : "Destinatário"
  }`;

  useEffect(() => {
    if (cityInput.length >= 2) {
      const allCities = Object.values(brazilianCitiesStates).flat();
      const filteredCities = allCities.filter((city) =>
        city.toLowerCase().includes(cityInput.toLowerCase())
      );
      setSuggestions(filteredCities.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [cityInput]);

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    const state = Object.keys(brazilianCitiesStates).find((state) =>
      brazilianCitiesStates[state].includes(city)
    );
    setSelectedState(state || "");
    setCityInput(city);
    setSuggestions([]);
  };

  const handleSenderInfoChange = (value: string) => {
    setSenderInfoOption(value);
  };

  const headerText =
    type === "Origem"
      ? "Origem - Local de Coleta"
      : "Destino - Local de Descarga";

  const typeToLowerCase = type.toLowerCase() as "origem" | "destino";

  return (
    <ModalRoot isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{headerText}</h2>
        </header>
        <div className={styles.modalMainContent}>
          <label className={styles.label} htmlFor="city">
            Cidade {typeToLowerCase}
          </label>
          <div className={styles.autocompleteWrapper}>
            <input
              type="text"
              id="city"
              value={cityInput}
              onChange={handleCityInputChange}
              className={styles.input}
              placeholder={placeholderText}
            />
            {suggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {suggestions.map((city, index) => (
                  <li
                    key={index}
                    onClick={() => handleCitySelect(city)}
                    className={styles.suggestionItem}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.iconGroup}>
            <div
              className={styles.iconOption}
              onClick={() => handleSenderInfoChange("naoInformar")}
            >
              {senderInfoOption === "naoInformar" ? (
                <RadioTrueIcon className={styles.icon} width={24} height={24} />
              ) : (
                <RadioFalseIcon
                  className={styles.icon}
                  width={24}
                  height={24}
                />
              )}
              <input
                type="radio"
                name={typeToLowerCase}
                value="naoInformar"
                checked={senderInfoOption === "naoInformar"}
                className={styles.radio}
                onChange={() => {}}
              />
              <span className={styles.iconText}>
                Não informar dados do{" "}
                {type === "Origem" ? "Remetente" : "Destinatário"}
              </span>
            </div>
            <div
              className={styles.iconOption}
              onClick={() => handleSenderInfoChange("informar")}
            >
              {senderInfoOption === "informar" ? (
                <RadioTrueIcon className={styles.icon} width={24} height={24} />
              ) : (
                <RadioFalseIcon
                  className={styles.icon}
                  width={24}
                  height={24}
                />
              )}
              <input
                type="radio"
                name={typeToLowerCase}
                value="informar"
                checked={senderInfoOption === "informar"}
                className={styles.radio}
                onChange={() => {}}
              />
              <span className={styles.iconText}>
                Informar dados do{" "}
                {type === "Origem" ? "Remetente" : "Destinatário"}
              </span>
            </div>
          </div>

          {senderInfoOption === "informar" && (
            <div className={styles.additionalInfo}>
              <label className={styles.label} htmlFor="cnpj">
                CNPJ
              </label>
              <input
                type="text"
                id="cnpj"
                className={styles.input}
                placeholder="00.000.000/0000-00"
              />

              <label className={styles.label} htmlFor="razaoSocial">
                Razão Social
              </label>
              <input
                type="text"
                id="razaoSocial"
                className={styles.input}
                placeholder="Digite a razão social"
              />

              <label className={styles.label} htmlFor="endereco">
                Endereço
              </label>
              <input
                type="text"
                id="endereco"
                className={styles.input}
                placeholder="Digite o endereço"
              />
            </div>
          )}

          <Botao
            className={styles.confirmButton}
            text="Confirmar"
            type="button"
            onClick={() => {
              onRequestClose();
              onConfirm(selectedCity, selectedState);
            }}
          />
        </div>
      </div>
    </ModalRoot>
  );
};

export default OriginCollectionModal;
