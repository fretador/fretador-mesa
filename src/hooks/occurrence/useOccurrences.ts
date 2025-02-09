import { useQuery } from "@apollo/client";
import { GET_OCCURRENCES } from "@/graphql/queries/occurrenceQueries";
import { Occurrence } from "@/utils/Interfaces/Occurrence";
import { OccurrenceFilterInput } from "@/utils/Interfaces/OccurrenceFilterInput";

interface GetOccurrencesData {
	occurrences: {
		edges: {
			node: Occurrence;
		}[];
		pageInfo: {
			hasNextPage: boolean;
			hasPreviousPage: boolean;
			currentPage: number;
			totalPages: number;
		};
	};
}

interface GetOccurrencesVars {
	page?: number;
	limit?: number;
	filter?: OccurrenceFilterInput;
}

export const useOccurrences = (vars: GetOccurrencesVars) => {
	const { data, loading, error, refetch } = useQuery<
		GetOccurrencesData,
		GetOccurrencesVars
	>(GET_OCCURRENCES, {
		variables: vars,
		fetchPolicy: "cache-first",
	});

	return {
		data: data?.occurrences,
		loading,
		error,
		refetch,
	};
};
