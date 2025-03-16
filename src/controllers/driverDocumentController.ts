import { useCallback, useState } from "react";
import { DriverDocumentService } from "@/services/driverDocumentService";
import { PhotoStatus } from "@/utils/enums/photoStatusEnums";
import { DriverDocumentFieldEnum } from "@/utils/enums/driverDocumentFieldEnum";

interface DriverDocumentController {
	updateDocument: (
		driverId: string,
		field: DriverDocumentFieldEnum,
		status: PhotoStatus,
		message?: string
	) => Promise<void>;
	processingStatus: string;
}

export const useDriverDocumentController = (): DriverDocumentController => {
	const [processingStatus, setProcessingStatus] = useState<string>("");

	const updateDocument = useCallback(
		async (
			driverId: string,
			field: DriverDocumentFieldEnum,
			status: PhotoStatus,
			message?: string
		) => {
			setProcessingStatus("Atualizando documento...");
			try {
				await DriverDocumentService.updateDocumentStatus(
					driverId,
					field,
					status,
					message
				);
				setProcessingStatus("Documento atualizado com sucesso!");
			} catch (error) {
				console.error("Erro ao atualizar documento:", error);
				setProcessingStatus("Erro ao atualizar documento");
			}
		},
		[]
	);

	return {
		updateDocument,
		processingStatus,
	};
};
