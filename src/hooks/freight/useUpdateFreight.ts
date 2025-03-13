import { useMutation } from "@apollo/client";
import { UPDATE_FREIGHT } from "@/graphql/mutations/freightMutations";
import { GET_FREIGHT_BY_ID } from "@/graphql/queries/freightQueries";
import { UpdateFreightInput } from "@/utils/interfaces/inputs/UpdateFreightInput";
import { Freight } from "@/utils/interfaces/Freight";

interface UpdateFreightData {
	updateFreight: Freight;
}

interface UpdateFreightVars {
	id: string;
	input: UpdateFreightInput;
}

export const useUpdateFreight = (freightId: string) => {
	const [updateFreight, { data, loading, error }] = useMutation<
		UpdateFreightData,
		UpdateFreightVars
	>(UPDATE_FREIGHT, {
		refetchQueries: [
			"GetFreights",
			{ query: GET_FREIGHT_BY_ID, variables: { id: freightId } },
		],
		awaitRefetchQueries: false,
	});

	return {
		updateFreight,
		data: data?.updateFreight,
		loading,
		error,
	};
};
