import { useQuery } from "@apollo/client";
import { GET_FREIGHT_BY_ID } from "@/graphql/queries/freightQueries";
import { Freight } from "@/utils/interfaces/Freight";

interface GetFreightByIdData {
	freight: Freight;
}

interface GetFreightByIdVars {
	id: string;
}

export const useFreightById = (id: string) => {
	const { data, loading, error, refetch } = useQuery<
		GetFreightByIdData,
		GetFreightByIdVars
	>(GET_FREIGHT_BY_ID, {
		variables: { id },
		skip: !id,
		fetchPolicy: "cache-first",
	});

	return {
		data: data?.freight,
		loading,
		error,
		refetch,
	};
};
