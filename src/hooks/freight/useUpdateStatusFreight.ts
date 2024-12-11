import { useMutation } from "@apollo/client";
import { UPDATE_STATUS_FREIGHT } from "@/graphql/mutations/statusFreightMutations";
import { GET_FREIGHT_BY_ID } from "@/graphql/queries/freightQueries";
import { UpdateStatusFreightInput } from "@/utils/Interfaces/UpdateStatusFreightInput";
import { Freight } from "@/utils/Interfaces/Freight";

interface UpdateStatusFreightData {
	updateStatusFreight: Freight;
}

interface UpdateStatusFreightVars {
	id: string;
	input: UpdateStatusFreightInput;
}

export const useUpdateStatusFreight = (freightId: string) => {
	const [updateStatusFreight, { data, loading, error }] = useMutation<
		UpdateStatusFreightData,
		UpdateStatusFreightVars
	>(UPDATE_STATUS_FREIGHT, {
		refetchQueries: [
			"GetFreights",
			{ query: GET_FREIGHT_BY_ID, variables: { id: freightId } },
		],
		awaitRefetchQueries: false,
	});

	return {
		updateStatusFreight,
		data: data?.updateStatusFreight,
		loading,
		error,
	};
};
