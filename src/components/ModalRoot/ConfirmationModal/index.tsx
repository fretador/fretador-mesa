import React from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { CreateFreightInput } from "@/utils/types/CreateFreightInput";
import { FreightService } from "@/services/freightService";

interface ConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const { getValues } = useFormContext<CreateFreightInput>();
  const router = useRouter();

  const handleConfirm = async () => {
    const freightData = getValues();
    try {
      const createdFreight = await FreightService.createFreight(freightData);
      console.log("Frete criado com sucesso:", createdFreight);
      // Exibir o número do frete no modal
      alert(`Frete criado com sucesso. Número do frete: ${createdFreight.id}`);
      // Redirecionar para a rota de fretes
      router.push("/fretes");
    } catch (error) {
      console.error("Erro ao criar o frete:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Confirmar os Dados do Frete?</h2>
      <p>Data da Coleta: {getValues("pickupDeliveryData")}</p>
      <p>Origem: {getValues("origin")}</p>
      <p>Destino: {getValues("destination")}</p>
      <p>Tipo de Veículo: {getValues("eligibleVehicles").join(", ")}</p>
      <p>Tipo de Carroceria: {getValues("eligibleBodyworks").join(", ")}</p>
      <button onClick={handleConfirm}>Confirmar</button>
      <button onClick={onRequestClose}>Cancelar</button>
    </Modal>
  );
};

export default ConfirmationModal;
