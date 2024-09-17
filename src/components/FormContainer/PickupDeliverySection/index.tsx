<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import OriginCollectionModal from "@/components/ModalRoot/OriginCollectionModal";
import styles from "./PickupDeliverySection.module.css";

interface PickupDeliveryData {
  pickupDeliveryDate: string;
  origin: {
    type: string;
    selectedCity: string;
    selectedState: string;
    senderInfoOption: string;
    additionalInfo: {
      cnpj: string;
      razaoSocial: string;
      endereco: string;
    } | null;
  } | null;
  destination: {
    type: string;
    selectedCity: string;
    selectedState: string;
    senderInfoOption: string;
    additionalInfo: {
      cnpj: string;
      razaoSocial: string;
      endereco: string;
    } | null;
  } | null;
}

const PickupDeliverySection: React.FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateFreightInput>();

  const [isOriginModalOpen, setIsOriginModalOpen] = useState(false);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [pickupDeliveryData, setPickupDeliveryData] =
    useState<PickupDeliveryData>({
      pickupDeliveryDate: "",
      origin: null,
      destination: null,
    });

  const handleOpenOriginModal = () => setIsOriginModalOpen(true);
  const handleCloseOriginModal = () => setIsOriginModalOpen(false);

  const handleOpenDestinationModal = () => setIsDestinationModalOpen(true);
  const handleCloseDestinationModal = () => setIsDestinationModalOpen(false);

  const handleOriginConfirm = (data: PickupDeliveryData["origin"]) => {
    setPickupDeliveryData((prev) => ({ ...prev, origin: data }));
    handleCloseOriginModal();
  };

  const handleDestinationConfirm = (
    data: PickupDeliveryData["destination"]
  ) => {
    setPickupDeliveryData((prev) => ({ ...prev, destination: data }));
    handleCloseDestinationModal();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickupDeliveryData((prev) => ({
      ...prev,
      pickupDeliveryDate: e.target.value,
    }));
    setValue("pickupDeliveryData", e.target.value);
  };

  useEffect(() => {
    setValue("pickupDeliveryData", pickupDeliveryData.pickupDeliveryDate);

    if (pickupDeliveryData.origin) {
      setValue(
        "origin",
        `${pickupDeliveryData.origin.selectedCity}, ${pickupDeliveryData.origin.selectedState}`
      );
      if (pickupDeliveryData.origin.additionalInfo) {
        setValue("originCNPJ", pickupDeliveryData.origin.additionalInfo.cnpj);
        setValue(
          "originRazaoSocial",
          pickupDeliveryData.origin.additionalInfo.razaoSocial
        );
        setValue(
          "originEndereco",
          pickupDeliveryData.origin.additionalInfo.endereco
        );
      } else {
        setValue("originCNPJ", "");
        setValue("originRazaoSocial", "");
        setValue("originEndereco", "");
      }
    }

    if (pickupDeliveryData.destination) {
      setValue(
        "destination",
        `${pickupDeliveryData.destination.selectedCity}, ${pickupDeliveryData.destination.selectedState}`
      );
      if (pickupDeliveryData.destination.additionalInfo) {
        setValue(
          "destinationCNPJ",
          pickupDeliveryData.destination.additionalInfo.cnpj
        );
        setValue(
          "destinationRazaoSocial",
          pickupDeliveryData.destination.additionalInfo.razaoSocial
        );
        setValue(
          "destinationEndereco",
          pickupDeliveryData.destination.additionalInfo.endereco
        );
      } else {
        setValue("destinationCNPJ", "");
        setValue("destinationRazaoSocial", "");
        setValue("destinationEndereco", "");
      }
    }
  }, [pickupDeliveryData, setValue]);

