import { useCallback, useState } from "react";
import { DocumentService } from "@/services/documentService";
import { useRouter } from "next/router";
import { AuthService } from "@/services/authService";
import { StatusDocumentEnum } from "@/utils/enums/statusDocumentEnum";
import { DocumentUpdateInput } from "@/utils/Interfaces/DocumentUpdateInput";

interface DocumentController {
  uploadDocuments: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
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
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        setProcessingStatus(`Enviando documentos...`);
        try {
          const { name } = AuthService.getBoardUser();
          const documentUrls = await Promise.all(
            Array.from(files).map((file) =>
              DocumentService.uploadDocument(file)
            )
          );
          await DocumentService.addDocuments(
            freightId,
            documentUrls.map((url, index) => ({
              name: files[index].name,
              url,
              type: files[index].type,
							sender: name,
							status: StatusDocumentEnum.WAITING
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
          sender: updates.sender ?? "",
          id: documentId,
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
