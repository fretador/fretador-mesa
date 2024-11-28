// src/hooks/useOccurrenceById.ts
import { useQuery } from "@apollo/client";
import { GET_OCCURRENCE_BY_ID } from "@/graphql/queries/occurrenceQueries";
import { Occurrence } from "@/utils/Interfaces/Occurrence";

interface GetOccurrenceByIdData {
	occurrence: Occurrence;
}

interface GetOccurrenceByIdVars {
	id: string;
}

export const useOccurrenceById = (id: string) => {
	const { data, loading, error, refetch } = useQuery<
		GetOccurrenceByIdData,
		GetOccurrenceByIdVars
	>(GET_OCCURRENCE_BY_ID, {
		variables: { id },
		skip: !id, // Pula a query se não houver ID
		fetchPolicy: "cache-and-network",
	});

	return {
		data: data?.occurrence,
		loading,
		error,
		refetch,
	};
};
