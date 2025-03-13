// documentController.ts
import { useCallback, useState } from "react";
import { DocumentService } from "@/services/documentService";
import { useRouter } from "next/router";
import { AuthService } from "@/services/authService";
import { StatusDocumentEnum } from "@/utils/enums/statusDocumentEnum";
import { DocumentUpdateInput } from "@/utils/interfaces/inputs/DocumentUpdateInput";
import { FreightDocumentTypeEnum } from "@/utils/enums/freightDocumentTypeEnum";

interface DocumentController {
	uploadDocuments: (files: File[], types: string[]) => Promise<void>;
	updateDocument: (
		documentIds: string[],
		updates: Partial<DocumentUpdateInput>
	) => Promise<void>;
	removeDocuments: (documentIds: string[]) => Promise<void>;
	processingStatus: string;
}

export const useDocumentController = (): DocumentController => {
	const router = useRouter();
	const freightId = router.query.freightId as string;
	const [processingStatus, setProcessingStatus] = useState<string>("");

	const uploadDocuments = useCallback(
		async (files: File[], types: string[]) => {
			if (files.length > 0) {
				setProcessingStatus(`Enviando documentos...`);
				try {
					const { name } = AuthService.getBoardUser();
					const documentUrls = await Promise.all(
						files.map((file) => DocumentService.uploadDocument(file))
					);

					await DocumentService.addDocuments(
						freightId,
						documentUrls.map((s3Key, index) => ({
							name: files[index].name,
							url: s3Key,
							type: types[index] as FreightDocumentTypeEnum, // Usa o tipo recebido
							sender: name,
							status: StatusDocumentEnum.WAITING,
						}))
					);
				} catch (error) {
					console.error("Erro ao processar documentos:", error);
				}
				setProcessingStatus("Todos os documentos foram enviados.");
			}
		},
		[freightId]
	);

	const removeDocuments = useCallback(
		async (documentIds: string[]) => {
			setProcessingStatus(`Removendo documentos...`);
			await DocumentService.removeDocuments(freightId, documentIds);
			setProcessingStatus("Documentos removidos com sucesso.");
		},
		[freightId]
	);

	const updateDocument = useCallback(
		async (documentIds: string[], updates: Partial<DocumentUpdateInput>) => {
			setProcessingStatus(`Atualizando documentos...`);
			const updatedDocuments: DocumentUpdateInput[] = documentIds.map(
				(documentId) => ({
					...updates,
					sender: updates.sender ?? AuthService.getBoardUser().name,
					id: documentId,
					status: updates.status ?? StatusDocumentEnum.WAITING,
				})
			);
			await DocumentService.updateDocuments(freightId, updatedDocuments);
			setProcessingStatus("Documentos atualizados com sucesso.");
		},
		[freightId]
	);

	return {
		uploadDocuments,
		updateDocument,
		removeDocuments,
		processingStatus,
	};
};
