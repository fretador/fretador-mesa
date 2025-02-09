import { useQuery } from "@apollo/client";
import { GET_FREIGHT_FINANCIAL_BY_ID } from "@/graphql/queries/financialQueries";
import { Freight } from "@/utils/Interfaces/Freight";

interface GetFinancialFreightByIdData {
	freightForFinancialById: Freight;
}

interface GetFinancialFreightByIdVars {
	id: string;
}

export const useFinancialFreightById = (id: string) => {
	const { data, loading, error, refetch } = useQuery<
		GetFinancialFreightByIdData,
		GetFinancialFreightByIdVars
	>(GET_FREIGHT_FINANCIAL_BY_ID, {
		variables: { id },
		skip: !id,
		fetchPolicy: "cache-first",
	});

	return {
		data: data?.freightForFinancialById,
		loading,
		error,
		refetch,
	};
};
