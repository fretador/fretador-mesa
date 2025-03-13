import { useQuery } from "@apollo/client";
import { GET_FREIGHTS_FOR_FINANCIAL } from "@/graphql/queries/financialQueries";
import { Freight } from "@/utils/interfaces/Freight";
import { FinancialFilterInput } from "@/utils/interfaces/inputs/FinancialFilterInput";

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
		fetchPolicy: "cache-first",
	});

	return {
		data: data?.freightsForFinancial,
		loading,
		error,
		refetch,
	};
};
