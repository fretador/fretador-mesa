import { AuthService } from "@/services/authService";
import { DocumentInput } from "@/utils/types/DocumentInput";
import {
	ADD_DOCUMENTS_TO_FREIGHT,
	REMOVE_DOCUMENTS_FROM_FREIGHT,
	UPDATE_DOCUMENTS,
} from "@/graphql/mutations/documentMutations";
import apolloClient from "@/app/apolloClient";

export const DocumentService = {
	async uploadDocument(file: File): Promise<string> {
		const url = await this.generateSignedUrl(file);
		await this.uploadToS3(file, url);
		return url;
	},

	async generateSignedUrl(file: File): Promise<string> {
		const response = await fetch(`http://192.168.15.3:3030/dev/file/url?fileName=${encodeURIComponent(file.name)}&fileType=${encodeURIComponent(file.type)}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${AuthService.getBoardUserToken()}`,
			},
		});
		const data = await response.json();
		return data.signedUrl;
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
