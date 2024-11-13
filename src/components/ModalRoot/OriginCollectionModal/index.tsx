import React, { useState, useEffect } from "react";
import ModalRoot from "../../ModalRoot";
import styles from "./OriginCollectionModal.module.css";
import { brazilianCitiesStates } from "../../../utils/brazilian_cities_states";
import Botao from "@/components/Botao";
import { RadioTrueIcon, RadioFalseIcon } from "@/utils/icons";

interface OriginCollectionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: (data: any) => void; // Modificado para aceitar um objeto de dados
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
      const suggestions: string[] = [];
      Object.entries(brazilianCitiesStates).forEach(([state, cities]) => {
        const filteredCities = cities.filter((city) =>
          city.toLowerCase().includes(cityInput.toLowerCase())
        );
        filteredCities.forEach((city) => {
          suggestions.push(`${city} - ${state}`);
        });
      });
      setSuggestions(suggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [cityInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length === 1) {
      handleCitySelect(suggestions[0]);
    }
  };

  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(e.target.value);
    // Garante que as sugestões sejam exibidas quando o usuário digita
    if (e.target.value.length >= 2) {
      updateSuggestions(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  const updateSuggestions = (input: string) => {
    const newSuggestions: string[] = [];
    Object.entries(brazilianCitiesStates).forEach(([state, cities]) => {
      const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );
      filteredCities.forEach((city) => {
        newSuggestions.push(`${city} - ${state}`);
      });
    });
    setSuggestions(newSuggestions.slice(0, 5));
  };

  const handleCitySelect = (cityState: string) => {
    const [city, state] = cityState.split(" - ");
    setSelectedCity(city);
    setSelectedState(state);
    setCityInput(cityState);
    setSuggestions([]); // Limpa as sugestões após a seleção
  };

  const handleSenderInfoChange = (value: string) => {
    setSenderInfoOption(value);
  };

  const headerText =
    type === "Origem"
      ? "Origem, Local de Coleta"
      : "Destino, Local de Descarga";

  const typeToLowerCase = type.toLowerCase() as "origem" | "destino";

  const handleConfirm = () => {
    const modalData = {
      type,
      selectedCity,
      selectedState,
      senderInfoOption,
      additionalInfo:
        senderInfoOption === "informar"
          ? {
              cnpj: (document.getElementById("cnpj") as HTMLInputElement)
                ?.value,
              razaoSocial: (
                document.getElementById("razaoSocial") as HTMLInputElement
              )?.value,
              endereco: (
                document.getElementById("endereco") as HTMLInputElement
              )?.value,
            }
          : null,
    };

    console.log("Dados capturados pelo modal:", modalData);

    onConfirm(modalData); // Passa os dados para a função onConfirm
    onRequestClose();
  };

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
              onKeyDown={handleKeyDown}
              className={styles.input}
              placeholder={placeholderText}
            />
            {suggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {suggestions.map((cityState, index) => (
                  <li
                    key={index}
                    onClick={() => handleCitySelect(cityState)}
                    className={styles.suggestionItem}
                  >
                    {cityState}
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
            onClick={handleConfirm}
          />
        </div>
      </div>
    </ModalRoot>
  );
};

export default OriginCollectionModal;