=======
import React, { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import OriginCollectionModal from "@/components/ModalRoot/OriginCollectionModal"; // Supondo que o modal esteja nesta pasta
import styles from "./PickupDeliverySection.module.css"; // Importação dos estilos específicos
import ReactModal from "react-modal";

interface PickupDeliverySectionProps {
  register: UseFormRegister<CreateFreightInput>;
  errors: FieldErrors<CreateFreightInput>;
  handleInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const PickupDeliverySection: React.FC<PickupDeliverySectionProps> = ({
  register,
  errors,
  handleInputChange,
}) => {
  const [isOriginModalOpen, setIsOriginModalOpen] = useState(false);
  const [isDestinationModalOpen, setIsDestinationModalOpen] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  // Funções para abrir e fechar o modal
  const openOriginModal = () => setIsOriginModalOpen(true);
  const closeOriginModal = () => setIsOriginModalOpen(false);

  const openDestinationModal = () => setIsDestinationModalOpen(true);
  const closeDestinationModal = () => setIsDestinationModalOpen(false);

  // Funções para definir origem e destino
  const handleOriginConfirm = (city: string, state: string) => {
    setOrigin(`${city} - ${state}`);
    closeOriginModal();
  };

  const handleDestinationConfirm = (city: string, state: string) => {
    setDestination(`${city} - ${state}`);
    closeDestinationModal();
  };

>>>>>>> dce10fb (conflict)
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Dados da Coleta/Entrega</h2>
      <div className={styles.inputWrapper}>
<<<<<<< HEAD
        <label htmlFor="pickupDeliveryData" className={styles.label}>
=======
        <label
          htmlFor="pickupDeliveryData"
          style={{
            fontFamily: "Roboto",
            fontWeight: 400,
            fontSize: "24px",
            marginRight: "2rem",
          }}
        >
>>>>>>> dce10fb (conflict)
          DATA DO CARREGAMENTO
        </label>
        <input
          id="pickupDeliveryData"
          type="date"
          {...register("pickupDeliveryData")}
<<<<<<< HEAD
          value={pickupDeliveryData.pickupDeliveryDate}
          onChange={handleDateChange}
          className={`${styles.inputDate} ${
            errors.pickupDeliveryData ? styles.errorInput : ""
          }`}
=======
          onChange={handleInputChange}
          className={styles.inputDate}
>>>>>>> dce10fb (conflict)
        />

        {errors.pickupDeliveryData && (
          <p className={styles.error}>{errors.pickupDeliveryData.message}</p>
        )}
      </div>
      <div className={styles.rowInputs}>
        {/* Origem */}
        <div className={styles.inputGroup}>
          <label htmlFor="origin" className={styles.label}>
            Origem
          </label>
          <input
            id="origin"
            type="text"
<<<<<<< HEAD
            value={
              pickupDeliveryData.origin
                ? `${pickupDeliveryData.origin.selectedCity} - ${pickupDeliveryData.origin.selectedState}`
                : ""
            }
            onClick={handleOpenOriginModal}
            readOnly
            className={`${styles.input} ${
              errors.origin ? styles.errorInput : ""
            }`}
=======
            value={origin} // Exibe o valor da cidade selecionada
            onClick={openOriginModal} // Abre o modal ao clicar no campo
            readOnly
            className={`${styles.input} ${errors.origin ? styles.error : ""}`}
>>>>>>> dce10fb (conflict)
            placeholder="Indique a origem ou CNPJ do remetente"
          />
          {errors.origin && (
            <p className={styles.errorMessage}>{errors.origin.message}</p>
          )}
        </div>

        {/* Destino */}
        <div className={styles.inputGroup}>
          <label htmlFor="destination" className={styles.label}>
            Destino
          </label>
          <input
            id="destination"
            type="text"
<<<<<<< HEAD
            value={
              pickupDeliveryData.destination
                ? `${pickupDeliveryData.destination.selectedCity} - ${pickupDeliveryData.destination.selectedState}`
                : ""
            }
            onClick={handleOpenDestinationModal}
=======
            value={destination} // Exibe o valor da cidade selecionada
            onClick={openDestinationModal} // Abre o modal ao clicar no campo
>>>>>>> dce10fb (conflict)
            readOnly
            className={`${styles.input} ${
              errors.destination ? styles.errorInput : ""
            }`}
            placeholder="Insira o destino ou CNPJ do destinatário"
          />
          {errors.destination && (
            <p className={styles.errorMessage}>{errors.destination.message}</p>
          )}
        </div>
      </div>

      {/* Modal para Origem */}
      <OriginCollectionModal
        isOpen={isOriginModalOpen}
<<<<<<< HEAD
        onRequestClose={handleCloseOriginModal}
=======
        onRequestClose={closeOriginModal}
>>>>>>> dce10fb (conflict)
        onConfirm={handleOriginConfirm}
        type="Origem"
      />

      {/* Modal para Destino */}
      <OriginCollectionModal
        isOpen={isDestinationModalOpen}
<<<<<<< HEAD
        onRequestClose={handleCloseDestinationModal}
        onConfirm={handleDestinationConfirm}
        type="Destino"
      />

      {/* Campos ocultos para armazenar os dados adicionais */}
      <input type="hidden" {...register("originCNPJ")} />
      <input type="hidden" {...register("originRazaoSocial")} />
      <input type="hidden" {...register("originEndereco")} />
      <input type="hidden" {...register("destinationCNPJ")} />
      <input type="hidden" {...register("destinationRazaoSocial")} />
      <input type="hidden" {...register("destinationEndereco")} />
=======
        onRequestClose={closeDestinationModal}
        onConfirm={handleDestinationConfirm}
        type="Destino"
      />
>>>>>>> dce10fb (conflict)
    </section>
  );
};

export default PickupDeliverySection;
