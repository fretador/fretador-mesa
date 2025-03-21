import { AuthService } from "@/services/authService";
import { DocumentInput } from "@/utils/Interfaces/DocumentInput";
import {
	ADD_DOCUMENTS_TO_FREIGHT,
	REMOVE_DOCUMENTS_FROM_FREIGHT,
	UPDATE_DOCUMENTS,
} from "@/graphql/mutations/documentMutations";
import apolloClient from "@/app/apolloClient";

interface DocumentService {
  uploadDocument(file: File): Promise<string>;
  generateSignedUrl(file: File): Promise<{fileUrl: string; signedUrl: string}>;
  uploadToS3(file: File, url: string): Promise<void>;
  addDocuments(freightId: string, documents: DocumentInput[]): Promise<any>;
  removeDocuments(freightId: string, documentIds: string[]): Promise<any>;
  updateDocuments(freightId: string, documentUpdates: DocumentInput[]): Promise<any>;
}

export const DocumentService: DocumentService = {
	async uploadDocument(file: File): Promise<string> {
		const {fileUrl, signedUrl} = await this.generateSignedUrl(file);
		await this.uploadToS3(file, signedUrl);
		return fileUrl;
	},

	async generateSignedUrl(file: File): Promise<{fileUrl: string; signedUrl: string}> {
		const baseUrl = process.env.NEXT_PUBLIC_API_URL;
		const response = await fetch(
			`${baseUrl}/file/url?fileName=${encodeURIComponent(
				file.name
			)}&fileType=${encodeURIComponent(file.type)}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthService.getBoardUserToken()}`,
				},
			}
		);
		const data = await response.json();
		return data;
	},

	async uploadToS3(file: File, url: string): Promise<void> {
		await fetch(url, {
			method: "PUT",
			body: file,
			headers: {
				"Content-Type": file.type,
			},
		});
	},

	async addDocuments(freightId: string, documents: DocumentInput[]) {
		const response = await apolloClient.mutate({
			mutation: ADD_DOCUMENTS_TO_FREIGHT,
			variables: { freightId, documents },
		});
		return response.data.addDocumentsToFreight;
	},

	async removeDocuments(freightId: string, documentIds: string[]) {
		const response = await apolloClient.mutate({
			mutation: REMOVE_DOCUMENTS_FROM_FREIGHT,
			variables: { freightId, documentIds },
		});
		return response.data.removeDocumentsFromFreight;
	},

	async updateDocuments(freightId: string, documentUpdates: DocumentInput[]) {
		const response = await apolloClient.mutate({
			mutation: UPDATE_DOCUMENTS,
			variables: { freightId, documentUpdates },
		});
		return response.data.UpdateDocuments;
	},
};
