import { useMutation } from "@apollo/client";
import { UPDATE_STATUS_FREIGHT } from "@/graphql/mutations/statusFreightMutations";
import { UpdateStatusFreightInput } from "@/utils/Interfaces/UpdateStatusFreightInput";
import { Freight } from "@/utils/Interfaces/Freight";

interface UpdateStatusFreightData {
	updateStatusFreight: Freight;
}

interface UpdateStatusFreightVars {
	id: string;
	input: UpdateStatusFreightInput;
}

export const useUpdateStatusFreight = () => {
	const [updateStatusFreight, { data, loading, error }] = useMutation<
		UpdateStatusFreightData,
		UpdateStatusFreightVars
	>(UPDATE_STATUS_FREIGHT, {
		refetchQueries: ["GetFreights", "GetFreightById"],
		awaitRefetchQueries: true,
	});

	return {
		updateStatusFreight,
		data: data?.updateStatusFreight,
		loading,
		error,
	};
};
