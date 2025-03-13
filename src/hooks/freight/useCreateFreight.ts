import { useMutation } from "@apollo/client";
import { CREATE_FREIGHT } from "@/graphql/mutations/freightMutations";
import { CreateFreightInput } from "@/utils/interfaces/inputs/CreateFreightInput";
import { Freight } from "@/utils/interfaces/Freight";

interface CreateFreightData {
	createFreight: Freight;
}

interface CreateFreightVars {
	input: CreateFreightInput;
}

export const useCreateFreight = () => {
	const [createFreight, { data, loading, error }] = useMutation<
		CreateFreightData,
		CreateFreightVars
	>(CREATE_FREIGHT, {
		refetchQueries: ["GetFreights"],
		awaitRefetchQueries: false,
	});

	return {
		createFreight,
		data: data?.createFreight,
		loading,
		error,
	};
};
