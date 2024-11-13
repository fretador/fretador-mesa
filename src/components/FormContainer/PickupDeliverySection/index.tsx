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
    clearErrors,
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
    if (data) {
      clearErrors("origin");
      clearErrors("originCNPJ");
      clearErrors("originRazaoSocial");
      clearErrors("originEndereco");
    }
  };

  const handleDestinationConfirm = (
    data: PickupDeliveryData["destination"]
  ) => {
    setPickupDeliveryData((prev) => ({ ...prev, destination: data }));
    handleCloseDestinationModal();
    if (data) {
      clearErrors("destination");
      clearErrors("destinationCNPJ");
      clearErrors("destinationRazaoSocial");
      clearErrors("destinationEndereco");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setPickupDeliveryData((prev) => ({
      ...prev,
      pickupDeliveryDate: newDate,
    }));
    setValue("pickupDeliveryData", newDate);
    if (newDate) {
      clearErrors("pickupDeliveryData");
    }
  };

  // useEffect(() => {
  //   setValue("pickupDeliveryData", pickupDeliveryData.pickupDeliveryDate);

  //   if (pickupDeliveryData.origin) {
  //     setValue(
  //       "origin",
  //       `${pickupDeliveryData.origin.selectedCity}, ${pickupDeliveryData.origin.selectedState}`
  //     );
  //     clearErrors("origin");
  //     if (pickupDeliveryData.origin.additionalInfo) {
  //       setValue("originCNPJ", pickupDeliveryData.origin.additionalInfo.cnpj);
  //       setValue(
  //         "originRazaoSocial",
  //         pickupDeliveryData.origin.additionalInfo.razaoSocial
  //       );
  //       setValue(
  //         "originEndereco",
  //         pickupDeliveryData.origin.additionalInfo.endereco
  //       );
  //       clearErrors("originCNPJ");
  //       clearErrors("originRazaoSocial");
  //       clearErrors("originEndereco");
  //     } else {
  //       setValue("originCNPJ", "");
  //       setValue("originRazaoSocial", "");
  //       setValue("originEndereco", "");
  //     }
  //   }

  //   if (pickupDeliveryData.destination) {
  //     setValue(
  //       "destination",
  //       `${pickupDeliveryData.destination.selectedCity}, ${pickupDeliveryData.destination.selectedState}`
  //     );
  //     clearErrors("destination");
  //     if (pickupDeliveryData.destination.additionalInfo) {
  //       setValue(
  //         "destinationCNPJ",
  //         pickupDeliveryData.destination.additionalInfo.cnpj
  //       );
  //       setValue(
  //         "destinationRazaoSocial",
  //         pickupDeliveryData.destination.additionalInfo.razaoSocial
  //       );
  //       setValue(
  //         "destinationEndereco",
  //         pickupDeliveryData.destination.additionalInfo.endereco
  //       );
  //       clearErrors("destinationCNPJ");
  //       clearErrors("destinationRazaoSocial");
  //       clearErrors("destinationEndereco");
  //     } else {
  //       setValue("destinationCNPJ", "");
  //       setValue("destinationRazaoSocial", "");
  //       setValue("destinationEndereco", "");
  //     }
  //   }
  // }, [pickupDeliveryData, setValue, clearErrors]);

  useEffect(() => {
    if (pickupDeliveryData.pickupDeliveryDate) {
      setValue("pickupDeliveryData", pickupDeliveryData.pickupDeliveryDate);
    }
  
    if (pickupDeliveryData.origin) {
      setValue(
        "origin",
        `${pickupDeliveryData.origin.selectedCity}, ${pickupDeliveryData.origin.selectedState}`
      );
      clearErrors("origin");
      if (pickupDeliveryData.origin.additionalInfo) {
        setValue("originCNPJ", pickupDeliveryData.origin.additionalInfo.cnpj);
        setValue("originRazaoSocial", pickupDeliveryData.origin.additionalInfo.razaoSocial);
        setValue("originEndereco", pickupDeliveryData.origin.additionalInfo.endereco);
        clearErrors("originCNPJ");
        clearErrors("originRazaoSocial");
        clearErrors("originEndereco");
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
      clearErrors("destination");
      if (pickupDeliveryData.destination.additionalInfo) {
        setValue("destinationCNPJ", pickupDeliveryData.destination.additionalInfo.cnpj);
        setValue("destinationRazaoSocial", pickupDeliveryData.destination.additionalInfo.razaoSocial);
        setValue("destinationEndereco", pickupDeliveryData.destination.additionalInfo.endereco);
        clearErrors("destinationCNPJ");
        clearErrors("destinationRazaoSocial");
        clearErrors("destinationEndereco");
      } else {
        setValue("destinationCNPJ", "");
        setValue("destinationRazaoSocial", "");
        setValue("destinationEndereco", "");
      }
    }
  }, [pickupDeliveryData, setValue, clearErrors]);
  

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Dados da Coleta / Entrega</h2>
      <div className={styles.inputWrapper}>
        <label htmlFor="pickupDeliveryData" className={styles.labelDate}>
          DATA DO CARREGAMENTO
        </label>
        <div className={styles.dateInputGroup}>
          <input
            id="pickupDeliveryData"
            type="date"
            {...register("pickupDeliveryData")}
            // value={pickupDeliveryData.pickupDeliveryDate}
            onChange={handleDateChange}
            className={`${styles.inputDate} ${
              errors.pickupDeliveryData ? styles.error : ""
            }`}
          />
          {errors.pickupDeliveryData && (
            <p className={styles.errorMessage}>
              {errors.pickupDeliveryData.message}
            </p>
          )}
        </div>
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
            {...register("origin")}
            // value={
            //   pickupDeliveryData.origin
            //     ? `${pickupDeliveryData.origin.selectedCity} - ${pickupDeliveryData.origin.selectedState}`
            //     : ""
            // }
            onClick={handleOpenOriginModal}
            readOnly
            className={`${styles.input} ${
              errors.origin ? styles.errorInput : ""
            }`}
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
            {...register("destination")}
            // value={
            //   pickupDeliveryData.destination
            //     ? `${pickupDeliveryData.destination.selectedCity} - ${pickupDeliveryData.destination.selectedState}`
            //     : ""
            // }
            onClick={handleOpenDestinationModal}
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
        onRequestClose={handleCloseOriginModal}
        onConfirm={handleOriginConfirm}
        type="Origem"
      />

      {/* Modal para Destino */}
      <OriginCollectionModal
        isOpen={isDestinationModalOpen}
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
    </section>
  );
};

export default PickupDeliverySection;
