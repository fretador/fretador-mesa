import { useCallback } from "react";
import { DocumentService } from "@/services/documentService";
import { useRouter } from "next/router";
import { AuthService } from "@/services/authService";

export const useDocumentController = () => {
	const router = useRouter();
	const freightId = router.query.freightId as string;

	const handleFileChange = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>, secondArg: any) => {
			const files = event.target.files;
			if (files && files.length > 0) {
				try {
					const documentUrls = await Promise.all(
						Array.from(files).map((file) => DocumentService.uploadDocument(file))
					);
					const { name } = AuthService.getBoardUser();
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
			}
		},
		[freightId]
	);

	return {
		handleFileChange,
	};
};
