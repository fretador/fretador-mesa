import { useCallback, useState } from "react";
import { DocumentService } from "@/services/documentService";
import { useRouter } from "next/router";
import { AuthService } from "@/services/authService";
import { DocumentInput } from "@/utils/types/DocumentInput";

interface DocumentController {
  uploadDocuments: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  updateDocument: (
    documentIds: string[],
    updates: Partial<DocumentInput>
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
    async (documentIds: string[], updates: Partial<DocumentInput>) => {
      setProcessingStatus(`Atualizando documentos...`);
      const updatedDocuments: DocumentInput[] = documentIds.map(
        (documentId) => ({
          ...updates,
          name: updates.name ?? "",
          type: updates.type ?? "",
          url: updates.url ?? "",
          sender: updates.sender ?? "",
          message: updates.message ?? "",
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
