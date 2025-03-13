import { useQuery } from "@apollo/client";
import { GET_FREIGHTS } from "@/graphql/queries/freightQueries";
import { Freight } from "@/utils/interfaces/Freight";
import { FreightFilters } from "@/utils/interfaces/FreightFilters";

interface GetFreightsData {
	freights: {
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

interface GetFreightsVars {
	page?: number;
	limit?: number;
	filter?: FreightFilters;
}

export const useFreights = (vars: GetFreightsVars) => {
	const { data, loading, error, refetch } = useQuery<
		GetFreightsData,
		GetFreightsVars
	>(GET_FREIGHTS, {
		variables: vars,
		fetchPolicy: "cache-first",
	});

	return {
		data: data?.freights,
		loading,
		error,
		refetch,
	};
};
