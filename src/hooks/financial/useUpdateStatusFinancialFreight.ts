import { useMutation } from "@apollo/client";
import { UPDATE_STATUS_FINANCIAL_FREIGHT } from "@/graphql/mutations/financialMutations";
import { GET_FREIGHT_FINANCIAL_BY_ID } from "@/graphql/queries/financialQueries";
import { UpdateStatusFinancialFreightInput } from "@/utils/interfaces/inputs/UpdateStatusFinancialFreightInput";
import { Freight } from "@/utils/interfaces/Freight";

interface UpdateStatusFinancialData {
	updateStatusFinancialFreight: Freight;
}

interface UpdateStatusFinancialVars {
	id: string;
	input: UpdateStatusFinancialFreightInput;
}

export const useUpdateStatusFinancialFreight = (freightId: string) => {
	const [updateStatusFinancialFreight, { data, loading, error }] = useMutation<
		UpdateStatusFinancialData,
		UpdateStatusFinancialVars
	>(UPDATE_STATUS_FINANCIAL_FREIGHT, {
		refetchQueries: [
			"GetFreightsForFinancial",
			{ query: GET_FREIGHT_FINANCIAL_BY_ID, variables: { id: freightId } },
		],
		awaitRefetchQueries: false,
	});

	return {
		updateStatusFinancialFreight,
		data: data?.updateStatusFinancialFreight,
		loading,
		error,
	};
};
