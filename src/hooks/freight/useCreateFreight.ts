import { useMutation } from "@apollo/client";
import { CREATE_FREIGHT } from "@/graphql/mutations/freightMutations";
import { CreateFreightInput } from "@/utils/Interfaces/CreateFreightInput";
import { Freight } from "@/utils/Interfaces/Freight";

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
		awaitRefetchQueries: true,
	});

	return {
		createFreight,
		data: data?.createFreight,
		loading,
		error,
	};
};
