import { AuthService } from "@/services/authService";
import { UPDATE_DRIVER_DOCUMENTS } from "@/graphql/mutations/driverMutations";
import apolloClient from "@/app/apolloClient";
import { PhotoStatus } from "@/utils/enums/photoStatusEnums";
import { DriverDocumentFieldEnum } from "@/utils/enums/driverDocumentFieldEnum";
import { UpdateDriverDocumentInput } from "@/utils/interfaces/inputs/UpdateDriverDocumentInput";

export const DriverDocumentService = {
	async updateDriverDocuments(
		driverId: string,
		updates: UpdateDriverDocumentInput[]
	): Promise<any> {
		try {
			const response = await apolloClient.mutate({
				mutation: UPDATE_DRIVER_DOCUMENTS,
				variables: {
					id: driverId,
					updates: updates.map((update) => ({
						...update,
						sender: AuthService.getBoardUser().name,
					})),
				},
				context: {
					headers: {
						Authorization: `Bearer ${AuthService.getBoardUserToken()}`,
					},
				},
			});
			return response.data.updateDriverDocuments;
		} catch (error) {
			console.error("Error updating driver documents:", error);
			throw error;
		}
	},

	async updateDocumentStatus(
		driverId: string,
		field: DriverDocumentFieldEnum,
		status: PhotoStatus,
		message?: string
	): Promise<any> {
		const updateInput: UpdateDriverDocumentInput = {
			field,
			status,
			message: message || "",
		};

		return this.updateDriverDocuments(driverId, [updateInput]);
	},
};
