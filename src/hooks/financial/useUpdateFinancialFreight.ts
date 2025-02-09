import { useMutation } from "@apollo/client";
import { UPDATE_FINANCIAL_FREIGHT } from "@/graphql/mutations/financialMutations";
import { GET_FREIGHT_FINANCIAL_BY_ID } from "@/graphql/queries/financialQueries";
import { UpdateFinancialFreightInput } from "@/utils/Interfaces/UpdateFinancialFreightInput";
import { Freight } from "@/utils/Interfaces/Freight";

interface UpdateFinancialFreightData {
	updateFinancialFreight: Freight;
}

interface UpdateFinancialFreightVars {
	id: string;
	input: UpdateFinancialFreightInput;
}

export const useUpdateFinancialFreight = (freightId: string) => {
	const [updateFinancialFreight, { data, loading, error }] = useMutation<
		UpdateFinancialFreightData,
		UpdateFinancialFreightVars
	>(UPDATE_FINANCIAL_FREIGHT, {
		refetchQueries: [
			"GetFreights",
			{ query: GET_FREIGHT_FINANCIAL_BY_ID, variables: { id: freightId } },
		],
		awaitRefetchQueries: false,
	});

	return {
		updateFinancialFreight,
		data: data?.updateFinancialFreight,
		loading,
		error,
	};
};
