import { useMutation } from "@apollo/client";
import { UPDATE_FREIGHT } from "@/graphql/mutations/freightMutations";
import { UpdateFreightInput } from "@/utils/Interfaces/UpdateFreightInput";
import { Freight } from "@/utils/Interfaces/Freight";

interface UpdateFreightData {
	updateFreight: Freight;
}

interface UpdateFreightVars {
	id: string;
	input: UpdateFreightInput;
}

export const useUpdateFreight = () => {
	const [updateFreight, { data, loading, error }] = useMutation<
		UpdateFreightData,
		UpdateFreightVars
	>(UPDATE_FREIGHT, {
		refetchQueries: ["GetFreights", "GetFreightById"],
		awaitRefetchQueries: false,
	});

	return {
		updateFreight,
		data: data?.updateFreight,
		loading,
		error,
	};
};
