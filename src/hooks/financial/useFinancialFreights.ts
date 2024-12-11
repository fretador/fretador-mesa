import { useQuery } from "@apollo/client";
import { GET_FREIGHTS_FOR_FINANCIAL } from "@/graphql/queries/financialQueries";
import { Freight } from "@/utils/Interfaces/Freight";
import { FinancialFilterInput } from "@/utils/Interfaces/FinancialFilterInput";

interface GetFinancialFreightsData {
	freightsForFinancial: {
		edges: {
			node: Freight;
		}[];
		pageInfo: {
			hasNextPage: boolean;
			hasPreviousPage: boolean;
			currentPage: number;
			totalPages: number;
		};
	};
}

interface GetFinancialFreightsVars {
	page?: number;
	limit?: number;
	filter?: FinancialFilterInput;
}

export const useFinancialFreights = (vars: GetFinancialFreightsVars) => {
	const { data, loading, error, refetch } = useQuery<
		GetFinancialFreightsData,
		GetFinancialFreightsVars
	>(GET_FREIGHTS_FOR_FINANCIAL, {
		variables: vars,
		fetchPolicy: "cache-and-network",
	});

	return {
		data: data?.freightsForFinancial,
		loading,
		error,
		refetch,
	};
};
